import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore({
    session: {
      currentUser: window.currentUser ? window.currentUser : null,
      pusher: new Pusher(window.pusherKey ? window.pusherKey : '75e079d6bf780b54eea1')
    }
  });
  delete window.currentUser;
  delete window.pusherKey;

  // BEGIN TEST
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // END TEST

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
