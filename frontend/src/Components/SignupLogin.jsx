import React from 'react';
import { useState } from 'react';
import './SignupLogin.css';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import backendURL from './Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./NavBar";

export default function SignupLogin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        SignUp()
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
                    navigate("/Login")
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

    const signiUp = () =>{
        return (
            <div>
                <Navigation />
                <div className="container" style={{ height: '80vh', position: 'relative' }}>
                    <h1>Register</h1>
                    <form onSubmit={handleSignup}>
                        <div className="label-container mt-4">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                                className="input-field"
                            />
                        </div>

                        <div className="label-container mt-4">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="label-container mt-4">
                            <label htmlFor="address">Address:</label>
                            <textarea
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="textarea-field"
                                required
                            />
                        </div>

                        <div className="label-container mt-4">
                            <label htmlFor="address">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        {error && <div className='error'>{error}</div>}
                        <div style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
                            <button type="submit" className='buyAgainButton'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


  return (
    <div>
          <ToastContainer />
          {signiUp()}
    </div>
    
  )
}
