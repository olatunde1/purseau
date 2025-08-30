
import { Search, Bell } from 'lucide-react';
import ProfilePic from "../assets/images/admin-profile-picture.png";

function Navbar() {
  return (
    <div className="flex w-full justify-between items-center pt-[31px] pb-[21px] border-b shadow-sm px-10 mb-6">
      <div>
        <h1 className="text-xl font-semibold">Welcome Admin</h1>
        <span className="text-sm text-gray-600">
          You have <span className='text-[#E94E30]'> 3 new notifications</span>
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-[500px] pl-10 pr-4 py-2 border rounded-2xl bg-[#E5E5EA]"
          />
        </div>
        <div className="flex items-center space-x-1">
          <Bell className="bg-[#E5E5EA] p-2 rounded-full" width="48px" height="48px" />
        </div>
        <div className="profile flex gap-3">
          <div className="admin-name text-right">
            <p className='font-semibold text-sm'>Fuad Noah</p>
            <span className='text-xs italic'>Admin</span>
          </div>
          <img src={ProfilePic} alt="Profile Picture" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
