import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../actions/project_actions';

class ProjectIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteProject(this.props.project);
  }

  render() {
    const { project } = this.props;
    return (
      <li className='item'>
        <Link className='title' to={`/project/${project.id}`}>
          {project.title}
        </Link>
        <div className='controls'>
          <Link className='button' to={`/projects/edit/${project.id}`}>Edit</Link>
          <button type='button' onClick={this.handleDelete}>Delete</button>
        </div>
      </li>
    );
  }
}

const mapDisptachToProps = dispatch => ({
  deleteProject: (project) => dispatch(deleteProject(project))
});

export default connect(
  null,
  mapDisptachToProps
)(ProjectIndexItem);
