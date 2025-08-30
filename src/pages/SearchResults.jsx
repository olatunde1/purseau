import { useLocation} from "react-router-dom";



// Components
import { Footer } from "@/components/Footer";



import Pagination from "@/components/Pagination";
import RecentlyViewed from "@/components/RecentlyViewed";
import { StayLoop } from "@/components/StayLoop";

import ProductSection from "@/components/products/ProductSection";

const SearchResults = () => {
  // const [searchParams] = useSearchParams();
  // const categoryName = searchParams.get("category");
  // const { category, brand, colors, sizes, rating, maxPrice } =
  //   useProductStore();

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
