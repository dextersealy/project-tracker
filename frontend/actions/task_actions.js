import * as APIUtil from '../util/task_api_util';
import { receiveErrors } from './error_actions';

export const RECEIVE_TASK = 'RECEIVE_TASK';
export const RECEIVE_DELETE_TASK = 'RECEIVE_DELETE_TASK';

export const receiveTask = task => ({
  type: RECEIVE_TASK,
  task
});

export const receiveDeleteTask = task => ({
  type: RECEIVE_DELETE_TASK,
  task
});

export const fetchTask = id => dispatch => (
  APIUtil.fetchTask(id)
    .done(task => dispatch(receiveTask(task)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const createTask = task => dispatch => (
  APIUtil.createTask(task)
    .done(task => dispatch(receiveTask(task)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const updateTask = task => dispatch => (
  APIUtil.updateTask(task)
    .done(task => dispatch(receiveTask(task)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const deleteTask = task => dispatch => (
  APIUtil.deleteTask(task)
    .done(() => dispatch(receiveDeleteTask(task)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const removeTask = task => dispatch => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(receiveDeleteTask(task)))
  });
}
