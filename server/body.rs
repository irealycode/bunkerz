use std::collections::HashMap;
use std::env;
use std::io::Cursor;
use std::io::Read;
use std::io::Write;
use std::path::Path;
use std::sync::Arc;
use std::sync::Mutex;

use actix_cors::Cors;
use actix_files::NamedFile;
use actix_multipart::Multipart;
use actix_web::{web, App, Error, HttpResponse, HttpServer};
use futures::StreamExt;
use mongodb::bson::{doc, Bson};
use mongodb::{options::ClientOptions, Client};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use tokio::fs::File;
use tokio::io::AsyncWriteExt;

#[derive(Debug, Serialize, Deserialize)]
struct User {
    uid: String,
    email: String,
    password: String,
    stores: Vec<Store>,
}

#[derive(Debug, Serialize, Deserialize)]
struct Store {
    store_id: String,
    name: String,
    p: bool,
}

#[derive(Debug, Serialize, Deserialize)]
struct Product {
    pid: String,
    // Add other fields here
}

#[derive(Debug, Serialize, Deserialize)]
struct AppState {
    client: Client,
    user_col: mongodb::Collection<User>,
    stores_col: mongodb::Collection<Store>,
    upload_folder: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct RegisterRequest {
    email: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct AddStoreRequest {
    jid: String,
    name: String,
    prv: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct SaveStoreRequest {
    jid: String,
    sid: String,
    save: Store,
}

#[derive(Debug, Serialize, Deserialize)]
struct GetStoreRequest {
    w: i32,
    subd: String,
    sid: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct UidRequest {
    jid: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct UploadRequest {
    file: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct SaveProductRequest {
    jid: String,
    sid: String,
    save: Product,
}

#[derive(Debug, Serialize, Deserialize)]
struct ActiveProductRequest {
    jid: String,
    sid: String,
    pid: String,
}

async fn register(
    data: web::Data<AppState>,
    req: web::Json<RegisterRequest>,
) -> Result<HttpResponse, Error> {
    let email_hash = format!("{:x}", Sha256::digest(req.email.as_bytes()));
    let uid = email_hash.clone();
    let e = data
        .user_col
        .find_one(doc! { "uid": uid.clone() }, None)
        .await
        .unwrap();
    if e.is_none() {
        let password_hash = format!("{:x}", Sha256::digest(req.password.as_bytes()));
        let user = User {
            uid: uid.clone(),
            email: req.email.clone(),
            password: password_hash,
            stores: vec![],
        };
        data.user_col.insert_one(user, None).await.unwrap();
        Ok(HttpResponse::Ok().body("ok"))
    } else {
        Ok(HttpResponse::Ok().body("exists"))
    }
}

async fn login(
    data: web::Data<AppState>,
    req: web::Json<LoginRequest>,
) -> Result<HttpResponse, Error> {
    let email_hash = format!("{:x}", Sha256::digest(req.email.as_bytes()));
    let uid = email_hash.clone();
    let e = data
        .user_col
        .find_one(doc! { "uid": uid.clone() }, None)
        .await
        .unwrap();
    if let Some(user) = e {
        let password_hash = format!("{:x}", Sha256::digest(req.password.as_bytes()));
        if user.password == password_hash {
            let token = jwt::encode(
                &jwt::Header::default(),
                &jwt::Claims {
                    email: req.email.clone(),
                    uid: uid.clone(),
                },
                &jwt::EncodingKey::from_secret(data.private_key.as_bytes()),
            )
            .unwrap();
            Ok(HttpResponse::Ok().body(token))
        } else {
            Ok(HttpResponse::Ok().body("505"))
        }
    } else {
        Ok(HttpResponse::Ok().body("505"))
    }
}

async fn add_store(
    data: web::Data<AppState>,
    req: web::Json<AddStoreRequest>,
) -> Result<HttpResponse, Error> {
    let jid = jwt::decode::<jwt::Claims>(
        &req.jid,
        &jwt::DecodingKey::from_secret(data.private_key.as_bytes()),
        &jwt::Validation::default(),
    )
    .unwrap();
    let e = data
        .user_col
        .find_one(doc! { "uid": jid.claims.uid.clone() }, None)
        .await
        .unwrap();
    if let Some(user) = e {
        let store_id = get_id();
        let prv = req.prv == "prv";
        let store = Store {
            store_id: store_id.clone(),
            name: req.name.clone(),
            p: prv,
        };
        let mut stores = user.stores;
        stores.push(store.clone());
        data.user_col
            .update_one(
                doc! { "uid": jid.claims.uid.clone() },
                doc! { "$set": { "stores": stores } },
                None,
            )
            .await
            .unwrap();
        data.stores_col
            .insert_one(store, None)
            .await
            .unwrap();
        Ok(HttpResponse::Ok().body("ok"))
    } else {
        Ok(HttpResponse::Ok().body("505"))
    }
}

async fn save_store(
    data: web::Data<AppState>,
    req: web::Json<SaveStoreRequest>,
) -> Result<HttpResponse, Error> {
    let jid = jwt::decode::<jwt::Claims>(
        &req.jid,
        &jwt::DecodingKey::from_secret(data.private_key.as_bytes()),
        &jwt::Validation::default(),
    )
    .unwrap();
    let st = data
        .stores_col
        .find_one(doc! { "store_id": req.sid.clone() }, None)
        .await
        .unwrap();
    if let Some(store) = st {
        if store.owner == jid.claims.uid {
            data.stores_col
                .update_one(
                    doc! { "store_id": req.sid.clone() },
                    doc! { "$set": { "inner": req.save.clone() } },
                    None,
                )
                .await
                .unwrap();
            Ok(HttpResponse::Ok().body("updated"))
        } else {
            Ok(HttpResponse::Ok().body("505"))
        }
    } else {
        Ok(HttpResponse::Ok().body("505"))
    }
}

async fn get_store(
    data: web::Data<AppState>,
    req: web::Json<GetStoreRequest>,
) -> Result<HttpResponse, Error> {
    let st = if req.w == 0 {
        data.stores_col
            .find_one(doc! { "subdomain": req.subd.clone() }, None)
            .await
            .unwrap()
    } else {
        data.stores_col
            .find_one(doc! { "store_id": req.sid.clone() }, None)
            .await
            .unwrap()
    };
    if let Some(store) = st {
        let i = store.inner;
        let p = store.products;
        Ok(HttpResponse::Ok().json(json!({ "store": i, "products": p })))
    } else {
        Ok(HttpResponse::Ok().body("no."))
    }
}

async fn uid(
    data: web::Data<AppState>,
    req: web::Json<UidRequest>,
) -> Result<HttpResponse, Error> {
    let jid = jwt::decode::<jwt::Claims>(
        &req.jid,
        &jwt::DecodingKey::from_secret(data.private_key.as_bytes()),
        &jwt::Validation::default(),
    )
    .unwrap();
    let e = data
        .user_col
        .find_one(doc! { "uid": jid.claims.uid.clone() }, None)
        .await
        .unwrap();
    if let Some(user) = e {
        Ok(HttpResponse::Ok().json(json!({ "stores": user.stores })))
    } else {
        Ok(HttpResponse::Ok().body("505"))
    }
}

async fn upload(
    data: web::Data<AppState>,
    mut payload: Multipart,
) -> Result<HttpResponse, Error> {
    let mut filenames = vec![];
    while let Ok(Some(mut field)) = payload.try_next().await {
        let content_type = field.content_disposition().unwrap();
        let filename = content_type.get_filename().unwrap();
        let filepath = format!("{}/{}", data.upload_folder, sanitize_filename::sanitize(&filename));
        let mut f = web::block(|| std::fs::File::create(filepath))
            .await
            .unwrap();
        while let Some(chunk) = field.next().await {
            let data = chunk.unwrap();
            f = web::block(move || f.write_all(&data).map(|_| f)).await?;
        }
        filenames.push(filepath);
    }
    Ok(HttpResponse::Ok().json(json!({ "message": filenames })))
}

async fn save_product(
    data: web::Data<AppState>,
    req: web::Json<SaveProductRequest>,
) -> Result<HttpResponse, Error> {
    let jid = jwt::decode::<jwt::Claims>(
        &req.jid,
        &jwt::DecodingKey::from_secret(data.private_key.as_bytes()),
        &jwt::Validation::default(),
    )
    .unwrap();
    let e = data
        .user_col
        .find_one(doc! { "uid": jid.claims.uid.clone() }, None)
        .await
        .unwrap();
    if let Some(user) = e {
        if checkstore(&user.stores, &req.sid) {
            let st = data
                .stores_col
                .find_one(doc! { "store_id": req.sid.clone() }, None)
                .await
                .unwrap();
            if let Some(store) = st {
                let mut pr = store.products;
                req.save.pid = get_id();
                pr.push(req.save.clone());
                data.stores_col
                    .update_one(
                        doc! { "store_id": req.sid.clone() },
                        doc! { "$set": { "products": pr } },
                        None,
                    )
                    .await
                    .unwrap();
                Ok(HttpResponse::Ok().body("ok"))
            } else {
                Ok(HttpResponse::Ok().body("506"))
            }
        } else {
            Ok(HttpResponse::Ok().body("506"))
        }
    } else {
        Ok(HttpResponse::Ok().body("505"))
    }
}

async fn active_product(
    data: web::Data<AppState>,
    req: web::Json<ActiveProductRequest>,
) -> Result<HttpResponse, Error> {
    let jid = jwt::decode::<jwt::Claims>(
        &req.jid,
        &jwt::DecodingKey::from_secret(data.private_key.as_bytes()),
        &jwt::Validation::default(),
    )
    .unwrap();
    let st = data
        .stores_col
        .find_one(doc! { "store_id": req.sid.clone() }, None)
        .await
        .unwrap();
    if let Some(store) = st {
        if store.owner == jid.claims.uid {
            let fi = find_index(&store.products, &req.pid);
            if fi != -1 {
                if let Some(product) = store.products.get_mut(fi as usize) {
                    product.active = !product.active;
                }
            }
            data.stores_col
                .update_one(
                    doc! { "store_id": req.sid.clone() },
                    doc! { "$set": { "products": store.products } },
                    None,
                )
                .await
                .unwrap();
            Ok(HttpResponse::Ok().body("updated"))
        } else {
            Ok(HttpResponse::Ok().body("504"))
        }
    } else {
        Ok(HttpResponse::Ok().body("505"))
    }
}

fn checkstore(stores: &[Store], sid: &str) -> bool {
    for store in stores {
        if store.store_id == sid {
            return true;
        }
    }
    false
}

fn get_id() -> String {
    let mut result_str = String::new();
    for i in 0..42 {
        if i % 7 != 0 {
            result_str.push(random_char());
        } else {
            result_str.push('-');
        }
    }
    result_str
}

fn random_char() -> char {
    let chars: Vec<char> = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        .chars()
        .collect();
    let index = rand::random::<usize>() % chars.len();
    chars[index]
}

fn find_index(list: &[Product], pid: &str) -> i32 {
    for (i, product) in list.iter().enumerate() {
        if product.pid == pid {
            return i as i32;
        }
    }
    -1
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client_options = ClientOptions::parse("mongodb://localhost:27017").await.unwrap();
    let client = Client::with_options(client_options).unwrap();
    let db = client.database("swaperz");
    let user_col = db.collection::<User>("users");
    let stores_col = db.collection::<Store>("stores");

    let app_state = web::Data::new(AppState {
        client: client.clone(),
        user_col,
        stores_col,
        upload_folder: "../public/uploads".to_string(),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .wrap(Cors::default())
            .service(web::resource("/register").route(web::post().to(register)))
            .service(web::resource("/login").route(web::post().to(login)))
            .service(web::resource("/addstore").route(web::post().to(add_store)))
            .service(web::resource("/savestore").route(web::post().to(save_store)))
            .service(web::resource("/getstore").route(web::post().to(get_store)))
            .service(web::resource("/uid").route(web::post().to(uid)))
            .service(web::resource("/upload").route(web::post().to(upload)))
            .service(web::resource("/saveproduct").route(web::post().to(save_product)))
            .service(web::resource("/activeproduct").route(web::post().to(active_product)))
    })
    .bind("0.0.0.0:4242")?
    .run()
    .await
}

