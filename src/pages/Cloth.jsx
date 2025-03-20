import React from 'react'
import { Footer } from '@/components/footer'
import Explore from '../components/ExploreCategories'
import RecentlyViewed from '@/components/RecentlyViewed'
import ProductCloth from '../components/ProductCloth'
import TopPicks from '@/components/TopPicks'
import Pagination from '@/components/Pagination'
import OurFeaturedCollection from '../components/OurFeaturedCollection'
import { StayLoop } from '@/components/StayLoop'






const Cloth = () => {
  return (
    <>
      <SubMenu category={"cloth"} />
      <Explore />
      <TopPicks />
      <ProductCloth />
      <Pagination />
      <OurFeaturedCollection />
      <RecentlyViewed />
      <StayLoop />
      <Footer />
    </>
  );

}

export default Cloth