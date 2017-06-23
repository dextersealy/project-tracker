import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './error_reducer';
import projects from './project_reducer';

const rootReducer = combineReducers({
  session,
  errors,
  projects,
});

export default rootReducer;
