import "./App.css";
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Note: Using HashRouter
import { Switch } from "react-router-dom";
import SignupLogin from "./Components/SignupLogin";
import Home from "./Components/Home";
import MyOrders from "./Components/MyOrders";
import Cart from "./Components/Cart";
import Profile from "./Components/Profile";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path={"/"} element={<SignupLogin />} />
          <Route exact path={"/Home"} element={<Home />} />
          <Route exact path={"/MyOrders"} element={<MyOrders />} />
          <Route exact path={"/Cart"} element={<Cart />} />
          <Route exact path={"/Profile"} element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
