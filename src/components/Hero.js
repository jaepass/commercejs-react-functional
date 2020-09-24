import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ merchant }) => {
    return (
        <div className="hero">
            <img src="img/logo.svg" alt="Logo" />
            <div className="hero-wrapper__text">
                <h2>Curated to</h2>
                <h2>Your Lifestyle</h2>
                <h1>
                    {merchant.business_name}
                </h1>
                <div className="btn">Shop</div>
            </div>
        </div>
    )
}

export default Hero;


Hero.propTypes = {
    merchant: PropTypes.object,
};