export const signup = (user) => {
  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  });
};

export const login = ({email, password}) => {
  return $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user: { email, password }}
  });
};

export const logout = () => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/session'
  });
};
