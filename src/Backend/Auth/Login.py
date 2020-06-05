from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)

app = Flask(__name__)

CORS(app)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'testing'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)



@app.route('/login',methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    forml = request.form
    email = forml['Email']
    password = forml['Password']
    result = ""
    
    cur.execute("SELECT * FROM logintab where username = '"+str(email)+"'")
    formp = cur.fetchone()
    if bcrypt.check_password_hash(formp['password'],password):
        
        access_token = create_access_token(identity = {'username':formp['username'],'password':formp['password'],'Mobile':formp['Mobile']})
        result = access_token
    else:
        result = jsonify({"error":"Invalid Email and Password"})
    return result

if __name__ == '__main__':
    app.run(debug=True)