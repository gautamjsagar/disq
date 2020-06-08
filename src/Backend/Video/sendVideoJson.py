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


@app.route('/video', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    formu = request.form
    subject_code = formu['subjectcode']
    goal_code = formu['goalcode']

    cur.execute("SELECT * FROM repositorytab where subject_code = '"+str(subject_code)+"'"+"and goal_code = '"+str(goal_code)+"'")
    formp = cur.fetchone()
    
    result = {
		'Id' : formp['id'],
		'URL' : formp['url'],
		'Subject_Code' : formp['subject_code'],
        'Goal_Code': formp['goal_code'],
        'Status': formp['status'],
        'Quiz_Status' : formp['quiz_status'],
	}

    return jsonify({'result' : result})

if __name__ == '__main__':
    app.run(debug=True)