import {
  RECEIVE_ALL_PROJECTS,
  RECEIVE_PROJECT,
  RECEIVE_DELETE_PROJECT,
} from '../actions/project_actions';

const defaultState = {}

const ProjectsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_PROJECTS:
      return action.projects;

    case RECEIVE_PROJECT: {
      let newState = Object.assign({}, state);
      newState[action.project.id] = action.project;
      return newState;
    }

    case RECEIVE_DELETE_PROJECT: {
      let newState = Object.assign({}, state);
      delete newState[action.project.id];
      return newState;
    }

    default:
      return state;
  }
};

export default ProjectsReducer;
