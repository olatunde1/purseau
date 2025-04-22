import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const ProfileDetails = () => {
  const user = {
    firstName: "Akorede",
    lastName: "Adeniran",
    email: "akorede_ade@gmail.com",
    gender: "Female",
    dob: "1997-02-24",
    phone: "+234 810 567 5783",
  };

  return (
    <div className="p-4 md:px-8 w-[878px] mx-auto font-custom"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Profile Details</h2>
        <Button
          variant="outline"
          className="text-sm flex items-center gap-2 border-gray-300"
        >
          <FaEdit className="text-base" />
          Edit Profile
        </Button>
      </div>

    <div className="pt-5 pb-[164px]"
         style={{
            boxShadow: `
              0px 14px 30px 0px #7575751A,
              0px 55px 55px 0px #75757517,
              0px 124px 74px 0px #7575750D,
              0px 220px 88px 0px #75757503,
              0px 344px 96px 0px #75757500
            `,
          }}
    >

<form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6  mx-10">
  <div>
    <label className="block text-base font-bold text-black mb-4">First Name</label>
    <input
      type="text"
      value={user.firstName}
      readOnly
      className="w-full px-6 py-5 border-gray-300 rounded-2xl bg-[#F2F2F7] text-gray-800"
    />
  </div>

  <div>
    <label className="block text-base font-bold text-black mb-4">Last Name</label>
    <input
      type="text"
      value={user.lastName}
      readOnly
      className="w-full px-6 py-5 border-gray-300 rounded-2xl bg-[#F2F2F7] text-gray-800"
    />
  </div>

  {/* Stack Email to Phone Number in one column */}
  <div className="md:col-span-2 grid grid-cols-1 gap-6">
    <div>
      <label className="block text-base font-bold text-black mb-4">Email</label>
      <input
        type="email"
        value={user.email}
        readOnly
       className="w-full px-6 py-5 border-gray-300 rounded-2xl bg-[#F2F2F7] text-gray-800"
      />
    </div>

    <div>
      <label className="block text-base font-bold text-black mb-4">Gender</label>
      <input
        type="text"
        value={user.gender}
        readOnly
       className="w-full px-6 py-5 border-gray-300 rounded-2xl bg-[#F2F2F7] text-gray-800"
      />
    </div>

    <div>
      <label className="block text-base font-bold text-black mb-4">Date of Birth</label>
      <input
        type="date"
        value={user.dob}
        readOnly
       className="w-full px-6 py-5 border-gray-300 rounded-2xl bg-[#F2F2F7] text-gray-800"
      />
    </div>

    <div>
      <label className="block text-base font-bold text-black mb-4">Phone Number</label>
      <input
        type="tel"
        value={user.phone}
        readOnly
       className="w-full px-6 py-5 border-gray-300 rounded-2xl bg-[#F2F2F7] text-gray-800"
      />
    </div>
  </div>
        </form>
        <div className="mt-16 mx-10 ">
        <Button
          variant="destructive"
          className="bg-transparent border rounded-xl border-[#E94E30] text-[#E94E30] hover:text-white hover:bg-[#E94E30] px-[95px] py-[28px]"
        >
          <FaTrash className="mr-2" />
          Delete Account
        </Button>
      </div>

    </div>
     


      
    </div>
  );
};

export default ProfileDetails;
