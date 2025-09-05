import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCheckout } from "@/hooks/api/mutation/useCheckout.js";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
// import { Footer } from "@/components/Footer";
// import { StayLoop } from "@/components/StayLoop";

const Checkout = ({
  subtotal,
  deliveryFee,
  tax,
  total,
  deliveryMethod,
  //   closeModal\\,
}) => {
  // const [deliveryOption, setDeliveryOption] = useState("address");
  const [deliveryOption, setDeliveryOption] = useState(
    deliveryMethod === "express" ? "express" : "address"
  );
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
  });

  const { currentUser } = useAuthStore();

  const userId = currentUser?._id || "";

  const { mutate: checkout, isPending } = useCheckout();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const subtotal = 150000;
  // const deliveryFee = 2000;
  // const tax = Math.round(subtotal * 0.05);
  // const total = subtotal + deliveryFee + tax;

  const countryCityMap = {
    Nigeria: ["Lagos", "Abuja", "Kano", "Port Harcourt"],
    Ghana: ["Accra", "Kumasi", "Takoradi", "Tamale"],
    Kenya: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
    "South Africa": ["Cape Town", "Johannesburg", "Durban", "Pretoria"],
    Liberia: ["Monrovia", "Gbarnga", "Kakata", "Harper"],
    Cameroon: ["Yaoundé", "Douala", "Bamenda", "Buea"],
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSubmit = () => {
    if (!userId) {
      window.location.href = "/SignUp";
      return;
    }

    const payload = {
      deliveryType: deliveryOption === "pickup" ? "Pickup" : "Express",
      deliveryFee: deliveryOption === "pickup" ? 0 : 2000,
      tax: tax,
      deliveryInfo: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        city: selectedCity,
        region: selectedCountry,
      },
      deliveryOptions: deliveryOption === "pickup" ? "pickup" : "shipping",
      orderAmount: total, // from your subtotal+delivery+tax
      paymentMethod: paymentMethod === "card" ? "Credit Card" : "Bank Transfer",
    };

    checkout(payload, {
      onSuccess: (res) => {
        toast.success(res?.data?.message || "Redirecting to payment...");
        window.location.href = res.data?.data?.paymentLink;
        // closeModal();
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Checkout failed");
      },
    });
  };

  return (
    <div className="checkout-container mx-auto w-full max-w-[670px] px-4 sm:px-6 lg:px-8 py-10 font-custom">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/shopping-cart">Shopping Cart</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* All Sections in a Single Column */}
      <div className="checkout-content flex flex-col gap-8 mt-10">
        {/* Delivery Options */}
        <div className="checkout-section border p-6 rounded-md shadow-sm bg-white w-full">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-bold">Delivery Options</h2>
            <button className="text-gray-500">✕</button>
          </div>
          <div className="checkout-section border p-6 rounded-md shadow-sm bg-white w-full">
            <div className="mt-4 space-y-4">
              {/* Ship to Address */}
              <label
                className={`flex items-center gap-2 py-[21.5px] px-[24px] border-[2px] rounded-tr-xl rounded-tl-xl cursor-pointer
                    ${
                      deliveryOption === "address"
                        ? "bg-[#FFE4DA] border-[#E94E30]"
                        : "bg-white border-transparent "
                    }`}
              >
                <input
                  type="radio"
                  value="address"
                  checked={deliveryOption === "address"}
                  onChange={() => setDeliveryOption("address")}
                  className="accent-[#E94E30]"
                />
                Ship to Address
              </label>

              {/* Pickup in Store */}
              <label
                className={`flex items-center gap-2 py-[21.5px] px-[24px] border-[2px] rounded-br-xl rounded-bl-xl cursor-pointer
                  ${
                    deliveryOption === "pickup"
                      ? "bg-[#FFE4DA] border-[#E94E30]"
                      : "bg-white border-transparent "
                  }`}
              >
                <input
                  type="radio"
                  value="pickup"
                  checked={deliveryOption === "pickup"}
                  onChange={() => setDeliveryOption("pickup")}
                  className="accent-[#E94E30]"
                />
                Pickup in Store
              </label>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        {/* Delivery Information */}
        <div className="checkout-section border p-6 rounded-md shadow-sm bg-white w-full mt-[60px]">
          <h2 className="text-xl font-bold mb-10">Delivery Information</h2>
          <div className="grid gap-4">
            <div>
              <label className="block text-base font-bold mb-4 ">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Input your full name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full bg-[#F2F2F7] px-6 py-[20px]"
              />
            </div>

            <div>
              <label className="block text-base font-bold mb-4">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@purseau.com"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md p-2 w-full  bg-[#F2F2F7] px-6 py-[20px]"
              />
            </div>

            <div>
              <label className="block text-base font-bold mb-4">
                Phone Number
              </label>
              <div className="flex gap-6">
                <select className="border rounded-md p-2 w-1/3">
                  <option value="+234">+234</option>
                  <option value="+233">+233</option>
                  <option value="+254">+254</option>
                  <option value="+27">+27</option>
                  <option value="+231">+231</option>
                  <option value="+237">+237</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded-md p-2 w-2/3  bg-[#F2F2F7] px-6 py-[20px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-bold mb-4">
                Delivery Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="123 Street, Area"
                value={formData.address}
                onChange={handleChange}
                className="border rounded-md p-2 w-full  bg-[#F2F2F7] px-6 py-[20px]"
              />
            </div>

            <div>
              <label className="block text-base font-bold mb-4">
                Region & City
              </label>
              <div className="flex flex-col md:flex-row gap-6">
                <select
                  className="border rounded-md p-2 w-full md:w-1/2 bg-[#F2F2F7] hover:bg[#E94E30] px-6 py-[20px]"
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setSelectedCity("");
                  }}
                >
                  <option value="">Select Country</option>
                  {Object.keys(countryCityMap).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded-md p-2 w-full md:w-1/2 bg-[#F2F2F7] px-6 py-[20px]"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedCountry}
                >
                  <option value="">
                    {selectedCountry ? "Select City" : "Select a Country First"}
                  </option>
                  {countryCityMap[selectedCountry]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="checkout-section border p-6 rounded-md shadow-sm bg-white w-full">
          <h2 className="text-xl font-bold mb-10 mt-[60px]">Payment Method</h2>
          <div>
            {/* Pay with Cards */}
            <label
              className={`flex items-center gap-2 py-[21.5px] px-[24px] border-[2px] rounded-tr-xl rounded-tl-xl cursor-pointer
              ${
                paymentMethod === "card"
                  ? "bg-[#FFE4DA] border-[#E94E30]"
                  : "bg-white border-transparent "
              }`}
            >
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="accent-[#E94E30]"
              />
              Pay with Cards
            </label>

            {/* Bank Transfer */}
            <label
              className={`flex items-center gap-2 py-[21.5px] px-[24px] border-[2px] rounded-br-xl rounded-bl-xl cursor-pointer
              ${
                paymentMethod === "bank"
                  ? "bg-[#FFE4DA] border-[#E94E30]"
                  : "bg-white border-transparent "
              }`}
            >
              <input
                type="radio"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
                className="accent-[#E94E30]"
              />
              Bank Transfer
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="checkout-section border px-6 py-6 mt-[60px] rounded-md shadow-sm bg-[#FFE4DA] w-full">
          <h2 className="text-xl font-bold mb-6 ">Order Summary</h2>
          <div className="space-y-4 text-sm text-[#5B5B5B] font-medium">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₦{tax.toLocaleString()}</span>
            </div>
            <hr className="border-t-2 border-dashed border-[#FFD6CF]" />
            <div className="flex justify-between font-bold text-black text-base">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full mt-[60px] py-[18px] text-white bg-[#E94E30] hover:bg-[#E94E30] rounded-xl font-semibold shadow-sm"
        >
          {isPending ? "Processing..." : "Proceed to payment"}
        </button>
      </div>

      {/* <StayLoop />
      <Footer /> */}
    </div>
  );
};

export default Checkout;
