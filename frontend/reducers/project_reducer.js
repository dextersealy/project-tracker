import {
  RECEIVE_PROJECTS,
  RECEIVE_PROJECT,
} from '../actions/project_actions';

const defaultState = {}

const ProjectReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECTS:
      return action.projects;

    case RECEIVE_PROJECT:
      const newState = Object.assign({}, state);
      newState[action.project.id] = action.project;
      return newState;

    default:
      return state;
  }
};

export default ProjectReducer;
