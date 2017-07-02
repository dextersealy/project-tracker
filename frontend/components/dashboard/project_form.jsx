import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as FormUtil from '../../util/form_util';
import { createProject, updateProject } from '../../actions/project_actions';
import { clearErrors } from '../../actions/error_actions';
import { selectProject } from '../../util/selectors';
import ErrorMsg from '../util/error';

class ProjectsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.project;
    this.handleChange = FormUtil.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.textInput.focus();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentWillReceiveProps({ project }) {
    if (this.state.id !== project.id) {
      this.setState(project);
    }
  }

  render() {
    const { isNew, project } = this.props;
    const exists = Boolean(project.id) || isNew;
    if (!exists) {
      return(
        <Redirect to='/projects'/>
      );
    }

    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <h2>{isNew ? 'Create a new project' : 'Edit project'}</h2>
        {this.renderInputs()}
        <ErrorMsg msg={this.props.error}/>
        {this.renderActions()}
      </form>
    );
  }

  renderInputs() {
    return (
      <div className='form-body'>
        <label htmlFor='title'>Project Name</label>
        <input
          id='title'
          ref={instance => this.textInput = instance }
          onChange={this.handleChange('title')}
          placeholder='Enter a name for your project'
          value={this.state.title} />
      </div>
    );
  }

  renderActions() {
    return (
      <div className='form-footer'>
        <button type='button' onClick={this.handleCancel}>Cancel</button>
        <button type='submit' disabled={!this.state.title}>
          {this.props.isNew ? 'Create Project' : 'Save'}
        </button>
      </div>
    );
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push('/projects');
  }

  handleSubmit(e) {
    e.preventDefault();
    const { isNew } = this.props;
    this.props.submit(this.state).then(resp => {
      this.props.history.push(isNew
        ? `/project/${resp.project.id}`
        : '/projects'
      );
    });
  }
}

const emptyProject = {title: ''};

const mapStateToProps = (state, ownProps) => ({
  project: selectProject(state, ownProps) || emptyProject,
  error: state.errors[0],
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const isNew = Boolean(ownProps.match.path.match(/new/));
  const submit = isNew ? createProject : updateProject;
  return {
    isNew,
    submit: project => dispatch(submit(project)),
    clearErrors: () => dispatch(clearErrors()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsForm);
