import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../login/login.css';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const signUpWithEmail = async (event) => {
    event.preventDefault();
    try {
      createUserWithEmailAndPassword(auth,email,password).then((userCreds)=>{
        if(userCreds.user){
            window.localStorage.setItem("user",userCreds.user.email);
            navigate("/create2fa");
        }
      }).catch((error) => {
        const errorCode = error.code;
        alert("Error " + errorCode)
      });
    } catch (error) {
      alert("there was and issue signing up")
    }
  };

  return (
    <div className="login-form">
      <h2>Trivia Signup-In</h2>
      <form id='email-form' onSubmit={signUpWithEmail}>
          <input 
            type="text" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
        <span>Already have an account? <a href='/login'> Login</a></span>
    </div>
  );
}

export default Signup;
