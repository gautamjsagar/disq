

# -*- coding: utf-8 -*-
"""
Created on Thu May 28 21:46:43 2020

@author: Yash Rajendra
"""

from flask import Flask,request,redirect,url_for,render_template
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

@app.route('/users/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = "true"
    return result    



if __name__ == "__main__":
    app.run(debug=True)
