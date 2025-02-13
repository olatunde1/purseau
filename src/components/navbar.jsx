import React, { useState } from "react";
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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu
  };

  return (
    <nav className="bg-white shadow-md w-full navBar pt-2 pb-4">
      <div className="container mx-auto px-4 py-3 flex justify-center items-center relative"> {/* Center the NavigationMenu */}
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center w-full"> {/* Ensure full width and center content */}
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4"> {/* Center items horizontally */}
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-4 py-2 text-black-800 hover:text-gray-900">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Shop with Submenu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-2">
                  <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Action
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Another Action
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Something Else
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About Us */}
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-4 py-2 text-gray-700 hover:text-dark-900">
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Contact Us */}
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Blog */}
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-4 py-2 text-gray-700 hover:text-gray-900">
                  Blog
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
            <NavigationMenuList className="flex flex-col items-center space-y-2 p-4"> {/* Center items vertically */}
              {/* Home */}
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Shop with Submenu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-2">
                  <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Action
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Another Action
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Something Else
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About Us */}
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Contact Us */}
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Blog */}
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Blog
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