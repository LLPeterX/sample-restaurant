const initalState = { menu: [] };

const reducer = (state=initalState, action) => {
  switch(action.type) {
    case 'MENU_LOADED':
      return {menu: action.payload};
    default:
      return state;  


  }
}

export default reducer;