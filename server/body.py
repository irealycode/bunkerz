from crypt import methods
import math
from pymongo import MongoClient
import urllib
from flask import Flask,  flash, request, jsonify
import os
from flask_cors import CORS
import json
import hashlib
import string
import jwt
import random
import datetime
from bson import ObjectId


[{'store_id': 'myeNJy-gO9Ik7-aE6MKv-vQgiWG-IHLt3L-u6Baou','name':'swaperz'},{'store_id': 'skZKhj-RDodB1-DIupvg-8Z9Uku-CBeepI-suXAZT','name': 'adidas'},{'store_id': 'FoBa8e-Y07YsH-WWEog8-tkdLy4-6eQuI2-KNf8Xd','name': 'alga',}]

passwd = '8937#snsvvpKKt##8'
client = MongoClient(f'mongodb://swaperz:{urllib.parse.quote(passwd)}@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=swaperz&appName=mongosh+1.5.0')
private_key = "MIICWwIBAAKBgH6F7rrAdGPbzOjIg0A2T8giaNQX9cA52OGvwojmPCbl7cq4UeBbL1AtdHK7xqACEyYu8ymQWydVoYv4RRUxtNLbOVbY7s8/v0tRo1itMZwFt6f0S2/Mr/odTWcpXsV8H5BVs55AGfxDHcd5EtY66V5bCZEBlETiOJ4lRLkidAgMBAAECYBqCjhWPtyNoPdxFjSiyaIO1CeieJHFHcNj65nggQ5jD4wnvimpE1sSlryMM0gbswF3nBvidwFeyy8VD6ReqfIUrb/dR9UaeCufH1sCBdGjDFozTIsW6AVfghW4l3lGdACCoMa2Mrizar0oIV73KsrzypE41dcm9gkpFRyje5QJBANiLNzJ57KiBZgXBJ5aC8l2LfBPugyO1ILe3wNhStGzBLx2pZkPq6IYQqeYNDr5GbTfVLs0kQhXEKXKR2ycCQQCVk6nW5PwHGWQ4TJR4qGiq6J0T5lAvE7KMau4jJ5E4J/Nkby57z6gNQGff9BIhx5XSiq4Y3Awjjwlhoq6ibAkAeOD95wd4vHe/YciGmNZwRRfgI6A5G2P3f6tK0O/xBXzHzO5CqDPPEeBEBKp8D2QKmKuxYVBAynWzDUmudAkAtTd5hlXrqIssajWGHiwrpDyUeWvL9oFbn9KcoPnLohr3M62Pird2iYldX0WmqZb9gefG/cpRgenZOjUFAkEAmLmLrd1FWA2u4wqlybIUMm07c8NBV5lqt9zwo8JGnY8cbLmFA92rDaZZ6YOmcRUhi2Q46ONQKxbXk7DuH78g"

user_col = client['swaperz']['users']
stores_col = client['swaperz']['stores']
orders_col = client['swaperz']['orders']
sales_col = client['swaperz']['sales']
UPLOAD_FOLDER = '../public/uploads'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.secret_key = 'super secret key'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

def get_id():
    result_str = ''.join(random.choice(string.ascii_letters+'1234567890') if i%7!=0 else '-' for i in range(42))
    return result_str[1:]

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        ehash = hashlib.md5(s['email'].encode('utf-8')).hexdigest()
        # s=jwt.decode(s['res'],private_key,algorithms=["HS256"])
        # print(s)
        print(ehash)
        uid = ehash
        e = user_col.find_one({'uid':uid})
        if e == None:
            s['uid'] = ehash
            s['password'] = hashlib.md5(s['password'].encode('utf-8')).hexdigest()
            user_col.insert_one(s)
        else:
            return 'exists'
        return 'ok'
    except:
        return '505'

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        ehash = hashlib.md5(s['email'].encode('utf-8')).hexdigest()
        uid = ehash
        e = user_col.find_one({'uid':uid})
        if e != None and e['password'] == hashlib.md5(s['password'].encode('utf-8')).hexdigest():
            return jwt.encode({'email':s['email'],'uid':ehash},private_key)
        else:
            return '505'
    except:
        return '505'

