import { combineReducers } from 'redux';
import session from './session_reducer';
import errors from './errors_reducer';
import projects from './projects_reducer';
import stories from './stories_reducer';
import users from './users_reducer';

const rootReducer = combineReducers({
  session,
  errors,
  projects,
  stories,
  users,
});

export default rootReducer;
