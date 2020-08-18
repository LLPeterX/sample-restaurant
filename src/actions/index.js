const menuLoaded = (newMenu) => ({type:'MENU_LOADED', payload: newMenu});
const menuLoading = () => ({type:'MENU_LOADING'});
export {menuLoaded, menuLoading};
