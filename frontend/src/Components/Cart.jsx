import React,{useEffect,useState} from 'react';
import './Cart.css';
import axios from 'axios';
import backendURL from './Config';
import Navigation from "./NavBar";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsChek, setCartItemsCheck] = useState([]);
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
        return axios
            .post(`${backendURL}/api/getCart`, {
                email: localStorage.getItem('email')
            })
            .then((res) => {
                setCartItems(res.data)
                setCartItemsCheck(res.data[0].cart)
            })
            .catch((error) => { });
    }

    const buyOrders =() =>{
        let orders = cartItems
        return axios
            .post(`${backendURL}/api/Orders`, {
                email:localStorage.getItem('email'),
                orders: orders[0].cart
            })
            .then((res) => {
                setCartItems([]);
                cartCountApi();
            })
            .catch((error) => { });
        console.log(orders)
    }


    const handleBuyAgain = () => {
       buyOrders()
    };

    const deleteCartItems = (index,id) =>{
        return axios
            .delete(`${backendURL}/api/cartDelete/${id}`)
            .then((res) => {
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
          <div className="container" style={{height:'90vh', position:'relative'}}>
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
                                                <td style={{ padding: '1rem 0rem', fontFamily: 'cursive', fontSize: '1.2rem', color: 'red' }} onClick={() => { deleteCartItems(index, cart._id) }} >Delete</td>
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
              <div style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
                  <button onClick={handleBuyAgain} className='buyAgainButton'>Buy</button>
              </div>
              </div>
      </div>
  )
}
