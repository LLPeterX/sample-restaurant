import React from 'react';
import { Link } from 'react-router-dom'
import cartIcon from './shopping-cart-solid.svg';
import { connect } from 'react-redux'
import './app-header.scss';

const AppHeader = ({ totalPrice }) => {
    return (
        <header className="header">
            <Link to="/" className="header__link">
                Menu
            </Link>
            <Link to="/cart" className="header__link">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {totalPrice} $
            </Link>
        </header>
    )
};

const mapStateToProps = (state) => {
    return {
        totalPrice: state.totalPrice
    }
}
export default connect(mapStateToProps,{})(AppHeader);