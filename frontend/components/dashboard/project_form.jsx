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

    this.state = { title: props.project.title }
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

  componentWillReceiveProps(newProps) {
    if (newProps.project && this.props.project.id !== newProps.project.id) {
      this.setState({ title: newProps.project.title });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { isNew } = this.props;
    const project = Object.assign({}, this.props.project, this.state);
    this.props.submit(project).then(resp => {
      this.props.history.push(isNew
        ? `/project/${resp.project.id}`
        : '/projects'
      );
    });
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push('/projects');
  }

  render() {
    const { isNew, project } = this.props;
    if (!(isNew || (project && project.id))) {
      return(
        <Redirect to='/projects'/>
      );
    }

    const { title } = this.state;
    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <h2>{isNew ? 'Create a new project' : 'Edit project'}</h2>
        <div className='form-body'>
          <label htmlFor='title'>Project Name</label>
          <input
            id='title'
            ref={instance => this.textInput = instance }
            onChange={this.handleChange('title')}
            placeholder='Enter a name for your project'
            value={title} />
        </div>
        <ErrorMsg msg={this.props.error}/>
        <div className='form-footer'>
          <button type='button' onClick={this.handleCancel}>Cancel</button>
          <button type='submit' disabled={!this.state.title}>
            {isNew ? 'Create Project' : 'Save'}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    project: selectProject(state, ownProps, {}),
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
