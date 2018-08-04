import { combineReducers } from 'redux'
import counter from './counter';
import boardState from './boardState';

export default combineReducers({
  counter,
  boardState
})
