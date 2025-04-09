import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useProductStore } from "@/store/productStore";
import useGetProducts from "@/hooks/api/queries/product/useGetProducts";

// Components
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Pagination from "@/components/Pagination";
import RecentlyViewed from "@/components/RecentlyViewed";
import { StayLoop } from "@/components/StayLoop";
import GeneralLoader from "@/components/general/GeneralLoader";
import ProductSection from "@/components/products/ProductSection";
import SubMenu from "../components/SubMenu";
import Explore from "../components/ExploreCategories";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category");
  const { category, brand, colors, sizes, rating, maxPrice } =
    useProductStore();

  const { state } = useLocation();
  console.log(state?.searchProduct, "state from search results");

  const searchProducts = state?.searchProduct ?? [];

  // Build query parameters
  // const params = Object.fromEntries(
  //   Object.entries({
  //     category: categoryName || category,
  //     availableColors: colors.length > 0 ? colors.join(",") : null,
  //     brand,
  //     reviewRating: rating,
  //     maxPrice,
  //     size: sizes.length > 0 ? sizes.join(",") : null,
  //   }).filter(([_, value]) => value !== undefined && value !== null)
  // );

  // const { data: Allproducts, isPending, error } = useGetProducts(params);
  // const ProductData = Allproducts?.data?.result ?? [];

  // if (isPending) return <GeneralLoader />;
  // if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <>
      {/* Main Content: Sidebar + Product Results */}
      <div className="container mx-auto flex gap-6">
        {/* Search Results */}
        <main className="flex-1">
          {searchProducts.length === 0 ? (
            <div className="text-center text-gray-500 my-5">
              No products found.
            </div>
          ) : (
            <>
              <ProductSection ProductData={searchProducts} />

              {/* Pagination & Additional Sections */}
              <Pagination />
            </>
          )}
        </main>
      </div>

      <RecentlyViewed />
      <StayLoop />
      <Footer />
    </>
  );
};

export default SearchResults;
