import { combineReducers } from 'redux';
import pokesReducer from './pokesReducer';

const rootReducer = combineReducers({
  pokes: pokesReducer,
});

export default rootReducer;