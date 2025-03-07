import './App.css'
import Layout from './components/layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cloth from './pages/Cloth'
import Bags from './pages/Bags'
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/Home' index element={<Home />} /> {/* Default route */}
          <Route path='Shop' element={<Shop />} />
          {/* <Route path='/Product' element={<Product />} /> */}
          <Route path='/Cloth' element={<Cloth />} />
          <Route path='/Bags' element={<Bags />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/Contact' element={<Contact />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
