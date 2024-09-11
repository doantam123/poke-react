import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import pokesReducer from './reducers/pokesReducer';
import pokeDetailReducer from './reducers/pokeDetailReducer';


const rootReducer = combineReducers({
    pokes: pokesReducer,
    pokeDetail: pokeDetailReducer,
  });
  
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
