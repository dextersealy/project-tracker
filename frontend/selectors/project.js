export const currentProject = (state, {match}, none = null) => {
  return match.params.id ? state.projects[match.params.id] : none;
}
