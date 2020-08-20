import { combineReducers } from 'redux';
import layoutReducer from './layoutReducer';
import formReducer from './formReducer';
import goodsListReducer from './goodListReducer';

export default combineReducers({
    form: formReducer,
    layout: layoutReducer,
    goodsList: goodsListReducer,
})