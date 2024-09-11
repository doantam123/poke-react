import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import pokesReducer from './reducers/pokesReducer';
import pokeDetailReducer from './reducers/pokeDetailReducer';
import searchReducer from './reducers/searchReducer';


const rootReducer = combineReducers({
    pokes: pokesReducer,
    pokeDetail: pokeDetailReducer,
    search: searchReducer,
  });
  
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
