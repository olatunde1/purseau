// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Package, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

// import Logo from "../assets/images/logo.png";
// import LayoutDashboard from "../assets/images/overview.png";
// import Box from "../assets/images/product.png";
// import Users from "../assets/images/customers.png";
// import Settings from "../assets/images/settings.png";
// import LogOut from "../assets/images/logout.png";

// function Sidebar() {
//   const [activeMenu, setActiveMenu] = useState('Overview');
//   const [productsMenuOpen, setProductsMenuOpen] = useState(false);
//   const [isOpen, setIsOpen] = useState(false); // for mobile toggle
//   const navigate = useNavigate();

//   const menuItems = [
//     { name: 'Overview', iconSrc: LayoutDashboard, route: '/admin/overview' },
//     { name: 'Orders', icon: <Package size={20} />, badge: 48, route: '/admin/orders-history' },
//     {
//       name: 'Products',
//       iconSrc: Box,
//       submenu: [
//         { name: 'All Products', route: '/admin/product-list' },
//         { name: 'Create Product', route: '/admin/create-product' },
//         { name: 'Archived Products', route: '/admin/archived-product' },
//       ],
//     },
//     { name: 'Customers', iconSrc: Users, route: '/admin/customer' },
//     { name: 'Settings', iconSrc: Settings, route: '/admin/settings' },
//   ];

//   return (
//     <>
//       {/* Hamburger button for mobile */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="md:hidden p-3 text-gray-700 fixed top-4 left-4 z-50 bg-white rounded-md shadow"
//       >
//         <Menu size={22} />
//       </button>

//       {/* Sidebar overlay (mobile) */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 md:hidden"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar container */}
//       <aside
//         className={`fixed md:static top-0 left-0 z-50 h-full w-[248px] bg-white p-10 flex flex-col border-r border-gray-100 transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
//       >
//         {/* Close button (mobile only) */}
//         <button
//           onClick={() => setIsOpen(false)}
//           className="absolute top-4 right-4 md:hidden text-gray-600"
//         >
//           <X size={22} />
//         </button>

//         {/* Logo */}
//         <img src={Logo} alt="Logo" height="45px" width="120.9px" className="mb-16" />

//         {/* Menu items */}
//         <nav className="flex flex-col space-y-4 flex-grow">
//           {menuItems.map((item) => (
//             <div key={item.name} className="flex flex-col">
//               <button
//                 onClick={() => {
//                   if (item.name === 'Products') {
//                     setProductsMenuOpen(!productsMenuOpen);
//                     setActiveMenu(item.name);
//                   } else {
//                     setActiveMenu(item.name);
//                     navigate(item.route);
//                     setIsOpen(false); // close sidebar on mobile
//                   }
//                 }}
//                 className={`flex items-center gap-3 pb-5 text-left ${
//                   (activeMenu === item.name ||
//                     (item.name === 'Products' && activeMenu.includes('Product')))
//                     ? 'text-[#E94E30] font-bold'
//                     : 'text-[#878787]'
//                 } hover:text-[#E94E30] hover:font-bold`}
//               >
//                 {item.iconSrc ? (
//                   <img
//                     src={item.iconSrc}
//                     alt={`${item.name} icon`}
//                     className={`w-5 h-5 ${
//                       activeMenu === item.name ||
//                       (item.name === 'Products' && activeMenu.includes('Product'))
//                         ? 'brightness-0 invert-[0.35] sepia-[1] hue-rotate-[340deg]'
//                         : ''
//                     }`}
//                   />
//                 ) : (
//                   item.icon
//                 )}
//                 <span>{item.name}</span>

//                 {item.name === 'Products' && (
//                   <span className="ml-2">
//                     {productsMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                   </span>
//                 )}

//                 {item.badge && (
//                   <span className="ml-auto font-semibold text-sm text-[#E94E30] bg-[#FFE4DA] px-2 py-1 rounded-xl">
//                     {item.badge}
//                   </span>
//                 )}
//               </button>

//               {/* Submenu */}
//               {item.name === 'Products' && productsMenuOpen && (
//                 <div className="ml-8 mt-2 flex flex-col space-y-2">
//                   {item.submenu.map((subItem) => (
//                     <button
//                       key={subItem.name}
//                       onClick={() => {
//                         setActiveMenu(subItem.name);
//                         navigate(subItem.route);
//                         setIsOpen(false); // close on mobile
//                       }}
//                       className={`text-left px-3 py-2 rounded-md ${
//                         activeMenu === subItem.name
//                           ? 'bg-[#FFF4F0] text-[#E94E30] font-semibold'
//                           : 'text-[#878787] hover:text-[#E94E30]'
//                       }`}
//                     >
//                       {subItem.name}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>

//         {/* Sign Out */}
//         <button
//           onClick={() => navigate('/logout')}
//           className="flex items-center gap-3 text-[#878787] hover:text-[#E94E30] hover:font-bold"
//         >
//           <img src={LogOut} alt="Log out" className="w-5 h-5" />
//           <span>Sign Out</span>
//         </button>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;
