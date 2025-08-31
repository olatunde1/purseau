import { Trash2, Ban, ArrowLeft ,  } from "lucide-react";
import OrderHistory from "../orderHistory/OrderHistory";


const CustomerInfoPage = () => {
  // const [search, ] = useState("");
  // const [sortBy, ] = useState(null);
  // const [filterStatus, ] = useState("");

  // const orders = [
  //   {
  //     id: "PUR-15627927",
  //     customer: "Noah Fuad",
  //     product: "Prada Mini Bag",
  //     date: "Oct 28, 2020",
  //     items: "4 Items",
  //     status: "Ongoing",
  //     amount: "$8.99",
  //   },
  //   {
  //     id: "PUR-15627928",
  //     customer: "Noah Fuad",
  //     product: "Gucci, 1995 Horsebit",
  //     date: "Oct 23, 2020",
  //     items: "24 Items",
  //     status: "Ongoing",
  //     amount: "$17.84",
  //   },
  //   {
  //     id: "PUR-15627929",
  //     customer: "Noah Fuad",
  //     product: "Chanel, Boy Flap",
  //     date: "Oct 30, 2020",
  //     items: "13 Items",
  //     status: "Delivered",
  //     amount: "$11.70",
  //   },
  //   {
  //     id: "PUR-15627930",
  //     customer: "Noah Fuad",
  //     product: "Hermès Birkin 25",
  //     date: "Nov 01, 2020",
  //     items: "7 Items",
  //     status: "Cancelled",
  //     amount: "$5.22",
  //   },
  //   {
  //     id: "PUR-15627931",
  //     customer: "Noah Fuad",
  //     product: "Gucci Mules",
  //     date: "Oct 16, 2020",
  //     items: "12 Items",
  //     status: "Returned",
  //     amount: "$14.81",
  //   },
  //   {
  //     id: "PUR-15627932",
  //     customer: "Noah Fuad",
  //     product: "Jimmy Choo Pumps",
  //     date: "Oct 27, 2020",
  //     items: "2 Items",
  //     status: "Delivered",
  //     amount: "$14.81",
  //   },
  //   {
  //     id: "PUR-15627933",
  //     customer: "Noah Fuad",
  //     product: "Valentino Studded Shoe",
  //     date: "Oct 29, 2020",
  //     items: "1 Item",
  //     status: "Delivered",
  //     amount: "$6.48",
  //   },
  // ];

  // Filtering + Sorting
  // const filteredOrders = orders
  //   .filter(
  //     (o) =>
  //       (o.product.toLowerCase().includes(search.toLowerCase()) ||
  //         o.id.toLowerCase().includes(search.toLowerCase())) &&
  //       (filterStatus === "" || o.status === filterStatus)
  //   )
  //   .sort((a, b) => {
  //     if (!sortBy) return 0;
  //     if (sortBy === "date") {
  //       return new Date(b.date) - new Date(a.date);
  //     }
  //     if (sortBy === "amount") {
  //       return parseFloat(b.amount.replace("$", "")) - parseFloat(a.amount.replace("$", ""));
  //     }
  //     return 0;
  //   });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
  {/* Back Button + Title */}
  <div className="flex items-center gap-3">
    <button
      onClick={() => window.history.back()} // go back in browser history
      className="p-2 hover:bg-gray-100 rounded-full transition"
    >
      <ArrowLeft size={20} className="text-gray-700" />
    </button>
    <h1 className="text-2xl font-bold">Customer Information</h1>
  </div>

  {/* Action Buttons */}
  <div className="flex gap-3">
    <button className="flex items-center gap-1 bg-white border-2 border-[#878787] text-[#1B121B] hover:text-black px-6 py-2 rounded-lg hover:bg-gray-200 hover:border-transparent transition">
      <Trash2 size={16} className="mr-2" /> Delete User Profile
    </button>
    <button className="flex items-center gap-1 bg-[#E94E30] text-white px-6 py-2 rounded-lg hover:bg-[#E94E30] transition">
      <Ban size={16} /> Block User
    </button>
  </div>
</div>

 
     {/* Personal Information */}
<div className="bg-white shadow rounded-xl p-4 mb-8 pt-6 pb-6">
  <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

  {/* First + Last Name */}
  <div className="grid md:grid-cols-3 gap-6 mb-8">
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">First Name</label>
      <p className="font-medium text-[#5B5B5B] text-[14px]">Noah</p>
    </div>
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Last Name</label>
      <p className="font-medium text-[#5B5B5B] text-[14px]">Fuad</p>
    </div>
  </div>

  {/* Email + Phone + Additional Phone */}
  <div className="grid md:grid-cols-3 gap-6 mb-8 ">
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Email</label>
      <p className="font-medium text-[#5B5B5B] text-[14px]">dolores.chambers@example.com</p>
    </div>
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Phone Number</label>
      <p className="font-medium text-[#5B5B5B] text-[14px]">+234 814 892 3767</p>
    </div>
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Additional Phone</label>
      <p className="font-medium text-[#5B5B5B] text-[14px]">(207) 555-0119</p>
    </div>
  </div>

  {/* Delivery Address + Region + City */}
  <div className="grid md:grid-cols-3 gap-6 ">
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Delivery Address</label>
      <p className="font-medium text-[#5B5B5B] text-[14px]">4517 Washington Ave. Manchester, Kentucky 39495</p>
    </div>
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Region</label>
      <p className="font-medium text-[#5B5B5B] text-[14px]">South Africa</p>
    </div>
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">City</label>
      <p className="font-medium text-[#5B5B5B] text-[14px]">Cape Town</p>
    </div>
  </div>
</div>


    {/* Orders Information */}
<div className="bg-white shadow rounded-xl p-4 mb-8 py-6">
  <h2 className="text-lg font-semibold mb-4">Orders Information</h2>

  <div className="grid md:grid-cols-3 gap-6">
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Status</label>
      <p className=" text-[12px] text-[#00A878] bg-[#DBEEE9] w-[72px] text-center rounded-sm py-[6px]">Delivered</p>
    </div>
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Last Purchased Date</label>
      <p className="font-semibold text-sm text-[#5B5B5B]">March 25, 2025</p>
    </div>
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Orders</label>
      <p className="font-semibold text-sm text-[#5B5B5B]">34</p>
    </div>
    <div>
      <label className="block text-[18px] text-[#1B121B] font-semibold mb-1">Total Amount Spent</label>
      <p className="font-semibold text-sm text-[#5B5B5B]">$753.78</p>
    </div>
  </div>
</div>


      {/* Order History */}
      {/* <div className="bg-white shadow rounded-xl p-4 overflow-x-auto"> */}
        {/* Order History */}
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        <OrderHistory />

        {/* Pagination */}
        {/* <div className="flex justify-between items-center mt-4 text-sm">
          <p>Showing {filteredOrders.length} of {orders.length}</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg">Prev</button>
            <button className="px-3 py-1 border rounded-lg bg-gray-200">1</button>
            <button className="px-3 py-1 border rounded-lg">2</button>
            <button className="px-3 py-1 border rounded-lg">3</button>
            <button className="px-3 py-1 border rounded-lg">Next</button>
          </div>
        </div> */}
        {/* <div className="sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold">Order History</h2>
          <div className="flex justify-between gap-2 mt-4 sm:mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by product by name or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-[1.5px] rounded-lg border-[#878787] pl-8 pr-3 py-2 text-sm w-full md:w-[424px]"
              />
              <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
            </div>
            <div className="gap-3 flex">
                 {/* Filter Dropdown */}
            {/* <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm bg-gray-100"
            >
              <option value=""> Filter</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Returned">Returned</option>
            </select> */}

            {/* Sort Dropdown */}
            {/* <select
              value={sortBy || ""}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm bg-gray-100"
            >
              <option value="">Sort By</option>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            </div>
         
          </div> */}
        {/* </div> */} 

        {/* Table */}
        {/* <table className="w-full text-sm">
          <thead className="bg-[#FFF4F0] text-[#878787]">
            <tr>
              <th className="text-left  py-5 px-4">Order ID</th>
              <th className="text-left  py-5">Customer</th>
              <th className="text-left  py-5">Product</th>
              <th className="text-left  py-5">Date</th>
              <th className="text-left  py-5">Items</th>
              <th className="text-left  py-5">Status</th>
              <th className="text-left  py-5">Amount</th>
            </tr>
          </thead>
     <tbody>
  {filteredOrders.map((order, idx) => {
    const rowBg = idx % 2 === 0 ? "bg-white" : "bg-[#F8F8F8]";
    return (
      <tr key={idx} className={`border-t ${rowBg}`}>
        <td className="py-5 px-4">{order.id}</td>
        <td className="py-5">{order.customer}</td>
        <td className="py-5">{order.product}</td>
        <td className="py-5">{order.date}</td>
        <td className="py-5">{order.items}</td>
        <td
          className={`p-2 font-medium ${
            order.status === "Delivered"
              ? "text-green-600"
              : order.status === "Ongoing"
              ? "text-blue-600"
              : order.status === "Cancelled"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {order.status}
        </td>
        <td className="p-2">{order.amount}</td>
      </tr>
    );
  })}
</tbody>

        </table> */}

        {/* Pagination */}
        {/* <div className="flex justify-between items-center mt-4 text-sm">
          <p>Showing {filteredOrders.length} of {orders.length}</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg">Prev</button>
            <button className="px-3 py-1 border rounded-lg bg-gray-200">1</button>
            <button className="px-3 py-1 border rounded-lg">2</button>
            <button className="px-3 py-1 border rounded-lg">3</button>
            <button className="px-3 py-1 border rounded-lg">Next</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CustomerInfoPage;
