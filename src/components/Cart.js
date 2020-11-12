import React from 'react';
import CartItem from './CartItem';
import PropTypes from 'prop-types';

const Cart = ({ cart, onRemoveFromCart }) => {

    const renderEmptyCart = () => {
        if (cart.total_unique_items > 0) {
          return;
        }
    
        return (
          <p className="cart__none">
            You have no items in your shopping cart, start adding some!
          </p>
        );
    }

    const renderCart = () => {
        return (
            <>
              {cart.line_items.map(lineItem => (
                <CartItem
                  item={lineItem}
                  onRemoveFromCart={onRemoveFromCart}
                  key={lineItem.id}
                  className="cart__inner"
                />
              ))}
              <div className="cart__total">
                <p className="cart__total-title">Subtotal:</p>
                <p className="cart__total-price">{cart.subtotal.formatted_with_symbol}</p>
              </div>
            </>
        );
    }

    return (
        <div className="cart">
            <h4 className="cart__heading">Your Shopping Cart</h4>
            { renderEmptyCart() }
            { renderCart() }
        </div>
    )
}

export default Cart;

Cart.propTypes = {
    cart: PropTypes.object,
 };