const initalState = { menu: [], isLoading: true };

const reducer = (state=initalState, action) => {
  console.log('reducer:',state);
  switch(action.type) {
    case 'MENU_LOADED':
      return {...state, menu: action.payload, isLoading: false};
    case 'MENU_LOADING':
      return {...state, isLoading: true}
    default:
      return state;  


  }
}

export default reducer;