@app.route('/addstore', methods=['POST'])
def add():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        store_id=get_id()
        jid=jwt.decode(s['jid'],private_key,algorithms=["HS256"])
        c = stores_col.find_one({'subdomain':s['subd']})
        if c == None:
            e = user_col.find_one({'uid':jid['uid']})
            # print(jid['uid'])
            # print(e)
            stores = []
            try:
                stores = e['stores']
                stores.append({'store_id':store_id,'name':s['name']})
            except:
                stores.append({'store_id':store_id,'name':s['name']})

            if e != None: 
                user_col.update_one({'uid':jid['uid']},{'$set':{'stores':stores}})
                # return jwt.encode({'email':s['email'],'uid':ehash},private_key)
                stores_col.insert_one({'owner':jid['uid'],'store_id':store_id,'name':s['name'],'subdomain':s['subd']})
                return {'sid':store_id}
            else:
                return '505'
        else:
            return 'subdomain taken.'
    except:
        return '505'
        

@app.route('/savestore', methods=['POST'])
def save_store():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        jid=jwt.decode(s['jid'],private_key,algorithms=["HS256"])
        st= stores_col.find_one({'store_id':s['sid']})

        if st['owner'] == jid['uid']:
            stores_col.update_one({'store_id':s['sid']},{'$set':{'inner':s['save']}})
            return 'updated'
        else:
            return '505'
    except:
        return '505'

@app.route('/saveproductview', methods=['POST'])
def save_products_view():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        jid=jwt.decode(s['jid'],private_key,algorithms=["HS256"])
        st= stores_col.find_one({'store_id':s['sid']})

        if st['owner'] == jid['uid']:
            stores_col.update_one({'store_id':s['sid']},{'$set':{'product_view':s['save']}})
            return 'updated'
        else:
            return '505'
    except:
        return '505'

@app.route('/getstore', methods=['POST'])
def get_store():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        if s['w'] == 0:
            st= stores_col.find_one({'subdomain':s['subd']})
            visitor_ip = request.remote_addr
            # visitor_ip = "192.168.32.21"
            date = datetime.datetime.now()
            # date=datetime.datetime.combine(datetime.date(2024,4,21),datetime.time(10,10,12,12))
            try:
                st['inner']
                stores_col.update_one({'subdomain':s['subd'],'ips.ip':{'$ne':visitor_ip}}, {'$addToSet': {'ips': {'ip':visitor_ip,'visit_at':date}}})

            except:
                return '501'
        else:
            st= stores_col.find_one({'store_id':s['sid']})

        try:
            i = st['inner']
            p = []
            try:
                st['products']
                if s['w'] == 0:
                    for ob in st['products']:
                        try:
                            ob['active']
                            if ob['active'] == False:
                                p.append(ob)
                                print(p)
                        except:
                            pass
            
                else:
                    p = st['products']
            except:
                pass
            pv = {}
            try:
               pv = st['product_view']
            except:
                pv = None
            return jsonify({'store':i,'products':p,'sid':st['store_id'],'productStyle':pv})
        except:
            return '502'
    except:
        return '505'

@app.route('/uid', methods=['POST'])
def uid():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        
        jid=jwt.decode(s['jid'],private_key,algorithms=["HS256"])
        e = user_col.find_one({'uid':jid['uid']})
        if e != None:
            # print(e)
            return {'stores':e['stores']}
        else:
            return '505'
    except:
        return '505'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        n = get_id()+'.'+file.filename.split('.')[1]
        filename = os.path.join(app.config['UPLOAD_FOLDER'], n)
        file.save(filename)
        return jsonify({'message': n})

    return jsonify({'error': 'Invalid file format'})


def checkstore(stores,sid):
    for i in range(len(stores)):
                if stores[i]['store_id'] == sid:
                    return True
    return False
