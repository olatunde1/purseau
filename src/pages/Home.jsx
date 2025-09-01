import { Button } from "../components/ui/button";
import { SlArrowRight } from "react-icons/sl";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Icon1 from "../assets/images/icon1.png";
import Icon2 from "../assets/images/icon2.png";
import Icon3 from "../assets/images/icon3.png";
import Icon4 from "../assets/images/icon4.png";
import newArrival from "../assets/images/newArrival.png";
import bestSeller from "../assets/images/best sellers.png";
import trending from "../assets/images/trending.png";
import ProductDisplay from "../components/ProductDisplay";
import SpecialOffer from "@/components/SpecialOffer";
import Brand from "@/components/Brand";
import Blog from "../components/Blog";
import { Footer } from "@/components/Footer";
import { StayLoop } from "@/components/StayLoop";
import Explore from "../components/ExploreCategories";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      image: Icon1,
      title: "Revolutionary Image Search Technology",
      description: "Find your dream outfit by simply uploading an image.",
    },
    {
      image: Icon2,
      title: "Exclusive Female-Focused Collections",
      description: "Exclusive curated fashion products, for every women.",
    },
    {
      image: Icon3,
      title: "Trendy, Affordable, and High-Quality Products ",
      description:
        "Stylish and durable fashion products without breaking the bank.",
    },
    {
      image: Icon4,
      title: "Hassle-Free Returns for Peace of Mind",
      description: "Change your mind? No problem. Easy returns guaranteed.",
    },
  ];

  return (
    <>
      <div className="wrap">
        <div className="container2">
          <h1 className="unleash">
            Unleash Your Feminine <br /> Style with Purseau.
          </h1>
          <p className="discover">
            Discover trendy fashion items and accessories, exclusively designed{" "}
            <br /> for women.
          </p>
          <div onClick={() => navigate("/shop")}>
            <Button className="explore transform transition-transform duration-300 hover:scale-105 ">
              Explore <SlArrowRight />
            </Button>
          </div>
        </div>
      </div>

      <div className="discovery lg:mb-6 mb-10 text-center">
        <h1 className=" text-3xl lg:text-4xl">Discover What Sets Us Apart</h1>
        <p className="pt-1">We provide you with the best customer experience</p>
      </div>

       <div className="notification-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center lg:pt-20">
          {notifications.map((notification, index) => (
            <Card
              key={index}
              className="
                rounded-xl cursor-pointer p-10 lg:p-4 text-black transition-all mb-5
                bg-white shadow-md border
                md:bg-transparent md:shadow-sm md:border-white/10
                hover:shadow-md
              "
            >
              <CardHeader className="flex items-center gap-4">
                <img
                  src={notification.image}
                  alt={notification.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h3 className="text-lg font-semibold">{notification.title}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-[#5B5B5B] pt-3">
                  {notification.description}
                </p>
              </CardContent>

              <CardFooter>
                {/* Optional timestamp or CTA */}
              </CardFooter>
            </Card>
          ))}
        </div>



      <div className="container">
        <div className="arrival">
          <div className="newArrivalWrap">
            <img src={newArrival} alt="New Arrival" className="newArrival" />
            <div className="overlay">
              <h2 className="overlay-title">New Arrivals</h2>
              <p className="overlay-text">
                Your Wardrobe Deserves Something New - Shop now <br /> to grab
                our latest arrivals
              </p>
              <Button className="bg-transparent shadow-none border border-white hover:bg-white hover:text-white text-white overlay-button">
                Shop Now <SlArrowRight className="mt-1" />
              </Button>
            </div>
          </div>
          <div className="trendBestSells">
            <div className="trendingClothWrap">
              <img
                src={trending}
                alt="Trending Cloth"
                className="trendingCloth"
              />
              <div className="overlayTrending ">
                <h2 className="overlayTrending-title overlay-title">
                  Trending Now
                </h2>
                <p className="overlay-text">
                  Discover the latest trending picks that define chic & <br />{" "}
                  confidence
                </p>
              <Button className="bg-transparent shadow-none border border-white hover:bg-white hover:text-white text-white overlay-button">
                  Explore <SlArrowRight className="mt-1" />
                </Button>
              </div>
            </div>
            <div className="bestSellingWrap">
              <img
                src={bestSeller}
                alt="Best Selling Cloths"
                className="bestSellingCloth"
              />
              <div className="overlayTrending">
                <h2 className="overlayTrending-title overlay-title">
                  Best Sellers
                </h2>
                <p className="overlay-text">
                  Tried, Tested & Loved – Our Top Picks Fashion Hits <br />{" "}
                  You’ll Love Forever
                </p>
              <Button className="bg-transparent shadow-none border border-white hover:bg-white hover:text-white text-white overlay-button">
                  Discover <SlArrowRight className="mt-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="exp">
        <Explore />
      </div>

      <section>
        <div className="container">
          <div className="explore-by-categories">
            <h1 className="explore-text lg:text-4xl text-3xl lg:pt-20 pt-16">Our Top Selling Products</h1>
            <p className="browse-favorites lg:pb-16 pb-6  lg:w-[436px] mx-auto justify-center pt-2">
              In a laoreet purus. Integer turpis quam, laoreet id orci nec,
              ultrices lacinia nunc. Aliquam erat vo
            </p>
          </div>
        </div>
      </section>

      <div>
        <ProductDisplay />
      </div>

      <div className="special-offer">
        <SpecialOffer />
      </div>

      <div className="text-center">
        <Brand />
      </div>

      <div className="blog text-center">
        <Blog />
      </div>

      <div className="stay-loop">
        <StayLoop />
      </div>

      <div className="footer-details">
        <Footer />
      </div>
    </>
  );
};

export default Home;
