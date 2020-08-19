import React from 'react';
import { connect } from 'react-redux'
import { deleteFromCart, addedToCart } from '../../actions'
import './cart-table.scss';


const CartTable = ({ items, deleteFromCart, addedToCart }) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    items.sort(sortFunc).map(item => {
                        return (
                            <div className="cart__item" key={item.id}>
                                <img src={item.url} className="cart__item-img" alt={item.title}></img>
                                <div className="cart__item-title">{item.title}</div>
                                <div className="cart__item-price" onClick={() => addedToCart(item)}>{item.quantity} X {item.price}$</div>
                                <div className="cart__close" onClick={() => deleteFromCart(item.id)}>&times;</div>
                            </div>
                        );
                    })
                }
                <div className="cart__button">
                    Сохранить
                </div>

            </div>
        </>
    );
};

// функция сортировки: сначала по категории, потом по id
function sortFunc(a, b) {
    if (b.category > a.category) {
        return 1;
    }
    if (b.category < a.category) {
        return -1;
    }
    return b.id - a.id;
}


const mapStateToProps = (state) => {
    return {
        items: state.selectedItems
    }
}

const mapDispatchToProps = {
    deleteFromCart,
    addedToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);