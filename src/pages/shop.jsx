import React from 'react'
import SubMenu from '../components/SubMenu'
import { Footer } from '@/components/footer'
import Product from './Product'
import Explore from '../components/ExploreCategories'
import Pagination from '@/components/Pagination'
import RecentlyViewed from '@/components/RecentlyViewed'
import { StayLoop } from '@/components/StayLoop'

const shop = () => {
  return <>
    <SubMenu />
    <Explore />
    <Product />
    <Pagination />
    <RecentlyViewed />
    <StayLoop />
    <Footer />
  </>
}

export default shop