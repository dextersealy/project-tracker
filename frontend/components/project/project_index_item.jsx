import React from 'react';
import { Link } from 'react-router-dom';

const ProjectIndexItem = ({project}) => {
  return (
    <li className='item'>
      <Link className='title' to={`/projects/${project.id}`}>
        {project.title}
      </Link>
      <div className='controls'>
        <Link className='button' to={`/projects/edit/${project.id}`}>Edit</Link>
      </div>
    </li>
  );
}

export default ProjectIndexItem;
