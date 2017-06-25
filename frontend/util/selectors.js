export const selectProject = (state, {match}, defaultProject = null) => {
  return match.params.id ? state.projects[match.params.id] : defaultProject;
}

export const selectUser = (state, user_id) => {
  return state.users[user_id] || {};
}
