
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Switch } from "react-router-dom";
import SignupLogin from './Components/SignupLogin';
import Home from './Components/Home';
import MyOrders from './Components/MyOrders';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path={"/"} element={<SignupLogin />} />
          <Route exact path={"/Home"} element={<Home />} />
          <Route exact path={"/MyOrders"} element={<MyOrders />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
