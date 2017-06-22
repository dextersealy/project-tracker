import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../actions/project_actions';
import ProjectsIndexItem from './projects_index_item';

class ProjectsIndex extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const projects = this.props.projects.map(
      project => <ProjectsIndexItem key={project.id} project={project} />
    );
    return (
      <ul>{projects}</ul>
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
)(ProjectsIndex);
