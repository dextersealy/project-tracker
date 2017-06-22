import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../actions/project_actions';
import ProjectIndexItem from './project_index_item';

class ProjectIndex extends React.Component {

  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const projects = this.props.projects.map(
      project => <ProjectIndexItem key={project.id} project={project} />
    );
    return (
      <ul className='index'>{projects}</ul>
    );
  }
};

const mapStateToProps = state => ({
  projects: Object.keys(state.projects).map(id => state.projects[id])
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: () => dispatch(fetchProjects())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectIndex);
