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



@app.route('/register', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    formq = request.form
    username = formq['Username']
    password = bcrypt.generate_password_hash(formq['Password']).decode('utf-8')
    mobilenumber = formq['MobileNumber']
    
    cur.execute("INSERT INTO logintab (username,password, Mobile) VALUES ('" + 
		str(username) + "', '" + 
		str(password) + "', '" + 
		str(mobilenumber) + "')")

    mysql.connection.commit()
	
    result = {
		'Username' : username,
		'Password' : password,
		'MobileNumber' : mobilenumber,	
	}

    return jsonify({'result' : result})

if __name__ == '__main__':
    app.run(debug=True)