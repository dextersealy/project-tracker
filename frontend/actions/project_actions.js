import * as APIUtil from '../util/project_api_util';
import { receiveErrors } from './session_actions';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";

const receiveProjects = projects => ({
  type: RECEIVE_PROJECTS,
  projects
});

const receiveProject = project => ({
  type: RECEIVE_PROJECT,
  project
});

export const fetchProjects = () => {
  return (dispatch) => {
    return APIUtil.fetchProjects()
      .done(projects => dispatch(receiveProjects(projects)))
      .fail(errors => receiveErrors(errors))
  }
};

export const createProject = (project) => {
  return (dispatch) => {
    return APIUtil.createProject(project)
      .done(project => dispatch(receiveProject(project)))
      .fail(errors => receiveErrors(errors))
  }
}

export const updateProject = (project) => {
  return (dispatch) => {
    return APIUtil.updateProject(project)
      .done(project => dispatch(receiveProject(project)))
      .fail(errors => receiveErrors(errors))
  }
}
