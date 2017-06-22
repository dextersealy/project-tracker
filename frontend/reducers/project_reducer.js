import {
  RECEIVE_ALL_PROJECTS,
  RECEIVE_PROJECT,
  RECEIVE_DELETE_PROJECT,
} from '../actions/project_actions';

const defaultState = {}

const ProjectReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = state;

  switch (action.type) {
    case RECEIVE_ALL_PROJECTS:
      newState = action.projects;
      break;

    case RECEIVE_PROJECT:
      newState = Object.assign({}, state);
      newState[action.project.id] = action.project;
      break;

    case RECEIVE_DELETE_PROJECT:
      newState = Object.assign({}, state);
      delete newState[action.project.id];
      break;
  }

  return newState;
};

export default ProjectReducer;
