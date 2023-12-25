import React from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
// import Navbar from "./Componets/Header";
// import Header from "./Componets/Header";
import Accessories from "./Componets/Accessories";
import MyVault from "./Pages/MyVault";
import Community from "./Pages/Community";
import Profile from "./Pages/Profile";
import CheckOut from './Pages/CheckOut'

function Layout() {
  return (
    <>
    
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          
          <Route path="/" element={<App />} />
          <Route path="/myvault" element={<MyVault />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/accessories" element={<Accessories />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Layout;
