import './App.css'
import Layout from './components/layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Shop from './pages/Shop'
import Product from './pages/product'

function App() {

  return <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='home' element ={<Home />} />
            <Route path='shop' element={<Shop />} />
            <Route path='product' element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
}

export default App