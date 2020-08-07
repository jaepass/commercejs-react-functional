import React, { Component } from 'react';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.handleUpdateCartQty = this.handleUpdateCartQty.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
        this.handleEmptyCart = this.handleEmptyCart.bind(this);
    }

    handleUpdateCartQty(lineItemId, quantity) {
        this.props.onUpdateCartQty(lineItemId, quantity)
    }

    handleRemoveFromCart(lineItemId) {
        this.props.onRemoveFromCart(lineItemId);
    }

    handleEmptyCart() {
        this.props.onEmptyCart();
    }

    render() {
        const { cart } = this.props;

        return (
            <div className="cart">
                <div className="cart__heading">
                    <h4>Your Shopping Cart</h4>
                </div>
                <>
                    {cart.total_unique_items > 0 ? (
                        <>
                        {cart.line_items.map(item => (
                            <div key={item.id} className="cart__item d-flex">
                                <img className="cart__img" src={item.media.source} alt={item.name} />
                                <div class="cart__details d-flex">
                                    <div className="d-block">
                                        <div className="cart__name">{item.name}</div>
                                        <div className="cart__name">{item.price.formatted_with_symbol}</div>
                                    </div>
                                    <div className="cart__qty d-flex">
                                        <div className="cart__qty-minus" onClick={() => item.quantity > 1 ? this.handleUpdateCartQty(item.id, item.quantity - 1) : this.handleRemoveFromCart(item.id)}>-</div>
                                        <div className="cart__qty-count">{item.quantity}</div>
                                        <div className="cart__qty-add" onClick={() => this.handleUpdateCartQty(item.id, item.quantity + 1)}>+</div>
                                        <p className="cart__qty-remove" onClick={() => this.handleRemoveFromCart(item.id)}>Remove</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="cart__total">Subtotal:</div>
                        <div className="cart__total-price">{cart.subtotal.formatted_with_symbol}</div>
                        <button className="cart__empty" onClick={this.handleEmptyCart}>Empty cart</button>
                        </>
                    ) : (
                    <p className="cart__empty">
                        Your cart is empty =( Add some cool products to your cart!
                    </p>
                    )}
                </>
            </div>
        );
    };
};

export default Cart;