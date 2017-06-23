import * as APIUtil from '../util/session_api_util';
import { receiveErrors } from './error_actions.js';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const login = user => dispatch => (
  APIUtil.login(user)
    .done(user => dispatch(receiveCurrentUser(user)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const signup = user => dispatch => (
  APIUtil.signup(user)
    .done(user => dispatch(receiveCurrentUser(user)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const logout = () => dispatch => (
  APIUtil.logout()
    .done(() => dispatch(receiveCurrentUser(null)))
    .fail(errors => dispatch(receiveErrors(errors)))
);
