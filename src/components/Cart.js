import React from 'react';

const Cart = () => {
    return (
        <div className="cart">
            <h4 className="cart__heading">Your Shopping Cart</h4>
            { this.renderEmptyCart() }
            { this.renderCart() }
        </div>
    )
}

export default Cart;