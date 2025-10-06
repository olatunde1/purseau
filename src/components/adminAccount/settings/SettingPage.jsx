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
    <div className="w-full min-h-screen p-1 sm:p-0 lg:p-0 max-w-8xl mx-auto">
      {/* Page Title */}
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:ml-[38px] py-4 sm:py-0 text-left">
        Settings
      </h1>

      {/* Card Container */}
      <div className="w-full md:w-[534px] bg-white shadow-md border rounded-2xl overflow-hidden mx-auto md:ml-[38px]">
        {/* Section Header */}
        <h2 className="text-lg font-semibold text-gray-700 ml-[24px] pt-6 text-left md:text-left">
          My Profile
        </h2>

        {/* Profile Section */}
        <div className="flex flex-row md:flex-row items-center md:items-start gap-4 md:gap-6 px-6 py-6">
          <div className="relative w-20 h-20 my-3 md:my-5">
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
              className="absolute bottom-0 right-0 p-1 rounded-full cursor-pointer"
            >
              <img src={EditIcon} alt="Edit" className="w-5 h-5" />
            </label>
          </div>

          <div className="flex flex-col justify-center text-center md:text-left">
            <p className="text-[16px] text-black font-bold">Noah Fuad</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>

        {/* Profile Details */}
      
<div className="py-6 border mx-3 sm:mx-6 md:mx-8 shadow-sm md:shadow-lg rounded-xl space-y-5 sm:space-y-6 mb-8">
  <div className="flex flex-col gap-4">
    {/* Name */}
    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-6 py-2 rounded text-left md:text-left">
      <label className="text-sm font-medium text-gray-600 mb-1 md:mb-0">
        Name
      </label>
      <p className="text-gray-800 font-semibold">Noah Fuad</p>
    </div>

    {/* Phone Number */}
    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 items-center bg-[#F8F8F8] px-4 md:px-6 py-4 md:py-6 rounded-lg text-left md:text-left">
      <label className="text-sm font-medium text-gray-600 mb-1 md:mb-0">
        Phone Number
      </label>
      <p className="text-gray-800 font-semibold">+234 814 747 9275</p>
    </div>

    {/* Email */}
    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-6 py-2 rounded text-left md:text-left">
      <label className="text-sm font-medium text-gray-600 mb-1 md:mb-0">
        Email
      </label>
      <p className="text-gray-800 font-semibold break-all">
        noah_fuad@purseau.com
      </p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default SettingsPage;
