import {createStore} from 'redux';
import reducer from '../reducer';
import {composeWithDevTools} from 'redux-devtools-extension'
// redux4.0版本在调试的时候，redux插件不能用，必须切换到3.7.2版本才行
export default ()=>createStore(reducer,composeWithDevTools())