import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TrackOrder() {
  const [address, setAddress] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    // Add your logic here to handle tracking
    console.log('Tracking Address:', address);
  };

  return (
    <div className="w-[878px]  mx-10 pb-[593px]"
    style={{
        boxShadow:
          '0px 14px 30px 0px #7575751A, 0px 55px 55px 0px #75757517, 0px 124px 74px 0px #7575750D, 0px 220px 88px 0px #75757503, 0px 344px 96px 0px #75757500',
      }}
    >
         <div className="">
       <Link to="#">
       <h2 className="text-xl font-bold mb-6">Track Order</h2>
       </Link>
     </div>
     <div className="px-10">
     <h1 className="text-xl font-medium mb-4 ">Track your Order</h1>
      <p className="text-gray-700 mb-8">
        To track your order, please enter the Order ID in the box below and press the “Track Order” button.
        This was given to you in your receipt and in the confirmation email that was sent to you.
      </p>

      <form onSubmit={handleTrack} className="space-y-5">
        <div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full py-5 pl-6 mb-10 rounded-xl bg-[#F2F2F7]"
            required
          />
        </div>

        <button
          type="submit"
          className=" bg-[#F2542D] text-white py-2 px-[107.5px] rounded-xl hover:bg-[#d84325] transition"
        >
          Track Order
        </button>
      </form>
     </div>
    </div>
  );
}
