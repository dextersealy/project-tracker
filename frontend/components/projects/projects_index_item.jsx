import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsIndexItem = ({project}) => {
  return (
    <li>
      <Link className='project-title' to={`/project/${project.id}`}>
        {project.title}
      </Link>
      <div className='project-controls'>
        <Link className='button' to={`/edit_project/${project.id}`}>Edit</Link>
      </div>
    </li>
  );
}

export default ProjectsIndexItem;
