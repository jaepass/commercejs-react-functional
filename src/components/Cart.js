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
                <>
                    {cart.total_unique_items > 0 ? (
                        <>
                        {cart.line_items.map(item => (
                            <div key={item.id}>
                                <div className="cart__name">{item.name}</div>
                                <div className="cart__name">{item.price.formatted_with_symbol}</div>
                                <div className="cart__minus" onClick={() => item.quantity > 1 ? this.handleUpdateCartQty(item.id, item.quantity - 1) : this.handleRemoveFromCart(item.id)}>-</div>
                                <div className="cart__qty">{item.quantity}</div>
                                <div className="cart__add" onClick={() => this.handleUpdateCartQty(item.id, item.quantity + 1)}>+</div>
                                <div className="cart__remove" onClick={() => this.handleRemoveFromCart(item.id)}>Remove</div>
                            </div>
                        ))}
                        </>
                    ) : (
                        <div className="cart__empty">
                            Your cart is empty
                        </div>
                    )}
                </>
                <div className="cart__empty" onClick={this.handleEmptyCart}>Empty cart</div>
            </div>
        );
    };
};

export default Cart;