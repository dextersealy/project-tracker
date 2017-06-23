export const fetchStories = project => $.ajax({
  url: `/api/projects/${project.id}/stories`,
});

export const createStory = (project, story) => $.ajax({
  method: 'POST',
  url: `/api/projects/${project.id}/stories`,
  data: { story },
});

export const updateStory = story => $.ajax({
  method: 'PATCH',
  url: `/api/stories/${story.id}`,
  data: { story },
});

export const deleteStory = story => $.ajax({
  method: 'DELETE',
  url: `/api/stories/${story.id}`,
});
