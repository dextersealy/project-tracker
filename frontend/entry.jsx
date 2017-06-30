import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore({
    session: {
      currentUser: window.currentUser ? window.currentUser : null,
      pusher: new Pusher('21bb54ccd4232f234a21')
    }
  });
  delete window.currentUser;

  // BEGIN TEST
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // END TEST

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
