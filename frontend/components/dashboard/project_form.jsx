import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as FormUtil from '../../util/form_util';
import { createProject, updateProject } from '../../actions/project_actions';
import { clearErrors } from '../../actions/error_actions';
import ErrorMsg from '../util/error';

const emptyState = {
  title: '',
};

class ProjectsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, emptyState, props.project);
    this.handleChange = FormUtil.handleChange().bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.title.focus();
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.project.id !== newProps.project.id) {
      this.setState(Object.assign({}, emptyState, newProps.project));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state)
      .then(() => this.props.history.push('/projects'));
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push('/projects');
  }

  render() {
    const isNew = this.props.isNew;
    if (!(isNew || this.props.project.id)) {
      return(
        <Redirect to='/projects'/>
      );
    }

    const {title} = this.state;
    const errorMsg = this.props.errors[0];
    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <h2>{isNew ? "Create a new project" : "Edit project"}</h2>
        <div className='form-body'>
          <label htmlFor='title'>Project Name</label>
          <input
            id='title'
            ref={input => this.title = input }
            onChange={this.handleChange("title")}
            placeholder='Enter a name for your project'
            value={title} />
        </div>
        <ErrorMsg msg={errorMsg}/>
        <div className='form-footer'>
          <button type="button" onClick={this.handleCancel}>Cancel</button>
          <button type='submit' disabled={!this.state.title}>Save</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const project = state.projects[id];
  return {
    project: project ? project : {},
    errors: state.errors,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const isNew = Boolean(ownProps.match.path.match(/new/));
  const callback = isNew ? createProject : updateProject;
  return {
    isNew,
    submit: project => dispatch(callback(project)),
    clearErrors: () => dispatch(clearErrors()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsForm);
