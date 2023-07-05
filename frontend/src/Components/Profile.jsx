import React from 'react';
import './Profile.css';
import Navigation from "./NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import backendURL from "./Config";
import { ToastContainer, toast } from 'react-toastify';

export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [cartCount, setCartCount] = useState("");
    useEffect(() => {
        getUser();
        cartCountApi();
    }, []);


    const getUser = () => {
        return axios
            .get(`${backendURL}/api/userDetails`, {
                headers: { email: localStorage.getItem("email") },
            })
            .then((res) => {               
                setName(res.data.userInfo.name);
                setEmail(res.data.userInfo.email);
                setAddress(res.data.userInfo.address)
                setPassword(res.data.userInfo.password)
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Name:', name);
        console.log('Updated Email:', email);
        console.log('Updated Address:', address);

        return axios.put(`${backendURL}/api/updateInfo`,{
            name,
            email,
            password,
            address
        },{headers:{email:localStorage.getItem('email')}}).then(async(res) => {
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
        });
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
          <div className="container" style={{height:'80vh', position:'relative'}}>
              <h1>Edit Profile</h1>
              <form onSubmit={handleSubmit}>
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

                  <div style={{ position: 'absolute', bottom: '0', right: '0' }}>
                      <button type="submit" className='buyAgainButton'>Save Changes</button>
                  </div>
              </form>
          </div>
    </div>
  )
}
