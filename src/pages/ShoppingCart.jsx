import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SubMenu from "@/components/SubMenu";
import sampleimage from "@/assets/images/sampleimage.jpg";
import Trash from "../assets/images/trash.png";
import Caution from "../assets/images/info-circle.png";
import ExploreSimilarProducts from "@/components/YouMightLike";
import RecentlyViewed from "@/components/RecentlyViewed";
import { Footer } from "@/components/Footer";
import { StayLoop } from "@/components/StayLoop";
import Checkout from "./CheckOut";
import useCartStore from "@/store/cartStore";
import {
  useDecrementCartItem,
  useIncrementCartItem,
  useRemoveFromCart,
} from "@/hooks/api/mutation/carts/cartOperations";

const ShoppingCart = () => {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "A Cute Ladies Hand And Shoulder Bag",
  //     price: 62000,
  //     status: "In Stock",
  //     image: Bag,
  //     quantity: 1,
  //     colors: ["pink", "red", "blue"],
  //     selectedColor: "red",
  //   },
  //   {
  //     id: 2,
  //     name: "Nike Sport Cap",
  //     price: 15000,
  //     status: "In Stock",
  //     image: Cap,
  //     quantity: 1,
  //     colors: ["pink", "red", "blue"],
  //     selectedColor: "black",
  //   },
  //   {
  //     id: 3,
  //     name: "High Heels Ladies Shoe",
  //     price: 15000,
  //     status: "In Stock",
  //     image: Shoe,
  //     quantity: 1,
  //     colors: ["pink", "red", "blue"],
  //     selectedColor: "black",
  //   },
  //   {
  //     id: 4,
  //     name: "Oversize Crop Top Dhambstons",
  //     price: 15000,
  //     status: "Out Of Stock",
  //     image: Dhambston,
  //     quantity: 1,
  //     colors: ["pink", "red", "blue"],
  //     selectedColor: "black",
  //   },
  //   {
  //     id: 5,
  //     name: "Luxury Women Poedagar Wrist Watch ",
  //     price: 15000,
  //     status: "In Stock",
  //     image: Watch,
  //     quantity: 1,
  //     colors: ["pink", "red", "blue"],
  //     selectedColor: "black",
  //   },
  // ]);

  const [deliveryMethod, setDeliveryMethod] = useState("free");
  const [activeButton, setActiveButton] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const { cartItems } = useCartStore();

  // console.log(cartItems, "cartItems");
  // const { data } = useGetCart();
  // const cartData = data?.data
  const increment = useIncrementCartItem();
  const decrement = useDecrementCartItem();
  const remove = useRemoveFromCart();

  const updateQuantity = (id, delta) => {
    if (delta > 0) increment.mutate(id);
    else decrement.mutate(id);
  };

  // const updateQuantity = (id, amount) => {
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id
  //         ? { ...item, quantity: Math.max(1, item.quantity + amount) }
  //         : item
  //     )
  //   );
  // };

  // const removeItem = (id) => {
  //   setCartItems((prev) => prev.filter((item) => item.id !== id));
  // };
  const removeItem = (id) => {
    remove.mutate(id);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );
  const deliveryFee = deliveryMethod === "free" ? 0 : 2000;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  const today = new Date();
  const deliveryDate = new Date(
    today.setDate(today.getDate() + 5)
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <div
        className={`container px-4 py-8 font-custom transition-all duration-300 ${
          checkoutModalOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
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

        <div className="flex flex-col lg:flex-row gap-10 mt-20">
          {/* Cart Section */}
          <div className="lg:w-[700px] h-full space-y-6 shadow-md bg-white pb-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-4 font-custom2">Cart</h2>
              <p className="font-semibold mt-1 text-[#5B5B5B]">
                {cartItems.length} items
              </p>
            </div>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between bg-[#F2F2F7] gap-4 border p-4 rounded-md shadow-md mx-8"
              >
                <img
                  src={item.productId?.images[0]?.url || sampleimage}
                  alt={item.name}
                  className="w-[130px] h-[130px] object-contain rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = sampleimage;
                  }}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold mb-4">
                      {item.productId?.name}
                    </h3>
                    <p className="font-bold text-black">₦{item?.totalPrice}</p>
                  </div>
                  <div className="flex">
                    <p className="text-gray-500 pr-2 mb-4">
                      ₦{item?.unitPrice}
                    </p>{" "}
                    |
                    <p
                      className={`text-sm font-semibold pl-2 pt-1 ${
                        item.status === "Out Of Stock"
                          ? "text-red-500"
                          : "text-[#00A878]"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      {item?.productId?.name.includes("Wrist") ? (
                        <div className="flex items-center gap-2">
                          <select className="border-[#878787] bg-transparent border-2 rounded-md px-2 py-1 pr-8 w-[100px]">
                            <option>Rose Gold</option>
                            <option>Silver</option>
                            <option>Black</option>
                          </select>
                        </div>
                      ) : null}

                      <div className="flex items-center gap-3 border-2 border-[#878787] rounded-md w-[120px] text-center justify-center">
                        <button
                          onClick={() => {
                            console.log(item.productId?._id);
                            updateQuantity(item.productId?._id, -1);
                          }}
                          className="w-8 h-8 text-lg"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId?._id, 1)}
                          className="w-8 h-8 text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item?.productId?._id)}
                      className="text-[#E94E30] flex gap-2"
                    >
                      <img src={Trash} alt="" className="w-5 h-5" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Section */}
          <div className="lg:w-[460px] lg:h-[663px] space-y-4 border p-4 rounded-md shadow-md bg-[#F2F2F7]">
            <h2 className="text-[20px] font-bold">Delivery</h2>

            <div className="flex gap-[10px] bg-white w-full sm:w-[354px] h-full sm:h-[55px] rounded-lg">
              <button
                onClick={() => setDeliveryMethod("free")}
                className={`font-semibold py-2 pl-4 pr-4 mt-[8px] mb-[10px] ml-[14px] rounded-md shadow-lg transition-all duration-200 ${
                  deliveryMethod === "free"
                    ? "bg-[#FFF4F0] text-[#1B121B]"
                    : "bg-white text-[#5B5B5B]"
                }`}
              >
                Free Shipping
              </button>
              <button
                onClick={() => setDeliveryMethod("express")}
                className={`mt-[8px] mb-[10px] ml-[14px] w-[164px] h-[39px] py-2 pl-4 pr-4 rounded-md shadow-lg transition-all duration-200 ${
                  deliveryMethod === "express"
                    ? "bg-[#FFF4F0] text-[#1B121B]"
                    : "bg-white text-[#5B5B5B]"
                }`}
              >
                Express (₦{total})
              </button>
            </div>

            <p className="mt-4 text-sm font-medium text-[#878787]">
              Delivery date: {deliveryDate}
            </p>
            <p className="text-sm text-[#878787] flex gap-1">
              <img src={Caution} alt="" />
              Free return within 7 days for all eligible items
            </p>

            <hr className="my-4" />

            <h3 className="font-semibold text-[20px] pt-6">Order Summary</h3>
            <div className="text-sm space-y-4">
              <div className="flex justify-between font-semibold text-base text-[#5B5B5B]">
                <span>Sub total</span>
                <span>₦ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium text-sm text-[#5B5B5B]">
                <span className="flex gap-1">
                  Delivery <img src={Caution} alt="" />
                </span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium text-sm text-[#5B5B5B]">
                <span className="flex gap-1">
                  Tax <img src={Caution} alt="" />
                </span>
                <span>+ ₦{tax.toLocaleString()}</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold pb-10">
              <span>Total</span>
              <span> ₦{total.toLocaleString()}</span>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
              <a
                // href="/empty-cart"
                href="/shop"
                onClick={() => setActiveButton("continue")}
                className={`text-center w-full hover:text-white hover:bg-[#cd3c0d] py-[18.5px] rounded-md border shadow-md transition duration-300 ${
                  activeButton === "continue"
                    ? "bg-[#E94E30] text-white border-[#E94E30]"
                    : "text-[#E94E30] border-[#E94E30] bg-white"
                }`}
              >
                Continue Shopping
              </a>

              <button
                onClick={() => {
                  setActiveButton("checkout");
                  setCheckoutModalOpen(true);
                }}
                className={`w-full hover:text-white hover:bg-[#cd3c0d] rounded-md py-[18.5px] border shadow-md transition duration-300 ${
                  activeButton === "checkout"
                    ? "bg-[#E94E30] text-white border-[#E94E30]"
                    : "text-white bg-[#E94E30]"
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        <ExploreSimilarProducts />
      </div>

      <RecentlyViewed />
      <StayLoop />
      <Footer />

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
          <div className="bg-white w-full md:w-1/2 h-full shadow-2xl p-6 overflow-auto relative animate-slideIn">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-lg font-bold"
            >
              &times;
            </button>
            <Checkout cartItems={cartItems}
                      subtotal={subtotal}
                      deliveryFee={deliveryFee}
                      tax={tax}
                      total={total}
                      deliveryMethod={deliveryMethod} />
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
