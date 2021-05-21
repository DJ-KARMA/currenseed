import {createStore} from 'redux';
import reducer from '../utils/reducers'

const store = createStore(reducer);
export default store; 