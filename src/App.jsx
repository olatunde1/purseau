import "./App.css";
import Layout from "./components/layout";
import { Routes, Route } from "react-router-dom";
import Shop from "./pages/shop";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import BlogDetails from "./pages/BlogDetails";
import SignUp from "./components/Auth/SignUp";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/BlogDetails" element={<BlogDetails />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
