import React from 'react'
import SubMenu from '../components/SubMenu'
import { Footer } from '@/components/footer'
import Product from './Product'
import Explore from '../components/ExploreCategories'

const shop = () => {
  return <>
    <SubMenu />
    <Explore />
    <Product />
    <Footer />
  </>
}

export default shop