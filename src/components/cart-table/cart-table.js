import React from 'react';
import { connect } from 'react-redux'
import { deleteFromCart } from '../../actions'
import './cart-table.scss';

const CartTable = ({ items, deleteFromCart }) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.sort((a,b)=>b.id-a.id).map(item => {
                        return (
                            <div className="cart__item" key={item.id}>
                                <img src={item.url} className="cart__item-img" alt={item.title}></img>
                                <div className="cart__item-title">{item.title}</div>
                                <div className="cart__item-price">{item.quantity} X {item.price}$</div>
                                <div className="cart__close" onClick={() => deleteFromCart(item.id)}>&times;</div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        items: state.selectedItems
    }
}

const mapDispatchToProps = {
    deleteFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);