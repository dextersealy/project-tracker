export const fetchTasks = story => $.ajax({
  url: `/api/stories/${task.story_id}/tasks`,
});

export const createTask = task => $.ajax({
  method: 'POST',
  url: `/api/stories/${task.story_id}/tasks`,
  data: { task },
});

export const updateTask = task => $.ajax({
  method: 'PATCH',
  url: `/api/stories/${task.id}`,
  data: { task },
});

export const deleteTask = task => $.ajax({
  method: 'DELETE',
  url: `/api/stories/${task.id}`,
});