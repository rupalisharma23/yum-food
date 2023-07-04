import React,{useEffect,useState} from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import './Cart.css';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import backendURL from './Config';

export default function Cart(props) {
    let {  setCartFlag } = props;
    const [cartItems, setCartItems] = useState([])
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
        if (props.cartFlag)
        CartGetApi();
    }, [props.cartFlag])

    console.log(cartItems)

    const CartGetApi = () => {
        return axios
            .post(`${backendURL}/api/getCart`, {
                email: localStorage.getItem('email')
            })
            .then((res) => {
                setCartItems(res.data)
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
                setCartItems([])
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
                CartGetApi()
            })
            .catch((error) => { });
    }


  return (
      <Dialog
          open={props.cartFlag}
          PaperProps={{
              style: {
                  borderRadius: '14px',
                  width: '80%',
                  height: '100%',
              }
          }}
      >
          <DialogContent>
            <div className='closeDiv'>
                  <h3 className='cartTitle'>Cart</h3>
                  <CloseIcon style={{ cursor: 'pointer' }} onClick={() => { setCartFlag(false) }} />
            </div>
              {cartItems.length === 0?
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
          </DialogContent>
          <DialogActions>
              {/* Add any actions or buttons here */}
              <button onClick={handleBuyAgain} className='buyAgainButton'>Buy</button>
          </DialogActions>
      </Dialog>
  )
}
