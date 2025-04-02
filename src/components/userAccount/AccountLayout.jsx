import { Footer } from "../footer";
import { StayLoop } from "../StayLoop";
import AccountSidebar from "./AccountSidebar";

const AccountLayout = ({ children }) => {
  return (
    <div>
      <section className="w-[90%] mx-auto py-10 ">
        <div className="flex w-full">
          {/* <div className="w-[23%] bg-yellow-300"> */}
          <AccountSidebar />
          {/* </div> */}
          {/* className="w-[74%] bg-red-500" */}
          <main>{children}</main>
        </div>
      </section>
      <StayLoop />
      <Footer />
    </div>
  );
};

export default AccountLayout;
