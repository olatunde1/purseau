import React, { useState } from 'react';
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

  const menuItems = [
    { name: 'Overview', iconSrc: LayoutDashboard },
    { name: 'Orders', icon: <Package size={20} />, badge: 48 },
    { name: 'Products', iconSrc: Box },
    { name: 'Customers', iconSrc: Users },
    { name: 'Settings', iconSrc: Settings },
    { name: 'Sign Out', iconSrc: LogOut },
  ];

return (
    <div className="w-64 h-screen flex flex-col p-10">
        <img src={Logo} alt="Logo" height="45px" width="120.9px" className="mb-16" />
        <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
                <button
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    className={`flex items-center gap-3 text-left ${
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
                                filter: activeMenu === item.name ? 'brightness(0) saturate(100%) invert(36%) sepia(84%) saturate(747%) hue-rotate(340deg) brightness(91%) contrast(101%)' : 'none',
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


  

function Navbar() {
return (
    <div className="flex justify-between items-center pt-[31px] pb-[21px] px-10 border-b shadow-sm">
        <div>
            <h1 className="text-xl font-semibold">Welcome Admin</h1>
            <span className="text-sm text-gray-600">You have <span className='text-[#E94E30]'> 3 new notifications</span></span>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
            <div className="relative">
                <Search className="absolute left-4 top-3 text-gray-400 " size={18} />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-[500px] pl-10 pr-4 py-2 border rounded-2xl bg-[#E5E5EA]"
                />
            </div>
            <div className="flex items-center space-x-1">
            <Bell className="bg-[#E5E5EA] p-2 rounded-full" width="48px" height="48px" />
            </div>
            <div className="profile flex gap-3">
                <div className="admin-name text-right">
                    <p className='font-semibold text-sm'>Fuad Noah</p>
                    <span className='text-xs italic'>Admin</span>
                </div>
                <img src={ProfilePic} alt="" />
            </div>
        </div>
    </div>
);
}

export default function Admin() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          {/* Main content goes here */}
          {/* <p className="text-gray-600">You have <span className=''>3 new notifications</span></p> */}
        </main>
      </div>
    </div>
  );
}
