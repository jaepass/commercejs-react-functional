import React, { Component } from 'react';
import { commerce } from '../lib/Commerce';

import ProductItem from './ProductItem';
import Cart from './Cart';

class ProductsLanding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            cart: {}
        }

        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
        this.handleUpdateCartQty = this.handleUpdateCartQty.bind(this);
        this.handleEmptyCart = this.handleEmptyCart.bind(this);
    }

    componentDidMount() {
        this.fetchProducts();
        this.fetchCart();
    }

    /**
     * Fetch the list of products from Chec's API
     */
    fetchProducts() {
        commerce.products.list()
            .then((res) => {
                this.setState({
                    products: res.data,
                });
            })
            .catch(error => console.log(error));
    }

    /**
     * Handle add product to cart
     * 
     * @param {object} product
     */
    handleAddToCart(product) {
        commerce.cart.add({ id: product.id }, 1)
            .then((res) => {
                this.setState({
                    cart: res.cart
                })
            })
            .catch(error => console.error(error));
    }

    /**
     * Handle remove line item from cart
     * 
     * @param {string} lineItemId
     */
    handleRemoveFromCart(lineItemId) {
        commerce.cart.remove(lineItemId)
            .then((res) => {
                this.setState({
                    cart: res.cart
                })
            })
            .catch(error => console.error(error));
    }

    /**
     * Handle update cart quantity
     * 
     * @param {string} lineItemId
     * @param {number} qty
     */
    handleUpdateCartQty(lineItemId, qty) {
        commerce.cart.update(lineItemId, { quantity: qty })
            .then((res) => {
                this.setState({
                    cart: res.cart
                })
            })
            .catch(error => console.error(error));
    }

    /**
     * Handle emptying cart items
     */
    handleEmptyCart() {
        commerce.cart.empty()
            .then(() => {
                this.setState({
                    cart: {}
                })
            })
            .catch(error => console.error(error));
    }

    /**
     * Fetch initial cart state
     */
    fetchCart() {
        commerce.cart.retrieve()
            .then((res) => {
                this.setState({
                    cart: res,
                });
            })
            .catch(error => console.log(error));
    }


    render() {
        const { products, cart } = this.state;

        return (
            <div className="products">
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        onAddToCart={this.handleAddToCart}
                    />
                ))}
                <Cart 
                    cart={cart}
                    onUpdateCartQty={this.handleUpdateCartQty}
                    onRemoveFromCart={this.handleRemoveFromCart}
                    onEmptyCart={this.handleEmptyCart}
                />
            </div>
        )
    }
}

export default ProductsLanding;