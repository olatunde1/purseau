import './App.css'
import Layout from './components/layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/Home' index element={<Home />} /> {/* Default route */}
          <Route path='Shop' element={<Shop />} />
          <Route path='/Product' element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
