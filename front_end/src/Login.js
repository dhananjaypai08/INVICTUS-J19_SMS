import React, { useState } from 'react'
import './index.css';

function Login() {
  const [userName,setUserName] = useState('');
  const [password,setPassWord] = useState('');
  // const [email,setEmail] = useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(userName && password) {
      console.log(userName,password);
      setUserName('');
      setPassWord('');
    }
  }
  return (
    <div className="login_container">
      <div className="flex_container">

        <div className="form_wrapper">
          <div>
            <h2 className='bold'>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label> User Name: </label>
                <input type="text" name="username" value={userName} onChange={(e)=> setUserName(e.target.value)} placeholder='User Name' />
              </div>
              <div className="input">
                <label> Password: </label>
                <input type="password" value={password} name="password" onChange={(e)=> setPassWord(e.target.value)} placeholder='Password'/>
              </div>
              <button type="submit" className='btn btn-signIn'>Sign In</button>
            </form>
            <p>Message = {window.msg}</p>
          </div>
        </div>
        <div className='signUp_container'>
          <div>

            <h2 className='bold'>Welcome to login</h2>
            <p>Don't have an account?</p>
            <a href="./" className='btn btn-signUp'>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login