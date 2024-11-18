import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home"
import Checkout from "./Checkout";
import Login from "./Login";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}>
                {" "}
            </Route>
            <Route path="/checkout" element={<Checkout />}>
                {" "}
            </Route>
            <Route path="/login" element={<Login />}>
                {" "}
            </Route>
        </Routes>
    );
};

export default AppRoutes;