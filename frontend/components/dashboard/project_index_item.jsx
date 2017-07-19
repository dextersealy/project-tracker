import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteProject } from '../../actions/project_actions';

class ProjectIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    return (
      <li className='item' onClick={this.handleClick}>
        {this.renderTitle()}
        {this.renderActions()}
      </li>
    );
  }

  renderTitle() {
    return (
      <div className='title'>{this.props.project.title}</div>
    );
  }

  renderActions() {
    const owner = this.props.project.role === 'owner'
    return (
      <div className='controls'>
        <button type='button' onClick={this.handleClick}>Open</button>
        <button type='button' onClick={this.handleEdit}
          disabled={!owner}>Edit</button>
        <button type='button' onClick={this.handleDelete}
          disabled={!owner}>Delete</button>
      </div>
    );
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.history.push(`/project/${this.props.project.id}`)
  }

  handleEdit(e) {
    e.stopPropagation();
    this.props.history.push(`/projects/edit/${this.props.project.id}`)
  }

  handleDelete(e) {
    e.stopPropagation();
    this.props.deleteProject(this.props.project);
  }
}

const mapDisptachToProps = dispatch => ({
  deleteProject: (project) => dispatch(deleteProject(project))
});

export default withRouter(connect(
  null,
  mapDisptachToProps
)(ProjectIndexItem));
