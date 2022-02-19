import React, { useState } from 'react'
import './index.css';

function SignUp() {
  const [newUserName,setNewUserName]= useState('');
  const [newEmail,setNewEmail]= useState('');
  const [newPassword,setNewPassword]= useState('');
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(newUserName && newPassword && newEmail) {
      console.log(newUserName,newPassword);
      setNewUserName('');
      setNewPassword('');
      setNewEmail('');
    }
  }
  return (
    <div className="login_container">
      <div className="flex_container">
        <div className="signUp_wrapper">
          <div>
            <h2 className='bold'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="input">
                <label> User Name: </label>
                <input type="text" value={newUserName} onChange={(e)=> setNewUserName(e.target.value)} placeholder='User Name' />
              </div>
              <div className="input">
                <label> Email: </label>
                <input type="email" value={newEmail} onChange={(e)=> setNewEmail(e.target.value)} placeholder='User Name' />
              </div>
              <div className="input">
                <label> Password: </label>
                <input type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} placeholder='Password'/>
              </div>
              <button type="submit" className='btn btn-signIn'>Sign Up</button>
            </form>
            {/* <p className='warning_message'>Please try again!!!</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp