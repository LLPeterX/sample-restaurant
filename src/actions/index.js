const menuLoaded = (newMenu) => ({type:'MENU_LOADED', payload: newMenu});
const menuLoading = () => ({type:'MENU_LOADING'});
const addedToCart = (item) => ({type:'ADDED_TO_CART', payload: item});
const deleteFromCart = (id) => ({type:'DELETE_FROM_CART', payload: id});
const changeCart = (isChanged) => ({type:'CART_CHANGED', payload: isChanged});
export {menuLoaded, menuLoading, addedToCart, deleteFromCart, changeCart};
