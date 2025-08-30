
import ProductList from "./ProductList";
import FilterSidebar from "./FilterSidebar";

const ProductSection = ({ ProductData }) => {
  //   const params = Object.fromEntries(
  //     Object.entries({
  //       category,
  //       brand,
  //       colors: colors.length > 0 ? colors.join(",") : null,
  //       sizes: sizes.length > 0 ? sizes.join(",") : null,
  //       rating,
  //       maxPrice,
  //       search: searchQuery,
  //       sort: sortBy,
  //     }).filter(([_, value]) => value !== undefined && value !== null)
  //   );

  const totalCount = ProductData?.pagedInfo?.total || 0;

  return (
    <div className="container ">
      <div className="w-full mt-20">
      <div className="p-6 flex justify-between">
        <div className="w-1/4">
          <FilterSidebar />
        </div>

        <div className="w-3/4">
          <ProductList
            products={ProductData || []}
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductSection;
