import { RECEIVE_PROJECT } from '../actions/project_actions';

const defaultState = {}

const UsersReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECT:
      return action.members || defaultState;
    default:
      return state;
  }
};

export default UsersReducer;
