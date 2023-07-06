import React from 'react';
import { useState } from 'react';
import './SignupLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backendURL from './Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from "./NavBar";
import CircularProgress from '@mui/material/CircularProgress';

export default function SignupLogin() {
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your signup logic here, e.g., sending data to the server
        login();
    };

    const login = () => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailPattern.test(emailLogin)) {
            setError('Please enter a valid email address');
        }
        else if (passwordLogin.length < 5) {
            setError('please enter valid password')
        }
        else {
            setLoader(true)
            return axios
                .post(
                    `${backendURL}/api/login`,
                    {
                        email: emailLogin,
                        password: passwordLogin
                    },
                )
                .then((res) => {
                    setLoader(false)
                    localStorage.setItem('token', res.data.authToken)
                    localStorage.setItem('email', emailLogin)
                    navigate("/")
                })
                .catch((error) => {
                    setLoader(false)
                    setError(error.response.data.errors)
                });
        }
    };

    const loginForm = () => {
        return (
            <div>
                <Navigation />
                <div className="container" style={{ height: '80vh', position: 'relative' }}>
                    <h1>Login</h1>
                    <form onSubmit={(e) => { !loader && handleLogin(e) }}>
                        <div className="label-container mt-4">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={emailLogin}
                                onChange={(e) => setEmailLogin(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        <div className="label-container mt-4">
                            <label htmlFor="address">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={passwordLogin}
                                onChange={(e) => setPasswordLogin(e.target.value)}
                                className="input-field"
                                required
                            />
                        </div>
                        {error && <div className='error'>{error}</div>}
                        <div style={{ position: 'absolute', bottom: '0', width:'100%', textAlign:'center' }}>
                            <button type="submit" className='buyAgainButton'>{loader ? <CircularProgress style={{ height: '1rem', width: '1rem', color: 'white' }} /> : "Login"}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div >
            <ToastContainer />
            {loginForm() }
        </div>

    )
}
