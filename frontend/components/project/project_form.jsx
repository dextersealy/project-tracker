import React from 'react';
import { connect } from 'react-redux';
import { createProject, updateProject } from '../../actions/project_actions';
import { Redirect } from 'react-router-dom';

const emptyState = {
  title: '',
};

class ProjectsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, emptyState, props.project);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.project.id !== newProps.project.id) {
      this.setState(Object.assign({}, emptyState, newProps.project));
    }
  }

  handleChange(field) {
    return (e) => {
      const newState = Object.assign({}, this.state);
      newState[field] = e.currentTarget.value;
      this.setState(newState);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state)
      .then(() => this.props.history.push('/projects'));
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.goBack();
  }

  render() {
    const isNew = this.props.isNew;
    if (!(isNew || this.props.project.id)) {
      return(
        <Redirect to='/projects'/>
      );
    }

    const {title} = this.state;
    return (
      <form className='project-form' onSubmit={this.handleSubmit}>
        <h2>{isNew ? "Create New Project" : "Edit Project"}</h2>
        <div className='project-form-body'>
          <input
            onChange={this.handleChange("title")}
            placeholder='project title'
            value={title} />
        </div>
        <div className='project-form-footer'>
          <button onClick={this.handleCancel}>Cancel</button>
          <button>Save</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const project = state.projects[id];
  return { project: project ? project : {} };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const isNew = Boolean(ownProps.match.path.match(/new/));
  const callback = isNew ? createProject : updateProject;
  return { isNew, submit: (project) => dispatch(callback(project)) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsForm);
