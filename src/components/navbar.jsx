import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"; // Import shadcn/ui components
import { Button } from "@/components/ui/button"; // Import Button component
import { Menu, X } from "lucide-react"; // Icons for mobile menu toggler
import Shoes from '../assets/images/shoes-icon.png'
import Clothes from '../assets/images/dress-icon.png'
import Jewelries from '../assets/images/jewelries.png'
import Accessories from '../assets/images/accessories-icon.png'
import Beauty from '../assets/images/beauty-icon.png'
import Bags from '../assets/images/bags-icon.png'
import { GiPoloShirt } from "react-icons/gi";
import { TbShoppingBagSearch } from "react-icons/tb";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu
  };

  return (
    <nav className="bg-white shadow-md w-full navBar pt-2 pb-4">
      <div className="container mx-auto px-4 py-3 flex justify-center items-center relative">
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center w-full">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4">
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/Home" className="px-4 py-2 text-black-800 hover:text-gray-900">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Shop with Submenu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                <Link to="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Shop
                    </Link>
                </NavigationMenuTrigger>

                <NavigationMenuContent className="bg-white shadow-lg rounded-lg navigation-submenu">
                  <NavigationMenuLink asChild>
                    <Link to="/Shop" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      All Product
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="navigation-menu-link">
                 
                    <Link to="/Cloth" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <img src={Clothes} alt="" srcset="" className="navigation-menu-link-icon" /> Cloth
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="navigation-menu-link">
                    <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <img src={Bags} alt="" srcset="" className="navigation-menu-link-icon" /> Bags
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="navigation-menu-link">
                    <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <img src={Shoes} alt="" srcset="" className="navigation-menu-link-icon" /> Shoes
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="navigation-menu-link">
                    <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <img src={Jewelries} alt="" srcset="" className="navigation-menu-link-icon" /> Jewelries
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="navigation-menu-link">
                    <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <img src={Accessories} alt="" srcset="" className="navigation-menu-link-icon" />Accessories
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="navigation-menu-link">
                    <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <img src={Beauty} alt="" srcset="" className="navigation-menu-link-icon" /> Beauty
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>

              </NavigationMenuItem>

              {/* About Us */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about" className="px-4 py-2 text-gray-700 hover:text-dark-900">
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Contact Us */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact" className="px-4 py-2 text-gray-700 hover:text-gray-900">
                    Contact Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Blog */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/blog" className="px-4 py-2 text-gray-700 hover:text-gray-900">
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
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>



      {/* Mobile Menu */}



      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <NavigationMenu orientation="vertical">
            <NavigationMenuList className="flex flex-col items-center space-y-2 p-4">
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/src/pages/home.jsx" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Shop with Submenu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-2">
                  <NavigationMenuLink asChild>
                    <Link to="/src/pages/Shop.jsx" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Action
                    </Link>
                  </NavigationMenuLink>
                  {/* <NavigationMenuLink asChild>
                    <Link to="/shop/another-action" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Another Action
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/shop/something-else" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Something Else
                    </Link>
                  </NavigationMenuLink> */}
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About Us */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    About Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Contact Us */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Contact Us
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Blog */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;