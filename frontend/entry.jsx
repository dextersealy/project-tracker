import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import configureStore from './store/store';
import Root from './components/root';

ReactGA.initialize('UA-91159109-3');

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = window.currentUser ? window.currentUser : null;
  delete window.currentUser;

  const pusherKey = (process.env.NODE_ENV === 'production')
    ? '75e079d6bf780b54eea1' : '21bb54ccd4232f234a21';
  const pusher = new Pusher(pusherKey);

  const store = configureStore({session: { currentUser, pusher }});

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
