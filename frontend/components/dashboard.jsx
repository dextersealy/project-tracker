import React from 'react'
import Header from './util/header';
import ProjectsIndex from './projects/projects_index';

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <div className='heading'>
        <h2>Projects</h2>
        <button>Create Project</button>
      </div>
      <ProjectsIndex/>
    </div>
  )
}

export default Dashboard;
