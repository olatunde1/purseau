import Header from "./header";
import Navbar from "./navbar";

import { Outlet } from "react-router-dom";


const layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-mainBg">
        <Outlet />
      </div>
      
    </>
  );
};

export default layout;
