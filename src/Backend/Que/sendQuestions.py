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
    q_id = []
    que = []

    for row in records:
        q_id.append(row['q_id'])
        que.append(row['question'])

    
    result = {
        'Q_ID' : q_id,
        'Question' : que,
    }

    return jsonify({'result' : result})
    

if __name__ == '__main__':
    app.run(debug=True)