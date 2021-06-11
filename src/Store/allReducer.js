import {combineReducers} from 'redux';
import Global from './GlobalReducer';
import Home from '../Screen/Home/Redux/reducer';

export const allReducers = combineReducers({
  Global,
  Home,
});
