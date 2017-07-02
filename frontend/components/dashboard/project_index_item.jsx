import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProject } from '../../actions/project_actions';

class ProjectIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <li className='item'>
        {this.renderTitle()}
        {this.renderActions()}
      </li>
    );
  }

  renderTitle() {
    const { project } = this.props;
    return (
      <Link className='title' to={`/project/${project.id}`}>
        {project.title}
      </Link>
    );
  }

  renderActions() {
    const { project } = this.props;
    return (
      <div className='controls'>
        <Link className='button' to={`/projects/edit/${project.id}`}>Edit</Link>
        <button type='button' onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteProject(this.props.project);
  }
}

const mapDisptachToProps = dispatch => ({
  deleteProject: (project) => dispatch(deleteProject(project))
});

export default connect(
  null,
  mapDisptachToProps
)(ProjectIndexItem);
