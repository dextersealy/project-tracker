import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

const configureStore = (preloadedState = {}) => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  return createStore(rootReducer, preloadedState,
    applyMiddleware(...middlewares));
};

export default configureStore;
