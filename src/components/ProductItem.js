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
            <div className="card__details p-4">
                <h4 className="card__details-title text-center display-5 pt-2">{product.name}</h4>
                <p className="text-center card-text display-5 pt-2">
                {(product.description || "").replace(reg, "")}
                </p>
                <div className="card__details-footer d-flex pt-2">
                    <p className="text-center display-5 price">
                    {product.price.formatted_with_symbol}
                    </p>
                    <button
                        onClick={this.handleAddToCart}
                    >
                        Quick add
                    </button>
                </div>
            </div>
          </div>
        );
    }
  };


export default ProductCard;
