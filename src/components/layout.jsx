import React from 'react'
import Header from './header'
// import Footer from './Footer'
import Navbar from './navbar'
// import ProductType from './ProductDisplay'
import { Outlet } from 'react-router-dom'

const layout = () => {
  return <>
    <Header />
    <Navbar />
    <Outlet />
    {/* <ProductType/> */}
    {/* <Footer /> */}
  </>
}

export default layout