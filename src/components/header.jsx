import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Stroke from '../assets/images/stroke.png';
import Logo from '../assets/images/logo.png';
import { CiSearch, CiImageOn } from 'react-icons/ci';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { BsHeart } from 'react-icons/bs';
import { TiUserOutline } from 'react-icons/ti';
import { IoIosArrowDown } from "react-icons/io";
import { TbBorderAll } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog } from "@/components/ui/dialog";
import ImageSearchModal from '@/pages/ImageSearch';

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="header-wrap">
        <div className="container">
          {/* Logo Section */}
          <img src={Logo} alt="Logo" className="LogoImage" />

          {/* Search Bar Section */}
          <div className="searchBarForm">
            <CiSearch className="searchIcon" />
            <Input className="search" type="text" placeholder="Search products, brands and categories..." />

            {/* Clickable Image to Trigger Dialog */}
            <CiImageOn className="imageSearch cursor-pointer" onClick={() => setOpen(true)} />
            
            <img src={Stroke} alt="Open Image Search" className="stroke cursor-pointer" />
            <Button className="searchButton">Search</Button>
          </div>

          {/* Login and Icons Section */}
          <div className="loginDetails">
            <div className="iconsForm">
              <PiShoppingCartSimpleLight className="cart" />
              <BsHeart className="heart" />
              <img src={Stroke} alt="" className="stroke2" />
              <TiUserOutline className="user" />

              <Popover>
                <PopoverTrigger className='flex'>
                  <p>Account</p>
                  <IoIosArrowDown />
                </PopoverTrigger>
                <PopoverContent className="w-48 p-4">
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="w-full">
                      <TiUserOutline className="user" /> My Account
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <BsHeart className="heart" /> Orders
                    </Button>
                    <Button variant="ghost" className="w-full">
                      <TbBorderAll /> Wishlist
                    </Button>
                    <Link to="/SignUp">
                      <Button>Login</Button>
                    </Link>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* Image Search Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <ImageSearchModal />
      </Dialog>
    </>
  );
};

export default Header;
