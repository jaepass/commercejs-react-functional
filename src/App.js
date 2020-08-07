import React from "react";
import './styles/scss/styles.scss'

import ProductsLanding from "./components/ProductsLanding";
import Hero from "./components/Hero";

const App = () => {
  return (
    <div className="app">
      <Hero />
      <ProductsLanding />
    </div>
  );
};

export default App;
