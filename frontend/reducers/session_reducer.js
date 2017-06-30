import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const defaultState = { currentUser: null, pusher: null };

const SessionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { currentUser: action.user });
    default:
      return state;
  }
};

export default SessionReducer;
