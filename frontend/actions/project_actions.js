import * as APIUtil from '../util/project_api_util';
import { receiveErrors } from './error_actions';

export const RECEIVE_ALL_PROJECTS = 'RECEIVE_ALL_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const RECEIVE_DELETE_PROJECT = 'RECEIVE_DELETE_PROJECT';

const receiveProjects = projects => ({
  type: RECEIVE_ALL_PROJECTS,
  projects
});

const receiveProject = ({project, stories, members}) => ({
  type: RECEIVE_PROJECT,
  project,
  stories,
  members,
});

const receiveDeleteProject = project => ({
  type: RECEIVE_DELETE_PROJECT,
  project
});

export const fetchProjects = () => dispatch => (
  APIUtil.fetchProjects()
    .done(projects => dispatch(receiveProjects(projects)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const fetchProject = (id) => dispatch => (
  APIUtil.fetchProject(id)
    .done(project => dispatch(receiveProject(project)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const createProject = project => dispatch => (
  APIUtil.createProject(project)
    .done(project => dispatch(receiveProject(project)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const updateProject = project => dispatch => (
  APIUtil.updateProject(project)
    .done(project => dispatch(receiveProject(project)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const deleteProject = project => dispatch => (
  APIUtil.deleteProject(project)
    .done(() => dispatch(receiveDeleteProject(project)))
    .fail(errors => dispatch(receiveErrors(errors)))
);
