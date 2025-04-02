import React from "react";
import Header from "./header";
// import Footer from './Footer'
import Navbar from "./navbar";
// import ProductType from './ProductDisplay'
import { Outlet } from "react-router-dom";
// import Home from '@/pages/Home'

const layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      {/* <Home /> */}
      {/* <div className="w-[90%] mx-auto py-10"> */}
      <div className="bg-mainBg">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default layout;
