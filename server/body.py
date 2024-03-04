from crypt import methods
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


passwd = '8937#snsvvpKKt##8'
client = MongoClient(f'mongodb://swaperz:{urllib.parse.quote(passwd)}@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&authSource=swaperz&appName=mongosh+1.5.0')
private_key = "MIICWwIBAAKBgH6F7rrAdGPbzOjIg0A2T8giaNQX9cA52OGvwojmPCbl7cq4UeBbL1AtdHK7xqACEyYu8ymQWydVoYv4RRUxtNLbOVbY7s8/v0tRo1itMZwFt6f0S2/Mr/odTWcpXsV8H5BVs55AGfxDHcd5EtY66V5bCZEBlETiOJ4lRLkidAgMBAAECYBqCjhWPtyNoPdxFjSiyaIO1CeieJHFHcNj65nggQ5jD4wnvimpE1sSlryMM0gbswF3nBvidwFeyy8VD6ReqfIUrb/dR9UaeCufH1sCBdGjDFozTIsW6AVfghW4l3lGdACCoMa2Mrizar0oIV73KsrzypE41dcm9gkpFRyje5QJBANiLNzJ57KiBZgXBJ5aC8l2LfBPugyO1ILe3wNhStGzBLx2pZkPq6IYQqeYNDr5GbTfVLs0kQhXEKXKR2ycCQQCVk6nW5PwHGWQ4TJR4qGiq6J0T5lAvE7KMau4jJ5E4J/Nkby57z6gNQGff9BIhx5XSiq4Y3Awjjwlhoq6ibAkAeOD95wd4vHe/YciGmNZwRRfgI6A5G2P3f6tK0O/xBXzHzO5CqDPPEeBEBKp8D2QKmKuxYVBAynWzDUmudAkAtTd5hlXrqIssajWGHiwrpDyUeWvL9oFbn9KcoPnLohr3M62Pird2iYldX0WmqZb9gefG/cpRgenZOjUFAkEAmLmLrd1FWA2u4wqlybIUMm07c8NBV5lqt9zwo8JGnY8cbLmFA92rDaZZ6YOmcRUhi2Q46ONQKxbXk7DuH78g"

user_col = client['swaperz']['users']
stores_col = client['swaperz']['stores']
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
        e = user_col.find_one({'uid':jid['uid']})
        # print(jid['uid'])
        # print(e)
        stores = []
        prv = True if s['prv'] == 'prv' else False
        try:
            stores = e['stores']
            stores.append({'store_id':store_id,'name':s['name'],'p':prv})
        except:
            stores.append({'store_id':store_id,'name':s['name'],'p':prv})

        if e != None:
            user_col.update_one({'uid':jid['uid']},{'$set':{'stores':stores}})
            # return jwt.encode({'email':s['email'],'uid':ehash},private_key)
            stores_col.insert_one({'owner':jid['uid'],'store_id':store_id,'name':s['name'],'p':prv})
            return 'ok'
        else:
            return '505'
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

@app.route('/getstore', methods=['POST'])
def get_store():
    try:
        data = request.data.decode("utf-8")
        s=json.loads(data)
        if s['w'] == 0:
            st= stores_col.find_one({'subdomain':s['subd']})
        else:
            st= stores_col.find_one({'store_id':s['sid']})

        try:
           i = st['inner']
           p = st['products']
           return jsonify({'store':i,'products':p})
        except:
            return 'no.'
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
            return '506'
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
                    st['products'][fi]['active'] = True
            stores_col.update_one({'store_id':s['sid']},{'$set':{'products':st['products']}})
            return 'updated'
        else:
            return '504'
    except:
        return '505'






app.run(host = '0.0.0.0', port=4242,debug=True)