@app.route('/saveproduct', methods=['POST'])
def save_product():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        
        jid=jwt.decode(s['jid'],private_key,algorithms=["HS256"])
        e = user_col.find_one({'uid':jid['uid']})
        try:
            if checkstore(e['stores'],s['sid']):
                try:
                    print('check2')
                    store = stores_col.find_one({'store_id':s['sid']})
                    pr = store['products']
                    s['save']['pid'] = get_id()
                    pr.append(s['save'])
                    stores_col.update_one({'store_id':s['sid']},{'$set':{'products':pr}})
                except:
                    pr = []
                    s['save']['pid'] = get_id()
                    pr.append(s['save'])
                    stores_col.update_one({'store_id':s['sid']},{'$set':{'products':pr}})

            return 'ok'
        except:
            return '505'
    except:
        return '505'


def find_index(list,pid):
    for i in range(len(list)):
        if list[i]['pid'] == pid:
            return i
    return -1

@app.route('/activeproduct', methods=['POST'])
def active_product():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        jid=jwt.decode(s['jid'],private_key,algorithms=["HS256"])
        st= stores_col.find_one({'store_id':s['sid']})

        if st['owner'] == jid['uid']:
            fi = find_index(st['products'],s['pid'])
            print('tick')

            if fi!=-1:
                try:
                    st['products'][fi]['active']
                    st['products'][fi]['active'] =  not st['products'][fi]['active']
                except:
                    st['products'][fi]['active'] = False
            else:
                return '505'
            stores_col.update_one({'store_id':s['sid']},{'$set':{'products':st['products']}})
            return 'updated'
        else:
            return '504'
    except:
        return '505'

@app.route('/deleteproduct', methods=['POST'])
def delete_product():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        jid=jwt.decode(s['jid'],private_key,algorithms=["HS256"])
        st= stores_col.find_one({'store_id':s['sid']})

        if st['owner'] == jid['uid']:
            fi = find_index(st['products'],s['pid'])
            print('tick')

            if fi!=-1:
                try:
                    st['products'][fi]
                    st['products'].pop(fi)
                    stores_col.update_one({'store_id':s['sid']},{'$set':{'products':st['products']}})
                    return 'updated'

                except:
                    return '505'
        else:
            return '505'
    except:
        return '505'

@app.route('/getproduct', methods=['POST'])
def get_product():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        
        try:
            result = stores_col.aggregate([
            {"$unwind": "$products"},
            {"$match": {"products.pid": s['pid']}},
            {"$replaceRoot": {"newRoot": "$products"}},
            {"$project": {"_id": 0, "desc": 1, "title": 1, "costPrice": 1, "originalPrice": 1, "price": 1, "files": 1, "size": 1, "colors": 1, "qts": 1, "pid": 1, "active": 1}},
            {"$limit": 1}
            ])
            matched_product = next(result, None)
            if matched_product:
                print('pr: ',matched_product)
            else:
                print("Product not found")
            return jsonify({'product':matched_product})
        except:
            print("Product not found")
            return 'no.'
    except:
        return '505'


@app.route('/completeorder', methods=['POST'])
def complete_order():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        # date=datetime.datetime.combine(datetime.date(2024,4,28),datetime.time(10,10,12,12))
        date=datetime.datetime.now()
        orders_col.insert_one({"order":s['order'],"sid":s['sid'],"created_at":date})
        print("okok")
        return "ok"

    except:
        return '505'

@app.route('/getorders', methods=['POST'])
def get_orders():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)

        orders = orders_col.find({'sid':s['sid']},{'sid':0}).sort('created_at',-1)
        sales = sales_col.find({'sid':s['sid']},{'sid':0}).sort('created_at',-1)
        orders = list(orders)
        for i in range(len(orders)):
            orders[i]['_id'] = str(orders[i]['_id'])
            orders[i]['status'] = False
        sales = list(sales)
        for i in range(len(sales)):
            sales[i]['_id'] = str(sales[i]['_id'])
            sales[i]['status'] = True
        return {'orders':orders+sales}

    except:
        return '505'

