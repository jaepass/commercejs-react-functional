import React, { useState } from 'react';
import Cart from './Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingBag, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faShoppingBag, faTimes);

const CartNav = ({ cart, onRemoveFromCart }) => {
    const [isCartVisible, setCartVisible] = useState(false);

    return (
        <div className="nav">
            <div className="nav__cart" onClick={() => setCartVisible(!isCartVisible)}>
                {!isCartVisible ? (
                <button className="nav__cart-open">
                    <FontAwesomeIcon size="2x" icon="shopping-bag" color="#292B83"/>
                    {cart !== null ? <span>{cart.total_items}</span> : ''}
                </button>
                ) : (
                    <button className="nav__cart-close">
                    <FontAwesomeIcon size="1x" icon="times" color="white"/>
                    </button>
                )}
            </div>
        {isCartVisible &&
            <Cart
                cart={cart}
                onRemoveFromCart={onRemoveFromCart}
            />
        }  
        </div>
    )
}

export default CartNav;