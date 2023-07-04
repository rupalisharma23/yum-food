import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';

const Navigation = (props) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <NavLink to="/Home" className="logo">
                    YumFood
                </NavLink>
            </div>
            <div className="navbar-right">
                <NavLink to="/MyOrders" className="nav-button">
                    My Orders
                </NavLink>
                 <NavLink className="nav-button" onClick={() => { props.setCartFlag(true) }}>
                    <div style={{position:'relative'}}>
                        <ShoppingCartIcon className="white-icon" />
                        { props.cartCount !== 0 && <div className='cartCount'>{props.cartCount}</div>} 
                        </div>
                </NavLink>
                <NavLink className="nav-button" to="/" onClick={() => { localStorage.clear() }}>
                    <LogoutIcon className="white-icon" />
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;
