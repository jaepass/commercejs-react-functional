import React, { useState, useEffect } from "react";
import { commerce } from './lib/Commerce';

import './styles/scss/styles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingBag, faTimes } from '@fortawesome/free-solid-svg-icons'

import Hero from './components/Hero';
import ProductsList from './components/ProductsList';
import CartNav from './components/CartNav';

library.add(faShoppingBag, faTimes);

const App = () => {
  const [merchant, setMerchant] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({})

  // Because React rendering can be triggered for many different reasons, 
  // it is best practice to wrap our commerce object method calls into a 
  // useEffect() hook. This hook acts as the replacment to componentWillMount() 
  // function when using class components. By leaving the second argument array 
  // empty, this method will run once before the initial render.
  useEffect(() => {
    fetchMerchantDetails();
    fetchProducts();
    fetchCart();
  }, []);

  /**
   * Fetch merchant details
   * https://commercejs.com/docs/sdk/full-sdk-reference#merchants
   */
  const fetchMerchantDetails = () => {
    commerce.merchants.about().then((merchant) => {
      setMerchant(merchant);
    }).catch((error) => {
      console.log('There was an error fetch the merchant details', error)
    });
  }

  /**
   * Fetch products data from Chec and stores in the products data object.
   * https://commercejs.com/docs/sdk/products
   */
  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data);
    }).catch((error) => {
      console.log('There was an error fetch the merchant details', error)
    });
  }


  /**
   * Retrieve the current cart or create one if one does not exist
   * https://commercejs.com/docs/sdk/cart
   */
  const fetchCart = () => {
    commerce.cart.retrieve().then((cart) => {
      setCart(cart);
    }).catch((error) => {
      console.log('There was an error fetching the cart', error);
    });
  }

  /**
   * Adds a product to the current cart in session
   * https://commercejs.com/docs/sdk/cart/#add-to-cart
   *
   * @param {string} productId The ID of the product being added
   * @param {number} quantity The quantity of the product being added
   */
  const handleAddToCart = (productId, quantity) => {
    commerce.cart.add(productId, quantity).then((item) => {
      setCart(item.cart);
    }).catch((error) => {
      console.error('There was an error adding the item to the cart', error);
    });
  }

  /**
   * Removes line item from cart
   * https://commercejs.com/docs/sdk/cart/#remove-from-cart
   *
   * @param {string} lineItemId ID of the line item being removed
   */
  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart.remove(lineItemId).then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.error('There was an error removing the item from the cart', error);
    });
  }

  return (
    <div className="app">
      <Hero
        merchant={merchant}
      />
      <CartNav 
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
      />
      <ProductsList 
        products={products}
        onAddToCart={handleAddToCart}
      />
  </div>
  )
};

export default App;