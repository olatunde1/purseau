import React from 'react'
import SubMenu from '../components/SubMenu'
import { Footer } from '@/components/footer'
import Product from './product'
import Explore from '../components/ExploreCategories'

const shop = () => {
  return <>
    <SubMenu />
    <Explore />
    <Product />
    <p>Thanks</p>
    <Footer />
  </>
}

export default shop