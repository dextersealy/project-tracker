export const signup = user => $.ajax({
  method: 'POST',
  url: '/api/users',
  data: { user }
});

export const login = ({email, password}) => $.ajax({
  method: 'POST',
  url: '/api/session',
  data: { user: { email, password }}
});

export const logout = () => $.ajax({
  method: 'DELETE',
  url: '/api/session'
});
