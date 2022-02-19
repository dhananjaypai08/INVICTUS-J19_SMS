from flask import Flask, request, render_template, session, redirect, url_for
from flask_mysqldb import MySQL
import MySQLdb.cursors 
import os
import re
import jinja2

app = Flask(__name__)

app.secret_key = "Not defined yet"

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'May#2002' # os.environ.get('password') Environment variable for password not set yet
app.config['MYSQL_DB'] = 'userlogin'

mysql = MySQL(app)

@app.route('/')
def starter():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''
    if request.method=='POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if not username or not password:
            msg = "username or password not valid"
        else:
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute('SELECT * FROM useraccounts WHERE username = % s AND password = % s', (username, password, ))
            user_data = cursor.fetchone()
            if not user_data:
                msg = "Account does not exist"
            else:
                session['loggedin'] = True
                session['id'] = user_data['id']
                session['username'] = user_data['username']
                msg = "Successfully logged in"
                return redirect('/home')
    return render_template('index.html',msg=msg)
            
@app.route('/logout')
def logout():
    session.pop('loggedin',None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))

@app.route('/register',methods=['GET', 'POST'])
def register():
    msg = ''
    if request.method=='POST':
        username = request.form.get('username')
        password = request.form.get('password')
        email = request.form.get('email')
        bad_data = False
        if not username or not password or not email:
            msg = "Please Enter full details"
            bad_data = True
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM useraccounts WHERE username = % s', (username, ))
        account_data = cursor.fetchone()
        
        if account_data and not bad_data:
            msg = "Username is already taken"
        else:
            correct_email = re.search(r'@ves.ac.in$',email)
            correct_username = re.match(r'[A-Za-z0-9]+',username)
            cursor.execute('SELECT * FROM useraccounts WHERE email = % s', (email, ))
            existing_email = cursor.fetchone()
            if not correct_email:
                msg = "Please Enter your VESIT mail id"
            elif not correct_username:
                msg = "username must not contain any special characters"
            elif existing_email:
                msg = "Account Already exists"
            else:
                cursor.execute('INSERT INTO useraccounts VALUES (NULL, % s, % s, % s)', (username, password, email, ))
                mysql.connection.commit()
                msg = 'You have successfully registered !'
                return redirect('/login')
    return render_template('register.html',msg=msg)

@app.route('/home', methods=['GET', 'POST'])
def home():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM books')
    user_data = cursor.fetchall()
    
    return render_template('starter.html',book_data = user_data)

if __name__ == "__main__":
    app.run(debug=True)
