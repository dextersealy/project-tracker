import { combineReducers } from 'redux';
import session from './session_reducer';

const rootReducer = combineReducers({
  session,
});

export default rootReducer;
