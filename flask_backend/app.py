from distutils.log import debug
from flask import Flask, request, render_template, session, redirect, url_for
from flask_mysqldb import MySQL
import MySQLdb.cursors 
import os
import re

app = Flask(__name__)

app.secret_key = "Not defined yet"

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'May#2002' # os.environ.get('password') Environment variable for password not set yet
app.config['MYSQL_DB'] = 'userlogin'

mysql = MySQL(app)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.form=='POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if not username or not password:
            msg = "Please Enter Registered Username and Password"
        else:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM useraccounts WHERE username = % s AND password = % s', (username, password, ))
            user_data = cursor.fetchone()
            if not user_data:
                msg = "Please Enter the Correct Username and Password"
            else:
                session['loggedin'] = True
                session['id'] = user_data['id']
                session['username'] = user_data['username']
                msg = "Logged in Successfully"
        return render_template('index.html',param_msg=msg)
    return render_template('index.html',param_msg="nothing")
            
@app.route('/logout')
def logout():
    session.pop('loggedin',None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/register',methods=['GET', 'POST'])
def register():
    if request.method=='POST':
        username = request.form.get('username')
        password = request.form.get('password')
        email = request.form.get('email')
        bad_data = False
        if not username or not password or not email:
            msg = "Please Enter full details"
            bad_data = True
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM accounts WHERE username = % s', (username, ))
        account_data = cursor.fetchone()
        
        if account_data and not bad_data:
            msg = "Account Already Exists"
        else:
            correct_email = re.search(r'@ves.ac.in$',email)
            correct_username = re.match(r'[A-Za-z0-9]+',username)
            if not correct_email:
                msg = "Please Enter your Ves gmail id"
            elif not correct_username:
                msg = "username must not contain any special characters"
            else:
                cursor.execute('INSERT INTO accounts VALUES (NULL, % s, % s, % s)', (username, password, email, ))
                mysql.connection.commit()
                msg = 'You have successfully registered !'
    return render_template('register.html',param_msg=msg)
app.run(debug=True)