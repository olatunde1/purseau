import { useState } from "react";
import ProductList from "./ProductList";
import FilterSidebar from "./FilterSidebar";
import { Button } from "@/components/ui/button"; 
import { SlidersHorizontal } from "lucide-react"; 
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProductSection = ({ ProductData }) => {
  const [sortBy, setSortBy] = useState(null);
  const totalCount = ProductData?.pagedInfo?.total || 0;

  return (
    <div className="container relative">
      <div className="w-full mt-20 p-6 flex flex-col md:flex-row ">
        {/* ✅ Desktop Sidebar */}
        <div className="hidden md:block w-1/4">
          <FilterSidebar />
        </div>

        {/* ✅ Mobile Filter Button (top, optional) */}
        {/* <div className="md:invisible mb-4 flex justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[60%]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4 overflow-y-auto h-[80vh] pr-2">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div> */}

        {/* ✅ Product List */}
        <div className="w-full md:w-3/4">
          <ProductList
            products={ProductData || []}
            totalCount={totalCount}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      </div>

      {/* ✅ Floating Filter Button (FAB) - Mobile only */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="rounded-full shadow-lg h-14 w-14 flex items-center justify-center bg-orange-500 hover:bg-orange-600">
              <SlidersHorizontal className="w-6 h-6 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[60%]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4 overflow-y-auto h-[80vh] pr-2">
              <FilterSidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ProductSection;
