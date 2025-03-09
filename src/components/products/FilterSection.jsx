import { ChevronDown, ChevronUp } from "lucide-react";

const FilterSection = ({ title, isOpen, toggleOpen, children }) => {
  return (
    <div className="mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <h2 className="font-bold">{title}</h2>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default FilterSection;
