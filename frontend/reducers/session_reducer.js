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
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.user, errors: [] };

    case RECEIVE_ERRORS:
      const newState = Object.assign({}, state);
      newState.errors = action.errors;
      return newState;

    default:
      return state;
  }
};

export default SessionReducer;
