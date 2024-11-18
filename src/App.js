import React, { useState, useEffect, useStateValue } from "react";
import "./App.css";
import Header from "./Header";
import Appcontent from "./Appcontent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Checkout from "./Checkout";


function App() {
  // const [{ basket, user }, dispatch] = useStateValue()
  // const [authUser, setAuthUser] = useState(null);


  return (

    <div className="app">
      <Header />
      <Appcontent />
    </div>
  );
}
export default App;