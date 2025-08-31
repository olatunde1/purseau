
import EmptyCartIcon from '../assets/images/empty-cart.png'
import SubMenu from "@/components/SubMenu";
import ImageGrid from "@/components/OurFeaturedCollection";
import RecentlyViewed from "@/components/RecentlyViewed";
import { StayLoop } from "@/components/StayLoop";
import { Footer } from "@/components/Footer";

const EmptyCart = () => {
  return (
    <>
    <SubMenu category={"shopping-cart"} />
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#ffffff] font-custom text-center">
        <img src={EmptyCartIcon} alt="" className="mb-10" />
      <h1 className="text-2xl sm:text-[20px] font-bold text-[#1B121B] mb-4">
        Your Cart is empty!
      </h1>
      <p className="text-[#878787] text-sm sm:text-base max-w-[355px] mb-[60px]">
        Browse our categories and discover our best deals!
      </p>
      <a
        href="/shop"
        className="flex items-center justify-center gap-2 px-10 py-3 bg-[#E94E30] text-white rounded-md hover:bg-red-600 transition"
      >
        Start Shopping 
      </a>
    </div>
    <ImageGrid />
    <RecentlyViewed />
    <StayLoop />
    <Footer />
    </>

  );
};

export default EmptyCart;
