import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItem extends Component {
    constructor(props) {
        super(props);

        this.handleUpdateCartQty = this.handleUpdateCartQty.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    }

    handleUpdateCartQty(lineItemId, quantity) {
        if (quantity < 1) {
            return this.handleRemoveFromCart();
        }
        this.props.onUpdateCartQty(lineItemId, quantity)
    }

    handleRemoveFromCart(lineItemId) {
        this.props.onRemoveFromCart(lineItemId);
    }

    render() {
        const { item } = this.props;

        return (
            <div className="cart-item">
                <img className="cart-item__image" src={item.media.source} alt={item.name} />
                    <div className="cart-item__details">
                        <h4 className="cart-item__details-name">{item.name}</h4>
                        <div className="cart-item__details-qty">
                            <button type="button" onClick={() => this.handleUpdateCartQty(item.id, item.quantity - 1)}>-</button>
                            <p>{item.quantity}</p>
                            <button type="button" onClick={() => this.handleUpdateCartQty(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <div className="cart-item__details-price">{item.line_total.formatted_with_symbol}</div>
                    </div>
                    <button type="button" className="cart-item__remove" onClick={() => this.handleRemoveFromCart(item.id)}>Remove</button>
            </div>
        );
    };
};

export default CartItem;

CartItem.propTypes = {
    item: PropTypes.object,
    onUpdateCartQty: () => {},
    onRemoveFromCart: () => {}
 };