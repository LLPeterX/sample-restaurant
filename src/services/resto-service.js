import React from 'react'
import store from '../store'

class RestoService extends React.Component{
  constructor() {
    super();
    this._apiBase = "http://localhost:3000";
  }
  getMenuItems() {
    fetch(this._apiBase+"/menu")
    .then(res => res.json())
    .then(menu => {
      // теперь надо задипатчить action {type: 'MENU_LOADED', payload: menu}
      store.dispatch({type: 'MENU_LOADED', payload: menu});
    });
    
  }
}

export default RestoService;