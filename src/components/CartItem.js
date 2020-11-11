import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {

    return (
        <div className="cart-item">
            <img className="cart-item__image" src={item.media.source} alt={item.name} />
                <div className="cart-item__details">
                    <h4 className="cart-item__details-name">{item.name}</h4>
                    <div className="cart-item__details-qty">
                        <p>{item.quantity}</p>
                    </div>
                    <div className="cart-item__details-price">{item.line_total.formatted_with_symbol}</div>
                </div>
        </div>
    );
};

export default CartItem;

CartItem.propTypes = {
    item: PropTypes.object,
 };