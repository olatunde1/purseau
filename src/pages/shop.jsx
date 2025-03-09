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
import ProductSection from "@/components/products/ProductSection";
import { useProductStore } from "@/store/productStore";

const shop = () => {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category");

  console.log(categoryName, "categoryName");

  const {
    category,
    brand,
    colors,
    sizes,
    rating,
    maxPrice,
    searchQuery,
    sortBy,
  } = useProductStore();

  const params = Object.fromEntries(
    Object.entries({
      category: categoryName || category,
      availableColors: colors.length > 0 ? colors.join(",") : null,
      brand,
      reviewRating: rating,
      maxPrice: maxPrice,
      size: sizes.length > 0 ? sizes.join(",") : null,
    }).filter(([_, value]) => value !== undefined && value !== null)
  );

  const { data: Allproducts, isPending, error } = useGetProducts(params);

  const ProductData = Allproducts?.data?.result ?? [];

  console.log(ProductData);

  if (isPending) {
    return <GeneralLoader />;
  }

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <SubMenu category={categoryName} />
      <Explore />
      <ProductSection ProductData={ProductData} />
      <Product />
      <Pagination />
      <RecentlyViewed />
      <StayLoop />
      <Footer />
    </>
  );
};

export default shop;
