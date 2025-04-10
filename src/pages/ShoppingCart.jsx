import React, { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import SubMenu from "@/components/SubMenu";
import Trash from '../assets/images/trash.png'
import Bag from '../assets/images/bag1.png'
import Cap from '../assets/images/cap.png'
import Dhambston from '../assets/images/dhambston.png'
import Shoe from '../assets/images/shoe1.png'
import Watch from '../assets/images/watch.png'
import Caution from '../assets/images/info-circle.png'
import ExploreSimilarProducts from "@/components/YouMightLike";
import RecentlyViewed from "@/components/RecentlyViewed";
import { Footer } from "@/components/footer";
import { StayLoop } from "@/components/StayLoop";
// import { Footer } from "@/components/Footer";
// import { StayLoop } from "@/components/StayLoop";


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "A Cute Ladies Hand And Shoulder Bag",
      price: 62000,
      status: "In Stock",
      image: Bag,
      quantity: 1,
      colors: ["pink", "red", "blue"],
      selectedColor: "red",
    },
    {
      id: 2,
      name: "Nike Sport Cap",
      price: 15000,
      status: "In Stock",
      image: Cap,
      quantity: 1,
      colors: ["pink", "red", "blue"],
      selectedColor: "black",
    },
    {
        id: 3,
        name: "High Heels Ladies Shoe",
        price: 15000,
        status: "In Stock",
        image: Shoe,
        quantity: 1,
        colors: ["pink", "red", "blue"],
        selectedColor: "black",
    },
    {
    id: 4,
    name: "Oversize Crop Top Dhambstons",
    price: 15000,
    status: "Out Of Stock",
    image:  Dhambston,
    quantity: 1,
    colors: ["pink", "red", "blue"],
    selectedColor: "black",
    },
    {
    id: 5,
    name: "Luxury Women Poedagar Wrist Watch ",
    price: 15000,
    status: "In Stock",
    image: Watch,
    quantity: 1,
    colors: ["pink", "red", "blue"],
    selectedColor: "black",
    },  
  ]);

  const [deliveryMethod, setDeliveryMethod] = useState("free");

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleColorChange = (id, newColor) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selectedColor: newColor } : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === "free" ? 0 : 2000;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const today = new Date();
  const deliveryDate = new Date(today.setDate(today.getDate() + 5)).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
    <div className="container px-4 py-8 font-custom">
        <div className="breadcrumb">
            <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
        </div>

        <SubMenu category={"shopping-cart"} />

        <div className="">
            <div className="flex flex-col lg:flex-row gap-10 mt-20">
                {/* Cart Section */}
                <div className="lg:w-[700px] space-y-6 shadow-md hover:shadow-lg bg-white pb-6 transition-all duration-200">
                <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-4 font-custom2">Cart</h2>
                <p className="font-semibold mt-1 font-custom text-[#5B5B5B]" >{cartItems.length} items</p>
                </div>

                {cartItems.map((item) => (
                    <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-[#F2F2F7] gap-4 border p-4 rounded-md shadow-sm"
                    >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-[130px] h-[130px] object-cover rounded"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-semibold mb-4 ">{item.name}</h3>
                        <p className="text-black pr-2 font-bold ">₦{item.price.toLocaleString()}</p>
                      </div>
                       <div className="flex ">
                        <p className="text-gray-500 pr-2 mb-4 ">₦ {item.price.toLocaleString()}</p> |
                        <p className="text-sm text-[#00A878] font-semibold pl-2 pt-1 ">{item.status}</p>
                       </div>

                        <div className="flex justify-between">

                        <div className="flex gap-4">
                            {item.name.includes("Wrist") ? (
                              <div className="flex items-center gap-2">
                                <select
                                  className="border-[#878787] bg-transparent border-2 rounded-md px-2 py-1 pr-8 w-[100px] appearance-none"
                                  defaultValue="Rose Gold"
                                >
                                  <option>Rose Gold</option>
                                  <option>Silver</option>
                                  <option>Black</option>
                                </select>
                              </div>
                            ) : null}

                            <div className="flex items-center gap-3 border-2 border-[#878787] rounded-md  w-[120px] text-center justify-center ">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-8 h-8 text-lg"
                                >−</button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-8 h-8  text-lg"
                                >+</button>
                            </div>

                        </div>
                        <button
                                onClick={() => removeItem(item.id)}
                                className="text-[#E94E30] self-end sm:self-auto flex gap-2"
                         ><img src={Trash} alt="" className="w-5 h-5" />Remove</button>
                        </div>

                     </div>
                    </div>
                ))}
                </div>

                {/* Delivery Section */}
                <div className="lg:w-[460px] h-full lg:h-[633px] space-y-4 border p-4 rounded-md shadow-md">
                  <h2 className="text-[20px] font-bold ">Delivery</h2>

                  <div className="flex gap-[10px] bg-white w-full sm:w-[294px] h-full sm:h-[55px] rounded-lg">
                    <button
                      onClick={() => setDeliveryMethod("free")}
                      className={` py-2 mt-[10px] mb-[10px] ml-[14px] rounded-md w-[124px] h-[39px] shadow-md hover:shadow-lg 
                          transition-all duration-200  ${deliveryMethod === "free" ? "bg-[#FFF4F0] text-black" : "bg-white text-[#E94E30]"}`}
                    >
                      Free Shipping
                    </button>
                    <button
                      onClick={() => setDeliveryMethod("express")}
                      className={`mt-[10px] mb-[10px] ml-[14px] w-[124px] h-[39px] py-2 rounded-md  hover:shadow-lg 
                          transition-all duration-200 ${deliveryMethod === "express" ? "bg-[#E94E30] text-white" : "bg-white text-[#E94E30] "}`}
                    >
                      Express (₦4,700)
                    </button>
                  </div>

                  <p className="mt-4 text-sm font-medium text-[#878787] leading-[100%]">Delivery date: {deliveryDate}</p>
                  <p className="text-sm text-[#878787] leading-[100%] flex gap-1"><img src={Caution} alt="" />Free return within 7 days for all eligible items</p>

                  <hr className="my-4" />

                  <h3 className="font-semibold text-[20px] pt-6">Order Summary</h3>
                  <div className="text-sm space-y-4">
                    <div className="flex justify-between font-semibold text-base leading-[100%] text-[#5B5B5B]">
                      <span >Sub total</span>
                      <span>₦ {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium text-sm leading-[100%] text-[#5B5B5B]">
                      <span className="flex gap-1">Delivery <img src={Caution} alt="" /></span>
                      <span>₦{deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium text-sm leading-[100%] text-[#5B5B5B]">
                    <span className="flex gap-1">Tax <img src={Caution} alt="" /></span>
                      <span>+ ₦{tax.toLocaleString()}</span>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="flex justify-between font-semibold pb-10">
                    <span>Total</span>
                    <span> ₦{total.toLocaleString()}</span>
                  </div>


                  <div className="mt-6 flex flex-col items-center gap-4">
                        <a href="/" className="text-center w-full sm:w-[412px] py-2 rounded-md  text-[#E94E30] border border-[#E94E30] hover:text-white hover:bg-[#E94E30] shadow-md transform transition-transform duration-300 hover:scale-100 ">
                            Continue Shopping
                        </a>
                        <button className=" w-full sm:w-[412px] py-2 rounded-md  text-[#E94E30] border border-[#E94E30] hover:text-white hover:bg-[#E94E30] shadow-md transform transition-transform duration-300 hover:scale-100">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
         </div>
        <ExploreSimilarProducts />
    </div>
    <RecentlyViewed />
    <StayLoop />
    <Footer />
    </>
  );
};

export default ShoppingCart;
