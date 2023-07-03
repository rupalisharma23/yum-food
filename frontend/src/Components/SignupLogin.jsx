import React from 'react';
import { useState } from 'react';
import './SignupLogin.css';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import backendURL from './Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupLogin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [flag, setFlag] = useState(false);
    const [error,setError] = useState('')
    const navigate =  useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        // Add your signup logic here, e.g., sending data to the server
        SignUp()
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your signup logic here, e.g., sending data to the server
        login();
    };

    const SignUp = () => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
        }
        else if(password.length<5){
           setError('please enter valid password') 
        }
        else if(name.length<5){
            setError('please enter valid name') 
        }
        else{
            return axios
                .post(
                    `${backendURL}/api/createUser`,
                    {
                        email: email,
                        password: password,
                        name: name,
                        address:address
                    },
                    {headers:{
                        'Content-Type':'application/json'
                    }}
                )
                .then((res) => {
                    setFlag(true)
                })
                .catch((error) => {
                    toast.error(error.response.data.error, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: 'custom-toast', // Add your custom class here
                    })
                });
    }};

    const login = () => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailPattern.test(emailLogin)) {
            setError('Please enter a valid email address');
        }
        else if (passwordLogin.length < 5) {
            setError('please enter valid password')
        }
        else{
            return axios
                .post(
                    `${backendURL}/api/login`,
                    {
                        email: emailLogin,
                        password: passwordLogin
                    },
                )
                .then((res) => {
                    localStorage.setItem('token', res.data.authToken)
                    localStorage.setItem('email', emailLogin)
                    navigate("/Home")
                })
                .catch((error) => {
                    setError(error.response.data.errors)
                });
        }
    };

    const loginForm = () =>{
        return (
            <div className="signup-container">
                <h1>LoginIn</h1>
                <form onSubmit={handleLogin}>
                   
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={emailLogin}
                            onChange={(e) => setEmailLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={passwordLogin}
                            onChange={(e) => setPasswordLogin(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className='error'>{error}</div>}
                    <div className='buttonContainer'> <button type="submit" className="signup-button">login</button></div>
                </form>
            </div>
        )
    }

    const signiUp = () =>{
        return (
            <div className="signup-container">
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className='error'>{error}</div>}
                    <div className='buttonContainer'><button type="submit" className="signup-button">Sign Up</button></div>               
                </form>
                <p>
                    Already have an account? <a onClick={()=>{setFlag(true)}}>Sign In</a>
                </p>
            </div>
        )
    }


  return (
    <div className='mainContainer'>
          <ToastContainer />
          {flag ? loginForm() : signiUp()}
    </div>
    
  )
}
