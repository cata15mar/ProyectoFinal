import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './login/Login.jsx'
import Registro from './registro/Registro.jsx'
import Home from './home/Home.jsx'
import Checkout from './components/pages/Checkout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/registro" element={<Registro />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)