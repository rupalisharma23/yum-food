import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import { useState, useEffect } from "react";
import axios from "axios";
import backendURL from "./Config";
import { useNavigate } from 'react-router-dom';

const Navigation = (props) => {
let {cartCount} = props
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark justify-content-between">
            <div className="navbar-brand">YUMFOOD</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item pr-2">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    {localStorage.getItem('token')?
                    <>
                    <li className="nav-item pr-2">
                        <NavLink to="/MyOrders" className="nav-link">
                            My Orders
                        </NavLink>
                    </li>
                    <li className="nav-item pr-2">
                        <NavLink to="/Cart" className="nav-link" >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Cart
                                {/* {cartCount !== 0  && <div className='cartCount'>{cartCount}</div>} */}
                                { cartCount !== 0 && <div className='cartCount'>{cartCount}</div> }
                            </div>
                        </NavLink>
                    </li>
                    <li className="nav-item pr-2">
                        <NavLink to="/Profile" className="nav-link">
                            Profile
                        </NavLink>
                    </li>
                    <li className="nav-item pr-2">
                        <NavLink className="nav-link" to="/" onClick={() => { navigate("/"); localStorage.clear(); window.location.reload();  }}>
                            Logout
                        </NavLink>
                    </li>
                        </>:
                        <>
                        <li className="nav-item pr-2">
                        <NavLink to="/Register" className="nav-link">
                            Register
                        </NavLink>
                    </li>
                    <li className="nav-item pr-2">
                        <NavLink className="nav-link" to="/Login">
                            Login
                        </NavLink>
                            </li></>}

                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
