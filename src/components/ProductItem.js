import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ product, onAddToCart }) => {

  // dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser
  // DOM. In general, setting HTML from code is risky because it’s easy to inadvertently expose
  // your users to a cross-site scripting (XSS) attack. So, you can set HTML directly from React,
  // but you have to type out dangerouslySetInnerHTML and pass an object with a __html
  // key, to remind yourself that it’s dangerous.
  const description = {__html: product.description};

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  }

  return (
    <div className="product">
      <img className="product__image" src={product.media.source} alt={product.name} />
      <div className="product__info">
        <h4 className="product__name">{product.name}</h4>
        <p className="product__description" dangerouslySetInnerHTML={description}></p>
        <div className="product__details">
          <p className="product__price">
            {product.price.formatted_with_symbol}
          </p>
          <button
            name="Add to cart"
            className="product__btn"
            onClick={handleAddToCart}
          >
            Quick add
          </button>
        </div>
      </div>
    </div> 
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
