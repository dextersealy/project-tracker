export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors: errors.hasOwnProperty('responseJSON') ? errors.responseJSON : errors
});

export const clearErrors = () => receiveErrors([]);
export const reportError = error => receiveErrors([error]);