@app.route('/getanalitycs', methods=['POST'])
def get_analytics():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)

        orders = orders_col.find({'sid':s['sid']},{'sid':0}).sort('created_at',-1)
        sales = sales_col.find({'sid':s['sid']},{'sid':0}).sort('sale_at',-1)
        store = stores_col.find_one({'store_id':s['sid']},{'_id':0,'ips':1})
        orders = list(orders)
        for i in range(len(orders)):
            orders[i]['_id'] = str(orders[i]['_id'])
        sales = list(sales)
        for i in range(len(sales)):
            sales[i]['_id'] = str(sales[i]['_id'])
        return {'orders':orders,'views':store['ips'],'sales':sales}

    except:
        return '505'

@app.route('/getorder', methods=['POST'])
def get_order():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        r=[]

        order = orders_col.find_one({'_id':ObjectId(s['oid'])})
        for o in order['order']:
            print(o['pid'])
            result = stores_col.aggregate([
            {"$unwind": "$products"},
            {"$match": {"products.pid": o['pid']}},
            {"$replaceRoot": {"newRoot": "$products"}},
            {"$project": {"_id": 0,"price": 1, "files": 1,"pid": 1,"title":1}},
            {"$limit": 1}
            ])
            matched_product = next(result, None)
            print(matched_product)
            if matched_product:
                matched_product['qts'] = o['qts']
                matched_product['color'] = o['color']
                try:
                    o['status']
                    matched_product['status'] = o['status']
                except:
                    matched_product['status'] = False
                r.append(matched_product)
            else:
                print("Product not found")

        return {'order':r}

    except:
        return '505'

@app.route('/saveorderstate', methods=['POST'])
def save_order_state():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        print(s['save'])
        t = True
        for p in s['save']:
            if not p['status']:
                t =False
        
        if t:
            order = orders_col.find_one({'_id':ObjectId(s['oid'])})
            orders_col.delete_one({'_id':ObjectId(s['oid'])})
            order['sale_at'] = datetime.datetime.now()
            order['order'] = s['save']
            sales_col.insert_one(order)
        else:
            orders_col.update_one({'_id':ObjectId(s['oid'])},{'$set':{'order':s['save']}})
        

        return 'ok'

    except:
        return '505'


# /getanalitycs
    # <- sid | orders,views -> 
    # orders sorted DESC by created_at

# /getorders
    # <- sid | orders ->
    # orders sorted DESC by created_at

# /completeorder
    # <- order,sid | status ->
    # inserts SAFELY order
    # order is an array so an order could have multiple products
    # order doc: 
    # {
    #     _id: ObjectId("6640f61520186fe5a9d88c65"),
    #     order: [
    #         {
    #         pid: 'y1RnQx-2DTIf0-1mVKs8-Fl2Bve-VKhiF7-VkEVem',
    #         qts: 1,
    #         color: '#ffc933',
    #         price: 3200
    #         }
    #     ],
    #     sid: 'FoBa8e-Y07YsH-WWEog8-tkdLy4-6eQuI2-KNf8Xd',
    #     created_at: ISODate("2024-05-12T18:02:13.198Z")
    # }

# /getorder
    # <- oid | (array of products that are in the order) ->
    # get only title,product_id,files,price of the product
    # then to every product add keys "qts" and "color" and give them the values of the order's qts and color

# /saveproduct
    # <- sid,jid,save(product) | status ->
    # checks if sid is one of the user's stores using jid
    # inserts SAFELY product
    # product doc:
    # {
    #     desc: 'desc',
    #     title: 'Lether jacket',
    #     costPrice: '235',
    #     originalPrice: '235',
    #     price: '235',
    #     files: [ 'RqIH5h-9TQuiB-oYh4ig-R7WrmE-BezuXu-InZPDr.jpg' ],
    #     size: [ 1 ],
    #     colors: [ '#705200' ],
    #     qts: '10',
    #     pid: 'gqDYvj-vG1NgF-KvGKaG-4TRCDm-9RLPi2-M8oJHW',
    #     active: false
    # }

# /activeproduct
#


app.run(host = '0.0.0.0', port=4242,debug=True)

