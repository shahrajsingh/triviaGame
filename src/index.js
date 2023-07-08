import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './components/authentication/authContext';
import Login from './components/authentication/login/login';
import Signup from './components/authentication/signup/signup';
import Signup2fa from './components/authentication/signup2fa/signup2fa';
import Login2fa from './components/authentication/login2fa/login2fa';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><App></App></AuthProvider>,
  },
  {
    path: "/login",
    element: <AuthProvider><Login></Login></AuthProvider>
  },
  {
    path: "/signup",
    element: <AuthProvider><Signup></Signup></AuthProvider>
  },
  {
    path: "/complete2fa",
    element: <AuthProvider><Login2fa></Login2fa></AuthProvider>
  },
  {
    path: "/create2fa",
    element: <AuthProvider><Signup2fa></Signup2fa></AuthProvider>
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
