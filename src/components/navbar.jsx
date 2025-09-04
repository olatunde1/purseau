import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import Shoes from "../assets/images/shoes-icon.png";
import Clothes from "../assets/images/dress-icon.png";
import Jewelries from "../assets/images/jewelries.png";
import Accessories from "../assets/images/accessories-icon.png";
import Beauty from "../assets/images/beauty-icon.png";
import Bags from "../assets/images/bags-icon.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileShop = () => {
    setMobileShopOpen(!mobileShopOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setMobileShopOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md w-full navBar py-2 sticky top-0 z-50" ref={navRef}>
      <div className="container mx-auto px-4 flex justify-center items-center relative">
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center w-full">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4">
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    className="px-4 py-2 text-gray-800 hover:text-gray-900 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Shop with Submenu - Fixed structure */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-gray-800 hover:text-gray-900 data-[state=open]:text-gray-900 flex items-center gap-1">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4 w-[500px] md:w-[200px]">
                  <div className="grid grid-cols-1 gap-3 justify-center text-center">
                    <NavigationMenuLink asChild className="navigation-menu-link">
                      <Link
                        to="/shop?category=cloth"
                        className="flex items-center p-3  text-gray-700 hover:text-white hover:bg-[#E94E30] rounded-md transition-colors duration-200"
                      >
                        <img
                          src={Clothes}
                          alt="Clothing"
                          className="w-6 h-6 mr-2 object-contain"
                        />
                        Cloth
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className="navigation-menu-link">
                      <Link
                        to="/shop?category=bags"
                        className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-[#E94E30] rounded-md transition-colors duration-200"
                      >
                        <img
                          src={Bags}
                          alt="Bags"
                          className="w-6 h-6 mr-2 object-contain"
                        />
                        Bags
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className="navigation-menu-link">
                      <Link
                        to="/shop?category=shoes"
                        className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-[#E94E30] rounded-md transition-colors duration-200"
                      >
                        <img
                          src={Shoes}
                          alt="Shoes"
                          className="w-6 h-6 mr-2 object-contain"
                        />
                        Shoes
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className="navigation-menu-link">
                      <Link
                        to="/shop?category=jewelry"
                        className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-[#E94E30] rounded-md transition-colors duration-200"
                      >
                        <img
                          src={Jewelries}
                          alt="Jewelries"
                          className="w-6 h-6 mr-2 object-contain"
                        />
                        Jewelries
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className="navigation-menu-link">
                      <Link
                        to="/shop?category=accessories"
                        className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-[#E94E30] rounded-md transition-colors duration-200"
                      >
                        <img
                          src={Accessories}
                          alt="Accessories"
                          className="w-6 h-6 mr-2 object-contain"
                        />
                        Accessories
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className="navigation-menu-link">
                      <Link
                        to="/shop?category=beauty"
                        className="flex items-center p-3 text-gray-700 hover:text-white hover:bg-[#E94E30] rounded-md transition-colors duration-200"
                      >
                        <img
                          src={Beauty}
                          alt="Beauty"
                          className="w-6 h-6 mr-2 object-contain"
                        />
                        Beauty
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About Us */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/AboutUs"
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Contact Us */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/Contact"
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    Contact Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Blog */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/blog-page" 
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>



        {/* Mobile Menu Toggler */}
        <Button
          variant="ghost"
          className="md:hidden p-2 absolute right-4"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-3 flex flex-col items-center space-y-3">
          {/* Home */}
          <Link
            to="/"
            className="w-full text-center py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>

          {/* Shop with expandable submenu */}
          <div className="w-full">
            <button
              onClick={toggleMobileShop}
              className="w-full flex justify-center items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <span>Shop</span>
              {mobileShopOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileShopOpen ? 'max-h-96' : 'max-h-0'}`}>
              <div className="pl-6 py-2 grid grid-cols-2 gap-2">
                <Link
                  to="/shop?category=cloth"
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={Clothes} alt="Clothing" className="w-5 h-5 mr-2 object-contain" />
                  Cloth
                </Link>
                <Link
                  to="/shop?category=bags"
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={Bags} alt="Bags" className="w-5 h-5 mr-2 object-contain" />
                  Bags
                </Link>
                <Link
                  to="/shop?category=shoes"
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={Shoes} alt="Shoes" className="w-5 h-5 mr-2 object-contain" />
                  Shoes
                </Link>
                <Link
                  to="/shop?category=jewelry"
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={Jewelries} alt="Jewelries" className="w-5 h-5 mr-2 object-contain" />
                  Jewelries
                </Link>
                <Link
                  to="/shop?category=accessories"
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={Accessories} alt="Accessories" className="w-5 h-5 mr-2 object-contain" />
                  Accessories
                </Link>
                <Link
                  to="/shop?category=beauty"
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img src={Beauty} alt="Beauty" className="w-5 h-5 mr-2 object-contain" />
                  Beauty
                </Link>
              </div>
            </div>
          </div>

          {/* About Us */}
          <Link
            to="/AboutUs"
            className="w-full text-center py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </Link>

          {/* Contact Us */}
          <Link
            to="/Contact"
            className="w-full text-center py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>

          {/* Blog */}
          <Link
            to="/blog-page"
            className="w-full text-center  text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;