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


@app.route('/userprofile', methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    formu = request.form
    condition = formu['condition']
    if(condition=="insert"):
        uaid = formu['userid']
        firstname = formu['firstname']
        middlename = formu['middlename']
        lastname = formu['lastname']
        address1 = formu['addressline1']
        address2 = formu['addressline2']
        address3 = formu['addressline3']
        cit = formu['city']
        stat = formu['state'] 
        countr = formu['country']

        cur.execute("INSERT INTO userprofiletab (UAID,firstname,middlename,lastname,addressline_1,addressline_2,addressline_3,city,state,country) VALUES ('" +
        uaid + "','"+ 
		str(firstname) + "', '" + 
		str(middlename) + "','" + 
		str(lastname) + "','" +
        str(address1) + "','" +
        str(address2) + "','" +
        str(address3) + "','" +
        str(cit) + "','" +
        str(stat) + "','" +
        str(countr) + "')")
        mysql.connection.commit()
        result = "registration successful"

    else:
        uaid = formu['userid']
        cur.execute("SELECT * from userprofiletab where uaid = "+uaid)
        formq = cur.fetchone()
        result = {
            'userid' : formq['UAID'],
            'firstnam' : formq['firstname'],
            'middlenam' : formq['middlename'],
            'lastnam' : formq['lastname'],
            'addresslin_1' : formq['addressline_1'],
            'addresslin_2' : formq['addressline_2'],
            'addresslin_3' : formq['addressline_3'],
            'cit' : formq['city'],
            'stat' : formq['state'],
            'countr' : formq['country'],
        }    
        
    
    return jsonify({'result' : result})

if __name__ == '__main__':
    app.run(debug=True)


    