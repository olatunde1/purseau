import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, Bell } from 'lucide-react';

import Logo from "../assets/images/logo.png";
import ProfilePic from "../assets/images/admin-profile-picture.png";
import LayoutDashboard from "../assets/images/overview.png";
import Box from "../assets/images/product.png";
import Users from "../assets/images/customers.png";
import Settings from "../assets/images/settings.png";
import LogOut from "../assets/images/logout.png";

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState('Overview');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Overview', iconSrc: LayoutDashboard, route: '/admin/overview' },
    { name: 'Orders', icon: <Package size={20} />, badge: 48, route: '/admin/orders-history' },
    { name: 'Products', iconSrc: Box, route: '/admin/products' },
    { name: 'Customers', iconSrc: Users, route: '/admin/customers' },
    { name: 'Settings', iconSrc: Settings, route: '/admin/settings' },
    { name: 'Sign Out', iconSrc: LogOut, route: '/logout' },
  ];

  return (
    <div className="w-[248px] h-screen flex flex-col p-10">
      <img src={Logo} alt="Logo" height="45px" width="120.9px" className="mb-16" />
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActiveMenu(item.name);
              navigate(item.route);
            }}
            className={`flex items-center gap-3 pb-5 text-left ${
              activeMenu === item.name ? 'text-[#E94E30] font-bold' : 'text-[#878787]'
            } hover:text-[#E94E30] hover:font-bold ${
              item.name === 'Sign Out' ? 'pt-[515px]' : ''
            }`}
          >
            {item.iconSrc ? (
              <img
                src={item.iconSrc}
                alt={`${item.name} icon`}
                className={`w-5 h-5 ${
                  activeMenu === item.name ? 'filter hue-rotate-[340deg] contrast-100' : 'filter'
                }`}
                style={{
                  filter: activeMenu === item.name
                    ? 'brightness(0) saturate(100%) invert(36%) sepia(84%) saturate(747%) hue-rotate(340deg) brightness(91%) contrast(101%)'
                    : 'none',
                }}
              />
            ) : (
              item.icon
            )}
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto font-semibold text-sm text-[#E94E30] bg-[#FFE4DA] px-2 py-1 rounded-xl">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
