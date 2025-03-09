import "./App.css";
import Layout from "./components/layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cloth from "./pages/Cloth";
import Bags from "./pages/Bags";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import BlogDetails from "./pages/BlogDetails";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" index element={<Home />} /> {/* Default route */}
        <Route path="shop" element={<Shop />} />
        {/* <Route path='/Product' element={<Product />} /> */}
        {/* <Route path="/Cloth" element={<Cloth />} /> */}
        {/* <Route path="/Bags" element={<Bags />} /> */}
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path='/BlogDetails' element={<BlogDetails/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
      </Route>
    </Routes>
  );
}

export default App;
