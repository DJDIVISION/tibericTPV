import React from 'react' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Products from './pages/Products.jsx'
import Home from './pages/Home.jsx'
import Families from './pages/Families.jsx'
import './App.css'
import Cierres from './pages/Cierres.jsx'


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/families" element={<Families />} />
        <Route path="/cierres" element={<Cierres />} />
      </Routes>
    </Router>
  )
}

export default App
