import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

import { fetchProjects } from './actions/project_actions';
import { fetchStories } from './actions/story_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    store = configureStore({ session : { currentUser: window.currentUser }});
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // BEGIN TEST
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchProjects = fetchProjects;
  window.fetchStories = fetchStories;
  // END TEST

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
