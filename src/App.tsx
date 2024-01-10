import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Home from './pages/Home';
import Products from './pages/Products';
import Error from './pages/Error';
import { useFetch } from './components/UseFetch';
import Navbar from './components/Navbar';


function App() {
  const {products, address} = useFetch({ url: "https://api.escuelajs.co/api/v1/products" });


  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home products={products} address={address} />} />
        <Route path="products" element={<Products />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
