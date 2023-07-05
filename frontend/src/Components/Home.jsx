
import React from 'react';
import Navigation from './NavBar';
import './Home.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backendURL from './Config';

export default function Home() {
    const [cartCount, setCartCount] = useState('')
    const [search, setSearch] = useState('')
    const [food, setFood] = useState([])
    const [cartFlag, setCartFlag] = useState(false)
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    useEffect(() => {
        foodListApi();
        localStorage.getItem('token') && cartCountApi();
    }, [cartFlag])

    const foodListApi = () => {
        return axios
            .get(`${backendURL}/api/foodList`)
            .then((res) => {
                setFood(res.data)
            })

    };

    const cartCountApi = () => {
        return axios
            .get(`${backendURL}/api/getCount`, {
                headers: { email: localStorage.getItem('email') }
            })
            .then((res) => {
                setCartCount(res.data.count)
            })

    };

    const handleIncrement = async (dises, index1, index2) => {
        let tempArray = [...food]
        tempArray[index1].dish[index2] = await { ...tempArray[index1].dish[index2], quantity: tempArray[index1].dish[index2].quantity + 1 }
        setFood(tempArray)
    };

    const handleDecrement = (dises, index1, index2) => {
        let tempArray = [...food]
        if (tempArray[index1].dish[index2].quantity > 0) {
            tempArray[index1].dish[index2] = { ...tempArray[index1].dish[index2], quantity: tempArray[index1].dish[index2].quantity - 1 }
            setFood(tempArray)
        }
    };

    const handleAddToCart = (index1, index2, dishes) => {
        if (!localStorage.getItem('token')) {
            toast.error("please login", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'custom-toast', // Add your custom class here
            })
        }
        else {
            return axios
                .post(
                    `${backendURL}/api/cart`,
                    {
                        _id: dishes._id,
                        name: dishes.name,
                        price: dishes.price,
                        quantity: dishes.quantity,
                        date: formattedDate,
                        image: dishes.image,
                        email: localStorage.getItem('email')
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((res) => {
                    cartCountApi()
                    toast.success('item added to your cart', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: 'custom-toast', // Add your custom class here
                    })
                })
                .catch((error) => {
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
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <ToastContainer />
            <Navigation cartCount={cartCount} />
            <div className="image-container">
                <img src="/background.jpg" alt="Image" />
            </div>
            <div className="search-bar-container">
                <div className="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    <input type="text" placeholder="Search..." onChange={(e) => { setSearch(e.target.value) }} />
                </div>


            </div>
            {
                food.map((data, index1) => {
                    return (
                        <>
                            {!search && <div className='category'>{data.categoryName}</div>}
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {
                                    data.dish.map((dishes, index2) => {
                                        if (search && !dishes.name.toLowerCase().replace(/ /g, '').includes(search.toLocaleLowerCase().replace(/ /g, ''))) {
                                            return null;
                                        }
                                        else {
                                            return (
                                                <div className="product-card">
                                                    <div className="image-container-product">
                                                        <img src={`${backendURL}/images/${dishes.image}`} alt={dishes.image} />
                                                    </div>
                                                    <div className="details-container">
                                                        <h3>{dishes.name}</h3>
                                                        <p>{parseInt(dishes.price) * dishes.quantity}</p>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <div className="quantity-container">
                                                            <button onClick={() => { handleDecrement(dishes, index1, index2) }}>-</button>
                                                            <span>{dishes.quantity}</span>
                                                            <button onClick={() => { handleIncrement(dishes, index1, index2) }}>+</button>
                                                        </div>
                                                        <div className='addToCart'> <button onClick={() => handleAddToCart(index1, index2, dishes)}>Add to Cart</button></div>
                                                    </div>

                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>

                        </>
                    )
                })
            }
        </div>
    )
}
