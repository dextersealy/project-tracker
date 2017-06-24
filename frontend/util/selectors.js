export const selectCurrentProject = (state, {match}, defaultProject = null) => {
  return match.params.id ? state.projects[match.params.id] : defaultProject;
}

export const selectUserInitials = (state, user_id) => {
  return state.users[user_id] && state.users[user_id].initials;
}
