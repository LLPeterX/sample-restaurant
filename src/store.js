import {createStore} from 'redux'
//import * as actions from './actions'
import reducer from './reducers'

//const store = createStore(reducer, actions);
const store = createStore(reducer);
export default store;