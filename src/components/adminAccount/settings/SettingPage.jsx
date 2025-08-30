import { useState } from "react";
import ProfilePic from "../../../assets/images/admin-profile-picture.png";
import EditIcon from "../../../assets/images/editIcon.png";

const SettingsPage = () => {
  const [profileImage, setProfileImage] = useState(ProfilePic);

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0])); // preview new image
    }
  };

  return (
    <div className="w-full min-h-screen  p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6 ml-[38px] py-10">Settings</h1>

      <div className="md:w-[534px] bg-white shadow-md border rounded-2xl overflow-hidden ml-[38px] w-full">
        {/* Section Header */}
        <h2 className="text-lg font-semibold text-gray-700 ml-[24px] pt-6">My Profile</h2>
        <div className="flex gap-6 px-6 py-4">
          <div className="relative w-20 h-20 my-5">
            {/* Profile Picture */}
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />

            {/* Hidden File Input */}
            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Edit Icon Overlay */}
            <label
              htmlFor="profileUpload"
              className="absolute bottom-0 right-0  p-1 rounded-full text-white  cursor-pointer"
            >
                <img src={EditIcon} alt="" />
              {/* <EditIcon size={14} /> */}
            </label>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-[16px] text-black font-bold">Noah Fuad</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>

        {/* Profile Details */}
       <div className="py-6 border mx-8 shadow-lg rounded-lg space-y-6 mb-10">
        {/* Profile Details */}
        <div className="grid grid-cols-2 gap-y-4 items-center">
            {/* Name */}
             <div className="col-span-2 grid grid-cols-2 items-center  px-6 py-2 rounded">
                <label className="text-sm font-medium text-gray-600">Name</label>
                <p className="text-gray-800 font-semibold">Noah Fuad</p>
            </div>
           
            {/* Phone Number */}
            <div className="col-span-2 grid grid-cols-2 items-center bg-[#F8F8F8] px-6 py-6 rounded">
            <label className="text-sm font-medium text-gray-600">Phone Number</label>
            <p className="text-gray-800 font-semibold">+234 814 747 9275</p>
            </div>

            {/* Email */}
           
             <div className="col-span-2 grid grid-cols-2 items-center px-6 py-2 rounded">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <p className="text-gray-800 font-semibold">noah_fuad@purseau.com</p>
            </div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
