import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  const signInWithEmail = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    setShowEmailLogin(false);
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithFacebook = async () => {
    setShowEmailLogin(false);
    try {
      await auth.signInWithPopup(facebookProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-form">
      <h2>Trivia Log-In</h2>
      <button type="button" onClick={() => setShowEmailLogin(true)}>Sign in with Email<img id="email-icon" class="social-icons" alt='email-icon'></img></button>

      {showEmailLogin && 
        <form id='email-form' onSubmit={signInWithEmail}>
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
          <button type="submit">Login</button>
        </form>
      }

      <button type="button" onClick={signInWithGoogle}>Sign in with Google <img id="google-icon" class="social-icons" alt='google-icon'></img></button>
      <button type="button" onClick={signInWithFacebook}>Sign in with Facebook <img id="facebook-icon" class="social-icons" alt='facebook-icon'></img></button>
      <span>Dont have an account? <a href='/signup'>Signup using Email</a></span>
      
    </div>
  );
}

export default Login;
