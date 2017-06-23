export const currentProject = (state, {match}) => {
  return match.params.id ? state.projects[match.params.id] : null;
}
