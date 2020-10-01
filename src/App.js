import React, { Component } from "react";
import { commerce } from './lib/Commerce';
import './styles/scss/styles.scss'

import Hero from './components/Hero';
import ProductsList from "./components/ProductsList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      merchant: {},
      products: [],
    }
  }

  componentDidMount() {
    this.fetchMerchantDetails();
    this.fetchProducts();
  }

  fetchMerchantDetails() {
    commerce.merchants.about().then((merchant) => {
      this.setState({ merchant: merchant });
    }).catch((error) => {
      console.log('There was an error fetch the merchant details', error)
    });
  }

  /**
   * Fetch products data from Chec and stores in the products data object.
   * https://commercejs.com/docs/sdk/products
   */
  fetchProducts() {
    commerce.products.list().then((products) => {
      this.setState({ products: products.data });
    }).catch((error) => {
      console.log('There was an error fetching the products', error);
    });
  }

  render() {
    const { products, merchant } = this.state;

    return (
      <div className="app">
        <Hero
          merchant={merchant}
        />
        <ProductsList 
          products={products}
        />
      </div>
    );
  }
};

export default App;
