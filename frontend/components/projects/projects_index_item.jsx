import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsIndexItem = ({project}) => {
  return (
    <li className='item'>
      <Link className='title' to={`/project/${project.id}`}>
        {project.title}
      </Link>
      <div className='controls'>
        <Link className='button' to={`/edit_project/${project.id}`}>Edit</Link>
      </div>
    </li>
  );
}

export default ProjectsIndexItem;
