export const selectProject = (state, {match}, defaultProject = null) => {
  return match.params.id ? state.projects[match.params.id] : defaultProject;
}

export const selectUser = (state, user_id) => {
  return state.users[user_id] || {};
}

export const selectStories = (state, project) => {
  let stories = {};
  if (project && state.stories) {
    Object.keys(state.stories).forEach(key => {
      const story = state.stories[key];
      if (story.project_id === project.id) {
        stories[key] = story;
      }
    });
  }
  return stories;
}
