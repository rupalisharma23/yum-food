import React,{useEffect,useState} from 'react';
import './Cart.css';
import axios from 'axios';
import backendURL from './Config';
import Navigation from "./NavBar";
import CircularProgress from '@mui/material/CircularProgress';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsChek, setCartItemsCheck] = useState([]);
    const [loader, setLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const [buyLoader, setBuyLoader] = useState(false);
    const [cartCount, setCartCount] = useState("");

    const getTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((items)=>{
            items.cart.forEach((item) => {
                totalPrice += parseInt(item.price) * item.quantity;
            });
        })
        return totalPrice;
    };

    useEffect(()=>{
        localStorage.getItem('token') && CartGetApi();
        localStorage.getItem('token') && cartCountApi();
    }, [])

    const CartGetApi = () => {
        setLoader(true)
        return axios
            .post(`${backendURL}/api/getCart`, {
                email: localStorage.getItem('email')
            })
            .then((res) => {
                setLoader(false)
                setCartItems(res.data)
                setCartItemsCheck(res.data[0].cart)
            })
            .catch((error) => { });
    }

    const buyOrders =() =>{
        let orders = cartItems
        setBuyLoader(true)
        return axios
            .post(`${backendURL}/api/Orders`, {
                email:localStorage.getItem('email'),
                orders: orders[0].cart
            })
            .then(async(res) => {
                setBuyLoader(false)
                await CartGetApi();
                setCartItems([]);
                setCartItemsCheck([]);
                await cartCountApi();
            })
            .catch((error) => { });
        console.log(orders)
    }


    const handleBuyAgain = () => {
       buyOrders()
    };

    const deleteCartItems = (index,id) =>{
        setDeleteLoader(true)
        return axios
            .delete(`${backendURL}/api/cartDelete/${id}`)
            .then((res) => {
                setDeleteLoader(false)
                cartCountApi();
                CartGetApi();
            })
            .catch((error) => { });
    }

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
      <Navigation cartCount={cartCount} />
          {loader ? <div className='spinnerClass' style={{ height: '60vh', display: 'flex', justifyContent: 'center' }}>
              Loading....
          </div> : 
          <div className="container" style={{height:'80vh', position:'relative'}}>
              {cartItems.length === 0 || cartItemsChek.length == 0 ?
                  <div className='emptyCart'>Your cart is empty</div>:(
                      <table style={{ width: '100%' }}>
                          <thead>
                              <tr>
                                  <th style={{ textAlign: 'start', fontFamily: 'cursive', fontSize: '1.2rem' }}>Dish name</th>
                                  <th style={{ textAlign: 'start', fontFamily: 'cursive', fontSize: '1.2rem' }}>Quantity</th>
                                  <th style={{ textAlign: 'start', fontFamily: 'cursive', fontSize: '1.2rem' }}>Price</th>
                                  <th style={{ textAlign: 'start', fontFamily: 'cursive', fontSize: '1.2rem' }}>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              {/* Add your table rows here */}
                              {cartItems.map((cartItem, index) => {
                                let {cart} = cartItem
                                  return (
                                    cart.map((cart)=>{
                                        return(
                                            <tr>
                                                <td style={{ padding: '1rem 0rem', fontFamily: 'cursive', fontSize: '1.2rem' }}>{cart.name}</td>
                                                <td style={{ padding: '1rem 0rem', fontFamily: 'cursive', fontSize: '1.2rem' }}>{cart.quantity}</td>
                                                <td style={{ padding: '1rem 0rem', fontFamily: 'cursive', fontSize: '1.2rem' }}>{parseInt(cart.price) * cart.quantity} </td>
                                                <td style={{ padding: '1rem 0rem', fontFamily: 'cursive', fontSize: '1.2rem', color: 'red', cursor: 'pointer' }} onClick={() => { deleteCartItems(index, cart._id) }} >Delete</td>
                                            </tr>
                                        )
                                    })
                                      
                                  )
                              })}
                              <div className='totalPrice'>Total Price : Rs{getTotalPrice()}</div>
                          </tbody>
                      </table>
              )
              }
              {/* Add any actions or buttons here */}
                  {(cartItems.length === 0 || cartItemsChek.length == 0) ? null : (<div style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
                      <button onClick={() => { !buyLoader && handleBuyAgain() }} className='buyAgainButton'>{buyLoader ? <CircularProgress style={{ height: '1rem', width: '1rem', color: 'white' }} /> : "Buy"}</button>
              </div>)}
              </div>}
      </div>
  )
}
