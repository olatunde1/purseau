import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "../Footer";
import { StayLoop } from "../StayLoop";
import AccountSidebar from "./AccountSidebar";
import { SlArrowLeft } from "react-icons/sl";

const AccountLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation();

  // 👇 close sidebar whenever route changes (mobile only)
  useEffect(() => {
    setShowSidebar(false);
  }, [location]);

  const handleBackClick = () => setShowSidebar(true);

  return (
    <div>
      <section className="w-[90%] mx-auto py-10">
        {/* Desktop layout */}
        <div className="hidden lg:flex w-full">
          <div className="w-[23%]">
            <AccountSidebar />
          </div>
          <main className="w-[104%] lg:ml-20">{children}</main>
        </div>

        {/* Mobile layout */}
        <div className="block lg:hidden relative w-full">
          {showSidebar && (
            <aside className="w-full">
              <AccountSidebar />
            </aside>
          )}

          {!showSidebar && (
            <main className="w-full">
              <div className="mb-8 flex items-center space-x-2">
                <SlArrowLeft />
                <button
                  onClick={handleBackClick}
                  className="text-sm hover:underline flex items-center gap-1"
                >
                  Back to My Account
                </button>
              </div>
              {children}
            </main>
          )}
        </div>
      </section>

      <StayLoop />
      <Footer />
    </div>
  );
};

export default AccountLayout;
