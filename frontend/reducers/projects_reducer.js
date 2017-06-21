import {
  RECEIVE_PROJECTS,
} from '../actions/project_actions';

const defaultState = {}

const ProjectsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECTS:
      return action.projects;

    default:
      return state;
  }
};

export default ProjectsReducer;
