import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

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
  // END TEST

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
