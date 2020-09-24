import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

class ProductsList extends Component {

    render() {
        const { products } = this.props;

        return (
            <>
                <div className="products">
                    {products.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                            onAddToCart={this.props.handleAddToCart}
                        />
                    ))}
                </div>
            </>
        )
    }
}

export default ProductsList;

ProductsList.propTypes = {
    products: PropTypes.array,
    handleAddToCart: PropTypes.func,
    onAddToCart: PropTypes.func,
};