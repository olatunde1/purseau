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


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/BlogDetails" element={<BlogDetails />} />
      </Route>
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/VerifyEmail" element={<VerifyEmail />} />
      <Route path="/CreatePassword" element={<CreatePassword />} />
      <Route path="/PersonalDetails" element={<PersonalDetails/>} />
      <Route path="/VerifyPhoneNumber" element={<VerifyPhoneNumber/>} />
      <Route path="/Login" element={<LoginPage/>} />
    </Routes>
  );
}

export default App;
