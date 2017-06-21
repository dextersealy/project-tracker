import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

import { fetchProjects, createProject, updateProject } from './util/project_api_util';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session : { currentUser: window.currentUser }};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // BEGIN TEST
  window.fetchProjects = fetchProjects;
  window.createProject = createProject;
  window.updateProject = updateProject;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // END TEST

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
