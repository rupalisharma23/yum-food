import React from "react";
import Navigation from "./NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import backendURL from "./Config";

export default function () {
  const [orders, setOrders] = useState([]);
  const [cartCount, setCartCount] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
   localStorage.getItem("token") && OrderListApi();
   localStorage.getItem("token") && cartCountApi();
  }, []);

  const OrderListApi = () => {
    setLoader(true)
    return axios
      .post(`${backendURL}/api/getOrders`, {
        email: localStorage.getItem("email"),
      })
      .then((res) => {
        setLoader(false)
        setOrders(res.data);
      })
      .catch((error) => {});
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

  const groupOrdersByDate = (ordersData) => {
    const groupedOrders = ordersData.reduce((result, user) => {
      user.orders.forEach((order) => {
        const date = order.date;
        if (!result[date]) {
          result[date] = [];
        }
        result[date].push({
          name: order.name,
          price: order.price,
          quantity: order.quantity,
          image:order.image
        });
      });
      return result;
    }, {});
    return groupedOrders;
  };

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div>
      <Navigation cartCount={cartCount} />
        {loader ? <div className='spinnerClass' style={{height:'60vh', display:'flex', justifyContent:'center'}}>
                Loading....
            </div>: 
      (orders.length === 0  ?
                  <div className='emptyCart' style={{height:'80vh'}}>you have no orders yet</div>:
      (Object.keys(groupedOrders).map((date) => {
        return (
          <>
            <h3 style={{ marginLeft: "10px", fontSize:"1.5rem", fontFamily:'cursive' }} className='mt-4 mb-4'>Date: {date}</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {groupedOrders[date].map((order, index) => (
                <div className="product-card">
                  <div className="image-container-product">
                    <img
                      src={`${backendURL}/images/${order.image}`}
                      alt={order.image}
                    />
                  </div>
                  <div className="details-container">
                    <h3>{order.name}</h3>
                    <p> quantity :{order.quantity}</p>
                    <p>
                      {" "}
                      total price:Rs {parseInt(order.price) * order.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      })))}
    </div>
  );
}

