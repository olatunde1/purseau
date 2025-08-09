import React from 'react';
import { Pencil, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const addresses = [
  {
    name: 'Akorede Victor',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    phone: '+234 810 567 5783',
    isDefault: true,
  },
  {
    name: 'Akorede Victor',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    phone: '+234 810 567 5783',
    isDefault: false,
  },
];

export default function AddressBook() {
  return (
    <div className="w-[878px] mx-auto ml-10 p-6"
    style={{
        boxShadow:
          '0px 14px 30px 0px #7575751A, 0px 55px 55px 0px #75757517, 0px 124px 74px 0px #7575750D, 0px 220px 88px 0px #75757503, 0px 344px 96px 0px #75757500',
      }}
    >
     <div className="flex justify-between ">
        <h2 className="text-2xl font-semibold mb-6">Address Book</h2>
       <Link to="/add-new-address">
       <button className="mb-6 px-4 py-2 bg-[#F2542D] text-white rounded-[10px] hover:bg-[#F2542D]">
            Add new address
        </button>
       </Link>
     </div>

      <div className="space-y-6 w-[400px] ml-10 pb-[293px]">
        {addresses.map((item, index) => (
          <div key={index} className="border p-4 rounded shadow-sm bg-[#FFF4F0]">
            <h3 className="text-lg font-semibold mb-6">{item.name}</h3>
            <p className="text-base text-[#5B5B5B] mb-4 w-[300px]">{item.address}</p>
            <p className="text-base text-[#5B5B5B] mb-6">{item.phone}</p>

            {item.isDefault && (
              <div className="inline-block mt-2 px-3 py-1 text-sm font-medium text-[#C66B4E] rounded-2xl" style={{ backgroundColor: '#F6E3DD' }}>
                Default Address
              </div>
            )}

            <div className="flex justify-between items-center mt-4 px-3 py-2 bg-[#F2F2F7]">
              <button
                className="text-sm hover:underline font-bold"
                style={{ color: item.isDefault ? '#C7C7CC' : '#00A878' }}
              >
                Set as default
              </button>
              <button className="text-[#E94E30] hover:text-[#E94E30] flex items-center gap-1 text-base">
                <Pencil size={16} /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
