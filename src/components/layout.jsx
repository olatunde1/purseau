import React from 'react'
import Header from './header'
import Footer from './footer'
import Navbar from './navbar'
import { Outlet } from 'react-router-dom'

const layout = () => {
  return <>
    <Header />
    <Navbar />
    <Outlet />
    <Footer />
  </>
}

export default layout