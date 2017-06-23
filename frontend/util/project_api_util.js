export const fetchProjects = () => $.ajax({
  url: '/api/projects'
});

export const fetchProject = id => $.ajax({
  url: `/api/projects/${id}`
});

export const createProject = project => $.ajax({
  method: 'POST',
  url: '/api/projects',
  data: { project },
});

export const updateProject = project => $.ajax({
  method: 'PATCH',
  url: `/api/projects/${project.id}`,
  data: { project },
});

export const deleteProject = project => $.ajax({
  method: 'DELETE',
  url: `/api/projects/${project.id}`
});
