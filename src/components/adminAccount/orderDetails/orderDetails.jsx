import React from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { FaRegCircle, FaDotCircle } from 'react-icons/fa'; // Add this import at the top




export default function OrderDetails() {
  const location = useLocation();
  
  const order = location.state?.order || {
    customerName: 'Cameron Williamson',
    email: 'kenzi.lawson@example.com',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    phone: '(+33) 6 55 58 55 63',
  };

  const products = [
    {
      name: 'Valentino Studded Shoe',
      price: 234.78,
      quantity: 24,
      total: 5616,
      id: 'DS-PS01ID92',
    },
    {
      name: 'Gucci, 1995 Horsebit',
      price: 9.78,
      quantity: 1,
      total: 9.78,
      id: 'DS-PS01ID92',
    },
    {
      name: 'Prada Mini Bag',
      price: 234.78,
      quantity: 2,
      total: 5616,
      id: 'DS-PS01ID92',
    },
    {
      name: 'Jimmy Choo Pumps',
      price: 234.78,
      quantity: 1,
      total: 5616,
      id: 'DS-PS01ID92',
    },
    {
      name: 'Valentino Studded Shoe',
      price: 234.78,
      quantity: 7,
      total: 5616,
      id: 'DS-PS01ID92',
    },
  ];

  const [orderStatus, setOrderStatus] = React.useState('In Package');

  const trackSteps = [
    {
      label: 'Order Placed',
      date: '07 Feb 2025',
      time: '04:27 pm',
      expected: false,
    },
    {
      label: 'Order Confirmed',
      date: '07 Feb 2025',
      time: '04:27 pm',
      expected: false,
    },
    {
      label: 'In Package',
      date: '07 Feb 2025',
      expected: true,
    },
    {
      label: 'On the Way',
      date: '10, 13 Feb 2025',
      expected: true,
    },
    {
      label: 'Delivered',
      date: '14 Feb 2025',
      expected: true,
    },
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Link to="/admin/orders-history" className="flex items-center mb-4">
        <h2 className="text-2xl flex font-bold mb-4 gap-4"><IoChevronBackSharp className="w-5 h-5 mt-2 font-bold" />Order Details</h2>
      </Link>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel */}
        <div className="flex-1 bg-white shadow-md rounded-xl p-4">
          <div className="combined">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <div className="text-sm">Order ID: <strong>PUR-15627927</strong></div>
              <button className="bg-[#E94E30] text-white py-2 px-6 rounded-lg text-sm">Download Invoice</button>
         </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-md overflow-hidden">
                <thead className="bg-[#FFF4F0] text-left">
                  <tr>
                    <th className="py-[21.5px] px-3 text-[#878787]">Product</th>
                    <th className="py-[21.5px] px-3 text-[#878787]">Price</th>
                    <th className="py-[21.5px] px-3 text-[#878787]">Quantity</th>
                    <th className="py-[21.5px] px-3 text-[#878787]">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F4F4F6]'}>
                      <td className="py-[21.5px] px-3 whitespace-nowrap">{p.name}</td>
                      <td className="py-[21.5px] px-3">${p.price.toFixed(2)}</td>
                      <td className="py-[21.5px] px-3">{p.quantity}</td>
                      <td className="py-[21.5px] px-3">${p.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="mt-6 grid sm:grid-cols-1 gap-6">
            {/* Delivery Information */}
            <div className=" p-4 rounded">
              <h4 className="font-semibold text-xl mb-4">Delivery Information</h4>
              <div className="space-y-4 text-[#5B5B5B]">
                <div className="flex justify-normal">
                  <span className=" w-[180px]">Customer Name:</span>
                  <span>{order.customerName}</span>
                </div>
                <div className="flex justify-normal">
                  <span className=" w-[180px]">Phone Number:</span>
                  <span>{order.phone}</span>
                </div>
                <div className="flex justify-normal">
                  <span className=" w-[180px]">Email:</span>
                  <span>{order.email}</span>
                </div>
                <div className="flex justify-normal">
                  <span className=" w-[180px]">Shipping Address:</span>
                  <span>{order.address}</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className=" p-4 rounded">
              <h4 className="font-semibold text-xl  mb-4">Payment Details</h4>
              <div className="space-y-4 text-[#5B5B5B]">
                <div className="flex justify-normal">
                  <span className=" w-[180px]">Transaction ID:</span>
                  <span>TRX79214204</span>
                </div>
                <div className="flex justify-normal">
                  <span className=" w-[180px]">Payment Method:</span>
                  <span>Debit Card</span>
                </div>
                <div className="flex justify-normal">
                  <span className=" w-[180px]">Card Holder:</span>
                  <span>Cameron Williamson</span>
                </div>
                <div className="flex justify-normal">
                  <span className=" w-[180px]">Card Number:</span>
                  <span>**** **** **** 2675</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[421px] bg-white shadow-md rounded-xl p-4">
          <div className="bg-gray-100 p-4 rounded mb-6">
            <h4 className="font-semibold text-xl mb-2">Order Summary</h4>
            <div className="space-y-2">
              <div className='flex border-b text-[#5B5B5B] justify-between py-3'>Sub Total: <span>$1,467.97</span></div>
              <div className='flex  border-b text-[#5B5B5B] justify-between py-3'>Discount: <span>$0.00</span></div>
              <div className='flex  border-b text-[#5B5B5B] justify-between py-3'>Shipping Fee: <span>$15.00</span></div>
              <div className='flex  border-b text-[#5B5B5B] justify-between py-3'>Tax: <span>$2.10</span></div>
              <div className='flex  border-b text-[#5B5B5B] justify-between py-3'>Total (USD): <span>$1657.26</span></div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-xl ">Track Order</h4>
            <div className="text-sm text-[#5B5B5B] space-y-3">
              <div className="text-[#5B5B5B] font-semibold mb-2 ">
                <span className=" w-[180px]">Order ID:</span>
                <span> PUR-15627927</span>
              </div>
              <select
                name="orderStatus"
                id="orderStatus"
                className="border border-[#878787] w-[207px] px-4 rounded-xl py-3 text-sm mb-4 focus:outline-none  focus:ring-1  focus:ring-[#878787]"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option  value="Order Placed">Order Placed</option>
                <option value="Order Confirmed">Order Confirmed</option>
                <option value="In Package">In Package</option>
                <option value="On the Way">On the Way</option>
                <option value="Delivered">Delivered</option>
              </select>
              <div>
                {trackSteps.map((step, idx) => {
                  // Find the index of the current status
                  const currentIdx = trackSteps.findIndex(s => s.label === orderStatus);
                  const isActive = idx === currentIdx;
                  const isCompleted = idx < currentIdx;
                  return (
                    <div key={step.label} className="flex items-center space-y-4 gap-2 mb-2">
                      {isActive ? (
                        <FaDotCircle className="text-[#E94E30] w-4 h-4" />
                      ) : isCompleted ? (
                        <FaDotCircle className="text-green-500 w-4 h-4" />
                      ) : (
                        <FaRegCircle className="text-gray-400 w-4 h-4" />
                      )}
                      <div>
                        <div className={`font-semibold ${isActive ? 'text-[#E94E30]' : isCompleted ? 'text-green-600' : 'text-black'}`}>{step.label}</div>
                        <div className="text-xs">
                          {step.expected && !isCompleted && !isActive && <span className="text-[#5B5B5B]">Expected: </span>}
                          {step.date}
                          {step.time && <span> {step.time}</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
