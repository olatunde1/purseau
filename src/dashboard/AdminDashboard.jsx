import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Package,
} from "lucide-react";

import Logo from "../assets/images/logo.png";
import ProfilePic from "../assets/images/admin-profile-picture.png";
import LayoutDashboard from "../assets/images/overview.png";
import Box from "../assets/images/product.png";
import Users from "../assets/images/customers.png";
import Settings from "../assets/images/settings.png";
import LogOut from "../assets/images/logout.png";
import { useAdminAuthStore } from "@/store/adminAuthStore";
import { toast } from "sonner";

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { logout } = useAdminAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    toast.success("Logged out Admin successfully");
  };

  const menuItems = [
    { name: "Overview", iconSrc: LayoutDashboard, route: "/admin/overview" },
    {
      name: "Orders",
      icon: <Package size={18} />,
      badge: 48,
      route: "/admin/orders-history",
    },
    {
      name: "Products",
      iconSrc: Box,
      submenu: [
        { name: "All Products", route: "/admin/product-list" },
        { name: "Create Product", route: "/admin/create-product" },
        { name: "Archived Products", route: "/admin/archived-product" },
      ],
    },
    { name: "Customers", iconSrc: Users, route: "/admin/customer" },
    { name: "Settings", iconSrc: Settings, route: "/admin/settings" },
    { name: "Sign Out", iconSrc: LogOut, route: "/logout" },
  ];

  return (
    <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-[248px] bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo + Close button */}
        <div className="flex justify-between items-center px-6 pt-8 md:pt-10">
          <img src={Logo} alt="Logo" className="w-[120px]" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-[#E94E30] md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex flex-col space-y-4 px-6 py-10 overflow-y-auto h-[calc(100%-80px)]">
          {menuItems.map((item) => (
            <div key={item.name} className="flex flex-col">
              <button
                onClick={() => {
                  if (item.name === "Products") {
                    setProductsMenuOpen(!productsMenuOpen);
                    setActiveMenu(item.name);
                  } else if (item.name === "Sign Out") {
                    handleLogout();
                  } else {
                    setActiveMenu(item.name);
                    navigate(item.route);
                    setSidebarOpen(false);
                  }
                }}
                className={`flex items-center gap-3 text-left transition-all duration-200 ${
                  activeMenu === item.name
                    ? "text-[#E94E30] font-semibold"
                    : "text-[#878787]"
                } hover:text-[#E94E30]`}
              >
                {item.iconSrc ? (
                  <img
                    src={item.iconSrc}
                    alt={`${item.name} icon`}
                    className="w-5 h-5"
                    style={{
                      filter:
                        activeMenu === item.name
                          ? "brightness(0) saturate(100%) invert(36%) sepia(84%) saturate(747%) hue-rotate(340deg) brightness(91%) contrast(101%)"
                          : "none",
                    }}
                  />
                ) : (
                  item.icon
                )}
                <span>{item.name}</span>

                {item.name === "Products" && (
                  <span className="ml-auto">
                    {productsMenuOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronUp size={16} />
                    )}
                  </span>
                )}
                {item.badge && (
                  <span className="ml-auto text-xs bg-[#FFE4DA] text-[#E94E30] px-2 py-[2px] rounded-lg font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>

              {item.name === "Products" && productsMenuOpen && item.submenu && (
                <div className="ml-8 mt-2 flex flex-col space-y-2">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => {
                        setActiveMenu(subItem.name);
                        navigate(subItem.route);
                        setSidebarOpen(false);
                      }}
                      className={`text-left px-3 py-1 rounded-md ${
                        activeMenu === subItem.name
                          ? "bg-[#FFF4F0] text-[#E94E30] font-semibold"
                          : "text-[#878787] hover:text-[#E94E30]"
                      }`}
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ===== NAVBAR ===== */}
        <header className="flex justify-between items-center bg-white border-b shadow-sm px-4 sm:px-6 py-4 sticky top-0 z-30">
          {/* Left: Hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 md:hidden"
            >
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">
                Welcome Admin
              </h1>
              <span className="text-sm text-gray-600">
                You have{" "}
                <span className="text-[#E94E30]">3 new notifications</span>
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search (hidden on mobile) */}
            <div className="relative hidden md:block">
              <Search
                className="absolute left-4 top-3 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-[300px] lg:w-[450px] pl-10 pr-4 py-2 border rounded-2xl bg-[#E5E5EA]"
              />
            </div>

            {/* Bell Icon */}
            <Bell
              className="bg-[#E5E5EA] p-2 rounded-full cursor-pointer"
              width="40"
              height="40"
            />

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-sm">Fuad Noah</p>
                <span className="text-xs italic text-gray-600">Admin</span>
              </div>
              <img
                src={ProfilePic}
                alt="Profile"
                className="w-9 h-9 rounded-full border border-gray-300"
              />
            </div>
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 bg-[#FAFAFA]">
          <Outlet /> {/* Render nested routes here */}
        </main>
      </div>

      {/* Overlay (for mobile sidebar) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
