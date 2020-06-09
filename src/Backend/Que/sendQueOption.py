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


@app.route('/getquestions', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    formu = request.form
    que_count = formu['question_count']
    

    cur.execute("SELECT * FROM questionstab where q_id <= "+ que_count)
    records = cur.fetchall()
    
    result = { 1 : {'Question':'test','Option 1':'a','Option 2':'a','Option 3':'a','Option 4':'a'} }

    i = 1
    for row in records:
        
        ro = {
        'Id:':row['q_id'],
        'Question':row['question'],
        'Option 1':row['opt_1'],
        'Option 2':row['opt_2'],
        'Option 3':row['opt_3'],       
        'Option 4':row['opt_4'],
        'ans' : row['ans']
        }
        result[i] = ro
        i = i+1
        
        return jsonify(result)
     

if __name__ == '__main__':
    app.run(debug=True)