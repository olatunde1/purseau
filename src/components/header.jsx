import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Stroke from "../assets/images/stroke.png";
import Logo from "../assets/images/logo.png";
import { CiSearch, CiImageOn } from "react-icons/ci";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { BsHeart } from "react-icons/bs";
import { TiUserOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { TbBorderAll } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog } from "@/components/ui/dialog";
import ImageSearchModal from "@/pages/ImageSearch";
import { useAuthStore } from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import { useGetCart } from "@/hooks/api/mutation/carts/cartOperations";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { currentUser } = useAuthStore();

  const { cartCount, setCartItems } = useCartStore();
  const { data: cartData } = useGetCart();

  const userId = currentUser?._id || "";

  const targetRoute = userId ? "/user-account" : "/SignUp";

  // Update store when cart data changes
  useEffect(() => {
    if (cartData?.data) {
      // Pass the entire data object from the API response
      setCartItems(cartData?.data?.data);
    }
  }, [cartData, setCartItems]);

  return (
    <>
      <div className="header-wrap">
        <div className="container">
          {/* Logo Section */}
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="LogoImage cursor-pointer" />
          </Link>

          {/* Search Bar Section */}
          <div className="searchBarForm">
            <CiSearch className="searchIcon" />
            <Input
              className="search"
              type="text"
              placeholder="Search products, brands and categories..."
            />

            {/* Clickable Image to Trigger Dialog */}
            <CiImageOn
              className="imageSearch cursor-pointer"
              onClick={() => setOpen(true)}
            />

            <img
              src={Stroke}
              alt="Open Image Search"
              className="stroke cursor-pointer"
            />
            <Link to="/search-result">
              <Button className="searchButton">Search</Button>
            </Link>
          </div>

          {/* Login and Icons Section */}
          <div className="loginDetails">
            <div className="iconsForm">
              <Link to="/shopping-cart">
                <div className="relative">
                  <PiShoppingCartSimpleLight className="cart" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#E94E30] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
              <BsHeart className="heart" />
              <img src={Stroke} alt="" className="stroke2" />
              <TiUserOutline className="user" />

              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger className="flex items-center gap-1">
                  <p>Account</p>
                  <IoIosArrowDown
                    className={`account-arrow transition-transform duration-200 ${
                      isPopoverOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-48 p-4 text-left">
                  <div className="flex flex-col space-y-2">
                    <Link
                      to={targetRoute}
                      onClick={() => setIsPopoverOpen(false)}
                    >
                      <Button variant="ghost" className="w-full justify-start">
                        <TiUserOutline className="mr-2" /> My Account
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsPopoverOpen(false)}
                    >
                      <TbBorderAll className="mr-2" /> Orders
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setIsPopoverOpen(false)}
                    >
                      <BsHeart className="mr-2" /> Wishlist
                    </Button>

                    {/* Breakline before Login button */}
                    <hr className="my-2" />

                    {!currentUser && (
                      <Link
                        to="/SignUp"
                        onClick={() => setIsPopoverOpen(false)}
                      >
                        <Button className="w-full mt-4 bg-[#FFF4F0] text-[#E94E30] hover:bg-[#E94E30] hover:text-white">
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* Image Search Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <ImageSearchModal setOpen={setOpen} />
      </Dialog>
    </>
  );
};

export default Header;
