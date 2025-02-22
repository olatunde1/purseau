import React from 'react'
import SubMenuCloth from '../components/SubMenuCloth'
import { Footer } from '@/components/footer'
import Explore from '../components/ExploreCategories'
import RecentlyViewed from '@/components/RecentlyViewed'




const Cloth = () => {
  return <>
      <SubMenuCloth />
      <Explore />
      <RecentlyViewed />
      <Footer />
  </>

}

export default Cloth