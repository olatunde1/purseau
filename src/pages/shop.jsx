import SubMenu from "../components/SubMenu";
import { Footer } from "@/components/Footer";
import Explore from "../components/ExploreCategories";
import Pagination from "@/components/Pagination";
import RecentlyViewed from "@/components/RecentlyViewed";
import { StayLoop } from "@/components/StayLoop";
import { useSearchParams } from "react-router-dom";
import useGetProducts from "@/hooks/api/queries/product/useGetProducts";
import GeneralLoader from "@/components/general/GeneralLoader";
import ProductSection from "@/components/products/ProductSection";
import { useProductStore } from "@/store/productStore";


const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category");

  // console.log(categoryName, "categoryName");

  const {
    category,
    brand,
    colors,
    sizes,
    rating,
   
  } = useProductStore();

  const params = Object.fromEntries(
    Object.entries({
      category: categoryName || category,
      availableColors: colors.length > 0 ? colors.join(",") : null,
      brand,
      limit: 20,
      reviewRating: rating,
      // maxPrice: maxPrice ?? "",
      size: sizes.length > 0 ? sizes.join(",") : null,
    }).filter(([, value]) => value !== undefined && value !== null)
  );

  const { data: Allproducts, isPending, error } = useGetProducts(params);

  const ProductData = Allproducts?.data?.result ?? [];

  // console.log(ProductData);

  if (isPending) {
    return <GeneralLoader />;
  }

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <SubMenu category={categoryName} />
      <Explore />
      <ProductSection ProductData={ProductData?.items} />
      {/* <ProductsPage /> */}
      <Pagination />
      <RecentlyViewed />
      <StayLoop />
      <Footer />
    </>
  );
};

export default Shop;