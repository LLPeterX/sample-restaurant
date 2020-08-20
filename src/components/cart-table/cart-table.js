import React from 'react';
import { connect } from 'react-redux'
import { deleteFromCart, addedToCart, changeCart } from '../../actions'
import WithRestoService from '../hoc'
import './cart-table.scss';
import './my.css';


const CartTable = ({ RestoService, items, deleteFromCart, addedToCart, cartChanged, changeCart }) => {
    if (items.length === 0) {
        return (<div className="cart__title"> Ваша корзина пуста :( </div>)
    }
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
                                <div className="cart__item-price" onClick={() => {
                                    addedToCart(item);
                                    changeCart(true);
                                }}>{item.quantity} X {item.price}$</div>
                                <div className="cart__close" onClick={() => {
                                    deleteFromCart(item.id);
                                    changeCart(true);
                                }}>&times;</div>
                            </div>
                        );
                    })
                }
                {
                    cartChanged && items && items.length > 0 &&
                    <div className="cart__button save_button" onClick={() => {
                        RestoService.setOrder(items);
                        changeCart(false);
                    }}>
                        Сохранить
                    </div>
                }

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
        items: state.selectedItems,
        cartChanged: state.cartChanged
    }
}

const mapDispatchToProps = {
    deleteFromCart,
    addedToCart,
    changeCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));