import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import leadsReducer from './leads';


const reducer = combineReducers({
  leadsReducer: leadsReducer
})

export default createStore(
  reducer,
  applyMiddleware(reduxPromiseMiddleware)
);