import "./App.css";
import Layout from "./components/layout";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
// import BlogDetails from "./pages/BlogDetails";
import SignUp from "./components/Auth/SignUp";
import Home from "./pages/Home";
import VerifyEmail from "./components/Auth/VerifyEmail";
import CreatePassword from "./components/Auth/CreatePassword";
import PersonalDetails from "./components/Auth/PersonalDetails";
import VerifyPhoneNumber from "./components/Auth/VerifyPhoneNumber";
import LoginPage from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import CreateNewPassword from "./components/Auth/CreateNewPassword";
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
import ProfileComponent from "./components/userAccount/profile/ProfileComponent";
import DeleteConfirmation from "./components/Auth/DeleteConfirmation";
import PasswordSettingsComponent from "./components/userAccount/PasswordSettings/PasswordSettingsComponent";
import AddressBookComponent from "./components/userAccount/AddressBook/AddressBookComponent";
import AddNewAddressComponent from "./components/userAccount/AddNewAddress/AddNewAddressComponent";
import TrackOrderComponent from "./components/userAccount/TrackOrder/TrackOrderComponent";
import Admin from "./dashboard/AdminDashboard";
import OrderHistoryComponent from "./components/adminAccount/orderHistory/OrderHistoryComponent"
import AdminOrderDetailsComponent from "./components/adminAccount/orderDetails/OrderDetailsComponent";
import AllProductListComponent from "./components/adminAccount/productList/AllProductListComponent";
import CreateProductComponent from "./components/adminAccount/createProduct/CreateProductComponent";
import ArchivedProductComponent from "./components/adminAccount/archivedProduct/ArchivedProductComponent";
import ArchivedProductDetailsComponent from "./components/adminAccount/archivedProduct/ArchivedProductDetailsComponent";
import CustomerInfoPageComponent from "./components/adminAccount/customers/CustomerInfoPageComponent";
import CustomersPageComponent from "./components/adminAccount/customers/CustomersPageComponent";
import SettingPageComponent from "./components/adminAccount/settings/SettingPageComponent";
import AdminBlogComponent from "./components/adminAccount/adminBlog/AdminBlogComponent";
import BlogPostComponent from "./components/adminAccount/blogPost/BlogPostComponent";
import UserBlogPage from "./components/UserBlogPage";



function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="blog/:id" element={<BlogPage />} />
          {/* <Route path="BlogDetails" element={<BlogDetails />} /> */}
           <Route path="blog-page" element={<UserBlogPage />} />
          <Route path="search-result" element={<SearchResults />} />
          <Route path="user-account" element={<AccountOverview />} />
          <Route path="edit-user-address" element={<EditAccount />} />
          <Route path="my-order" element={<MyOrderComponent />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="policy" element={<Policy />} />
          <Route path="product-description/:id" element={<ProductDescription />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
          <Route path="payment-successful" element={<PaymentSuccessful />} />
          <Route path="empty-cart" element={<EmptyCart />} />
          <Route path="order-details/:id" element={<OrderDetailsComponent />} />
          <Route path="order-status/:orderId" element={<OrderStatusComponent />} />
          <Route path="wishlist" element={<WishlistComponent />} />
          <Route path="profile-details" element={<ProfileComponent />} />
          <Route path="delete-confirmation" element={<DeleteConfirmation />} />
          <Route path="password-settings" element={<PasswordSettingsComponent />} />
          <Route path="address-book" element={<AddressBookComponent />} />
          <Route path="add-new-address" element={<AddNewAddressComponent />} />
          <Route path="track-order" element={<TrackOrderComponent />} />
        </Route>

        <Route path="SignUp" element={<SignUp />} />
        <Route path="VerifyEmail" element={<VerifyEmail />} />
        <Route path="CreatePassword" element={<CreatePassword />} />
        <Route path="PersonalDetails" element={<PersonalDetails />} />
        <Route path="VerifyPhoneNumber" element={<VerifyPhoneNumber />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="ForgotPassword" element={<ForgotPassword />} />
        <Route path="CreateNewPassword" element={<CreateNewPassword />} />
        <Route path="check-out" element={<CheckOut />} />
        <Route path="AccountCreatedSuccessful" element={<AccountCreatedSuccessful />} />

        <Route path="admin" element={<Admin />}>
          <Route path="orders-history" element={<OrderHistoryComponent />} />
          <Route path="order-details" element={<AdminOrderDetailsComponent />} />
          <Route path="product-list" element={<AllProductListComponent />} />
          <Route path="create-product" element={<CreateProductComponent />} />
          <Route path="archived-product" element={<ArchivedProductComponent />} />
          <Route path="archived-product-details" element={<ArchivedProductDetailsComponent />} />
          <Route path="customer-information" element={<CustomerInfoPageComponent />} />
          <Route path="customer" element={<CustomersPageComponent />} />
          <Route path="settings" element={<SettingPageComponent />} />
           <Route path="blog-admin" element={<AdminBlogComponent />} />
           <Route path="blog-post" element={<BlogPostComponent />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
