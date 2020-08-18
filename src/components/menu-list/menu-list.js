import React, { Component } from 'react';
import MenuListItem from '../menu-list-item';
import { connect } from 'react-redux'
import WithRestoService from '../hoc'
import { menuLoaded, menuLoading } from '../../actions'
import './menu-list.scss';
import Spinner from '../spinner'

class MenuList extends Component {

    componentDidMount() {
        const { RestoService, menuLoaded, menuLoading } = this.props;
        menuLoading(); // показываем сначала спиннер
        RestoService.getMenuItems().then(res => {
            menuLoaded(res);
        });
    }

    render() {
        const { menuItems, isLoading } = this.props;
        if(isLoading) {
            return <Spinner/>
        }
        return (
            <ul className="menu__list">
                {menuItems.map(item => <MenuListItem menuItem={item} key={item.id} />)}
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return ({
        menuItems: state.menu,
        isLoading: state.isLoading
    });
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         menuLoaded: (newMenu) => dispatch(menuLoaded(newMenu))
//     }
// }

const mapDispatchToProps = { menuLoaded, menuLoading }

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));