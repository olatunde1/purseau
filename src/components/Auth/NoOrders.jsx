import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const NoOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="text-5xl text-gray-400 mb-4">
        <FaShoppingBag />
      </div>
      <h2 className="text-xl font-semibold mb-2">
        You haven’t placed any order yet!
      </h2>
      <p className="text-gray-600 max-w-md mb-6">
        All of your orders will be saved here so that you can access their status at any time.
      </p>
      <Link to="/shop">
        <Button className="bg-[#E94E30] hover:bg-[#d04328] text-white px-6 py-2 rounded-md">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
};

export default NoOrders;
