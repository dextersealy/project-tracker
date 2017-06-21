import * as APIUtil from '../util/project_api_util';
import { receiveErrors } from './session_actions';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';

const receiveProjects = (projects) => ({
  type: RECEIVE_PROJECTS,
  projects
});

export const fetchProjects = () => {
  return (dispatch) => {
    return APIUtil.fetchProjects()
      .done(projects => dispatch(receiveProjects(projects)))
      .fail(errors => receiveErrors(errors))
  }
};
