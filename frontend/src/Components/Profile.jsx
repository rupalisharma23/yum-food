import React from 'react';
import './Profile.css';
import Navigation from "./NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import backendURL from "./Config";
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [cartCount, setCartCount] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');
    const [updateLoader, setUpdateLoader] = useState(false);
    useEffect(() => {
        localStorage.getItem('token') && getUser();
        localStorage.getItem('token') &&  cartCountApi();
    }, []);


    const getUser = () => {
        setLoader(true)
        return axios
            .get(`${backendURL}/api/userDetails`, {
                headers: { email: localStorage.getItem("email") },
            })
            .then((res) => { 
                setLoader(false)              
                setName(res.data.userInfo.name);
                setEmail(res.data.userInfo.email);
                setAddress(res.data.userInfo.address)
                setPassword(res.data.userInfo.password)
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address');
        }
        else {
setUpdateLoader(true)
        return axios.put(`${backendURL}/api/updateInfo`,{
            name,
            email,
            password,
            address
        },{headers:{email:localStorage.getItem('email')}}).then(async(res) => {
            setUpdateLoader(false)
            toast.success('info updated', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'custom-toast', // Add your custom class here
            })
           await localStorage.setItem('email',email)
          await  getUser();
           
        }).catch((error) => {
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
        });}
    };

    const cartCountApi = () => {
        return axios
            .get(`${backendURL}/api/getCount`, {
                headers: { email: localStorage.getItem("email") },
            })
            .then((res) => {
                setCartCount(res.data.count);
            });
    };


  return (
    <div>
        <ToastContainer/>
          <Navigation cartCount={cartCount} />
          {loader ? <div className='spinnerClass' style={{ height: '60vh', display: 'flex', justifyContent: 'center' }}>
              Loading....
          </div> : 
          <div className="container" style={{height:'80vh', position:'relative'}}>
              <h1>Edit Profile</h1>
                  <form onSubmit={(e) => { !updateLoader && handleSubmit(e) } }>
                  <div className="label-container mt-4">
                      <label htmlFor="name">Name:</label>
                      <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input-field"
                          required
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
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="textarea-field"
                          required
                      />
                  </div>
                      {error && <div className='error'>{error}</div>}
                  <div style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
                          <button type="submit" className='buyAgainButton'>{updateLoader ? <CircularProgress style={{ height: '1rem', width: '1rem', color: 'white' }} /> : "Save Changes"}</button>
                  </div>
              </form>
          </div>}
    </div>
  )
}
