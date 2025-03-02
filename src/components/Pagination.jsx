import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Pagination = ({ totalPages }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Change page function
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className=" container flex justify-between items-center w-full p-4 mx-auto pagination-page ">
      {/* Pagination Controls - Left Aligned */}
      <div className="flex space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Prev
        </Button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "default" : "outline"}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        {/* Next Button */}
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      {/* Page Info - Right Aligned */}
      <p className="text-sm text-gray-600">
        Showing {currentPage} of {totalPages} pages
      </p>
    </div>
  );
};

export default Pagination;
