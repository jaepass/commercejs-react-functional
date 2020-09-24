import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ merchant }) => {
    return (
        <div className="hero">
            <img src="img/logo.svg" alt="Logo" />
            <div className="hero__text">
                <h1>
                    {merchant.business_name}
                </h1>
                <a href="#products" className="btn">Shop</a>
            </div>
        </div>
    )
}

export default Hero;


Hero.propTypes = {
    merchant: PropTypes.object,
};