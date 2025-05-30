import "./App.css";
import Layout from "./components/layout";
import { Routes, Route } from "react-router-dom";
import Shop from "./pages/shop";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import BlogDetails from "./pages/BlogDetails";
import SignUp from "./components/Auth/SignUp";
import Home from "./pages/home";
import VerifyEmail from "./components/Auth/VerifyEmail";
import CreatePassword from "./components/Auth/CreatePassword";
import PersonalDetails from "./components/Auth/PersonalDetails";
import VerifyPhoneNumber from "./components/Auth/VerifyPhoneNumber";
import LoginPage from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import CreateNewPassword from "./components/Auth/CreateNewPassword";
import PasswordResetSuccessful from "./components/Auth/PasswordResetSuccessful";
import AccountCreatedSuccessful from "./components/Auth/AccountCreatedSuccessful";
import SearchResults from "./pages/SearchResults";
import BlogPage from "./pages/BlogPage";
import TermsAndConditions from "./pages/Terms";
import Policy from "./pages/Policy";
import ProductDescription from "./pages/ProductDescription";
import ScrollToTop from "./components/ScrollToTop";
import AccountOverview from "./components/userAccount/accounts/AccountOverview";
import EditAccount from "./pages/userAccont/EditAccount";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOut from "./pages/CheckOut";
import PaymentSuccessful from './pages/PaymentSuccessful'
import EmptyCart from "./pages/EmptyCart";
import WishlistComponent from "./components/userAccount/wishlist/WishlistComponent";
import MyOrderComponent from "./components/userAccount/myOrder/MyOrderComponent";
import OrderDetailsComponent from "./components/userAccount/orderDetails/OrderDetailsComponent";
import OrderStatusComponent from "./components/userAccount/orderStatus/OrderStatusComponent";
import ProfileDetails from "./components/Auth/ProfileDetails";
import ProfileComponent from "./components/userAccount/profile/profileComponent";


function App() {
  return (
    <>
     <ScrollToTop />
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/BlogDetails" element={<BlogDetails />} />
        <Route path="/search-result" element={<SearchResults />} />
        <Route path="/user-account" element={<AccountOverview />} />
        <Route path="/edit-user-address" element={<EditAccount />} />
        <Route path="/my-order" element={<MyOrderComponent />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/product-description/:id" element={<ProductDescription />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/payment-successful" element={<PaymentSuccessful />} />
        <Route  path="/empty-cart" element= {<EmptyCart />} />
        <Route  path="/order-details/:id" element= {<OrderDetailsComponent/>} />
        <Route  path="/order-status/:orderId" element= {<OrderStatusComponent/>} />
        <Route  path="/wishlist" element= {<WishlistComponent/>} />
        <Route  path="/profile-details" element= {<ProfileComponent/>} />
      </Route>

      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/VerifyEmail" element={<VerifyEmail />} />
      <Route path="/CreatePassword" element={<CreatePassword />} />
      <Route path="/PersonalDetails" element={<PersonalDetails />} />
      <Route path="/VerifyPhoneNumber" element={<VerifyPhoneNumber />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/CreateNewPassword" element={<CreateNewPassword />} />
      <Route path="/check-out" element={<CheckOut />} />
      {/* <Route path="/PasswordResetsuccessful" element={<PasswordResetSuccessful/>} /> */}
      <Route
        path="/AccountCreatedSuccessful"
        element={<AccountCreatedSuccessful />}
      />
    </Routes>
    </>
   
  );
}

export default App;
