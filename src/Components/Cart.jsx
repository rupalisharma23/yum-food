import React from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import './Cart.css';
import axios from 'axios';

export default function Cart(props) {
    let { cartItems, setCartItems } = props;
    const getTotalPrice = (items) => {
        let totalPrice = 0;

        items.forEach((item) => {
            totalPrice += parseInt(item.price) * item.quantity;
        });

        return totalPrice;
    };
    console.log(cartItems)

    const buyOrders =() =>{
        return axios
            .post(`http://localhost:5000/api/Orders`, cartItems)
            .then((res) => {
                setCartItems([])
            })
            .catch((error) => { });
    }


    const handleBuyAgain = () => {
       buyOrders()
    };
    // hi
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
              <h3 className='cartTitle'>Cart</h3>
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
                              {cartItems.map((cart) => {
                                  return (
                                      <tr>
                                          <td style={{ padding: '1rem 0rem', fontFamily: 'cursive', fontSize: '1.2rem' }}>{cart.name}</td>
                                          <td style={{ padding: '1rem 0rem', fontFamily: 'cursive', fontSize: '1.2rem' }}>{cart.quantity}</td>
                                          <td style={{ padding: '1rem 0rem', fontFamily: 'cursive', fontSize: '1.2rem' }}>{cart.price} </td>
                                          <td style={{ padding: '1rem 0rem', fontFamily: 'cursive', fontSize: '1.2rem' }}>Delete</td>
                                      </tr>
                                  )
                              })}
                              <div className='totalPrice'>Total Price : Rs{getTotalPrice(cartItems)}</div>
                          </tbody>
                      </table>
              )
              }
          </DialogContent>
          <DialogActions>
              {/* Add any actions or buttons here */}
              <button onClick={handleBuyAgain} className='buyAgainButton'>Buy Again</button>
          </DialogActions>
      </Dialog>
  )
}
