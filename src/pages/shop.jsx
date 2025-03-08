import React from "react";
import SubMenu from "../components/SubMenu";
import { Footer } from "@/components/footer";
import Product from "./Product";
import Explore from "../components/ExploreCategories";
import Pagination from "@/components/Pagination";
import RecentlyViewed from "@/components/RecentlyViewed";
import { StayLoop } from "@/components/StayLoop";
import { useSearchParams } from "react-router-dom";
import useGetProducts from "@/hooks/api/queries/useGetProducts";
import GeneralLoader from "@/components/general/GeneralLoader";

const shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  console.log(category, "category");

  const { data: Allproducts, isPending } = useGetProducts();

  console.log(Allproducts);

  if (isPending) {
    return <GeneralLoader />;
  }
  return (
    <>
      <SubMenu category={category} />
      <Explore />
      <Product />
      <Pagination />
      <RecentlyViewed />
      <StayLoop />
      <Footer />
    </>
  );
};

export default shop;
