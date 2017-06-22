import { combineReducers } from 'redux';
import session from './session_reducer';
import projects from './project_reducer';

const rootReducer = combineReducers({
  session,
  projects,
});

export default rootReducer;
