import React from 'react'
import { Link, Route } from 'react-router-dom';
import Header from '../util/header';
import ProjectIndex from './project_index';
import ProjectForm from './project_form';

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
        {this.renderHeading()}
        {this.renderIndex()}
      </div>
    );
  }

  renderHeading() {
    return (
      <div className='heading'>
        <h2>Projects</h2>
        <Link className='button' to='/projects/new'>Create Project</Link>
      </div>
    );
  }

  renderIndex() {
    return(
      <div className='body'>
        <ProjectIndex/>
        <Route path='/projects/new' component={ProjectForm} />
        <Route path='/projects/edit/:id' component={ProjectForm} />
      </div>
    );
  }
}

export default Dashboard;
