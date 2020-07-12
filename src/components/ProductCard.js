import React, { Component } from "react";

class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    handleAddToCart() {
        this.props.onAddToCart(this.props.product);
    }

    render() {
        const { product } = this.props
        const reg = /(<([^>]+)>)/gi;
      
        return (
          <div className="card my-5 border-0">
            <img className="card-img-top" src={product.media.source} alt={product.name} />
            <h3 className="title text-center card-title display-5 pt-4">{product.name}</h3>
            <p className="description text-center card-text display-5">
              {(product.description || "").replace(reg, "")}
            </p>
            <p className="text-center text-muted card-subtitle display-5 price">
              {product.price.formatted_with_symbol}
            </p>
            <button 
                className="add-btn"
                onClick={this.handleAddToCart}
            >
                Add to cart
            </button>
          </div>
        );
    }
  };


export default ProductCard;
