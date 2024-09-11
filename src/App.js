import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react';
import HomePage from "./pages/HomePage";
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";
import DetailProductPage from "./pages/DetailProductPage"



console.log(process.env.REACT_APP_API_POKEMON_V2)

function App() {
  return (
    <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/poke/detail/:id" element={<DetailProductPage />} /> 
            <Route path="*" element="Page not exists 404" />
          </Routes>
          <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
