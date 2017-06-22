import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS
} from '../actions/session_actions';

const defaultState = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = state;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = { currentUser: action.user, errors: [] };
      break;

    case RECEIVE_ERRORS:
      newState = Object.assign({}, state);
      newState.errors = action.errors;
      break;
  }

  return newState;
};

export default SessionReducer;
