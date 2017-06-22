import React from 'react'
import Header from './util/header';
import ProjectsIndex from './projects/projects_index';

class Dashboard extends React.Component {

  componentDidMount() {
    document.body.classList.toggle('dash', true);
  }

  componentWillUnmount() {
    document.body.classList.toggle('dash', false);
  }

  render() {
    return (
      <div className='dashboard'>
        <Header/>
        <div className='heading'>
          <h2>Projects</h2>
          <button>Create Project</button>
        </div>
        <ProjectsIndex/>
      </div>
    );
  }
}

export default Dashboard;
