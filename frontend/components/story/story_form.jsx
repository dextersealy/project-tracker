import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as FormUtil from '../../util/form_util';
import * as StoryUtil from './story_util';
import { selectUser } from '../../util/selectors';
import { clearErrors } from '../../actions/error_actions';
import { fetchStory } from '../../actions/story_actions';
import { addTask } from '../../actions/task_actions';
import ErrorMsg from '../util/error';
import {
  createStory,
  updateStory,
  deleteStory,
  removeStory,
} from '../../actions/story_actions';

import StoryTitle from './story_form_title';
import StoryActions from './story_form_actions';
import StoryKind from './story_form_kind';
import StoryPoints from './story_form_points';
import StoryState from './story_form_state';
import StoryRequester from './story_form_requester';
import StoryDescription from './story_form_description';
import StoryTasks from './story_form_tasks';

class StoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.story;
    this.handleChange = FormUtil.handleChange.bind(this);
    this.handleCaret = this.handleCaret.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleWorkflowAction = this.handleWorkflowAction.bind(this);
    this.id = `${Math.random() * 1e6}`;
  }

  componentDidMount() {
    const { story } = this.props;
    if (!StoryUtil.isNew(story)) {
      this.props.fetchStory(story.id);
    }
  }

  componentWillReceiveProps(newProps) {
    this.state = newProps.story;
  }

  componentWillUnmount() {
    if (this.props.errorMsg) {
      this.props.clearErrors();
    }
  }

  render() {
    const { errorMsg } = this.props;
    return (
      <div className='story-form' onDoubleClick={this.handleDoubleClick}>
        {this.renderTitle()}
        <ErrorMsg msg={errorMsg}/>
        {this.renderActions()}
        <div className='story-options-section'>
          {this.renderKind()}
          {this.renderPoints()}
          {this.renderState()}
          {this.renderRequester()}
        </div>
        {this.renderDescription()}
        {this.renderTasks()}
      </div>
    );
  }

  renderTitle() {
    return (
      <StoryTitle
        story={this.state}
        handleCaret={this.handleCaret}
        handleChange={this.handleChange('title')}
        />
    );
  }

  renderActions() {
    return (
      <StoryActions
        story={this.state}
        handleDelete={this.handleDelete}
        handleSave={this.handleSave}
        />
    );
  }

  renderKind() {
    return (
      <StoryKind
        story={this.state}
        handleMenu={this.handleMenu('kind')}
        />
    );
  }

  renderPoints() {
    return (
      <StoryPoints
        story={this.state}
        handleMenu={this.handleMenu('points')}/>
    );
  }

  renderState() {
    return (
      <StoryState
        story={this.state}
        handleMenu={this.handleMenu('state')}
        handleAction={this.handleWorkflowAction}
        />
    );
  }

  renderRequester() {
    return (
      <StoryRequester
        story={this.props}
        />
    );
  }

  renderDescription() {
    return (
      <StoryDescription
        story={this.state}
        handleChange={this.handleChange('description')}
        />
    );
  }

  renderTasks() {
    return(
      <StoryTasks
        story={this.state}
        form_id={this.id}
        handleAdd={this.handleAddTask}
        handleChange={this.handleTaskChange}
        />
    );
  }

  handleCaret(e) {
    const { story, remove } = this.props;
    if (StoryUtil.isNew(story) && StoryUtil.isEmpty(this.state)) {
      remove(story);
    } else {
      this.handleSave(e)
    }
  }

  handleDoubleClick(e) {
    if (Object.is(e.target, e.currentTarget)) {
      this.handleCaret(e)
    }
  }

  handleMenu(field) {
    return (value, e) => {
      this.setState(prevState => (
        Object.assign({}, prevState, {[field]: value})
      ));
    };
  }

  handleTaskChange({ id }) {
    return function (field, value) {
      const newState = _.merge({}, this.state);
      newState.tasks[id][field] = value;
      this.setState(newState)
    }.bind(this);
  }

  handleSave(e) {
    const { story, commit, remove, handleClose } = this.props;
    commit(this.state).then(() => {
      if (StoryUtil.isNew(story)) {
        remove(story);
      } else {
        handleClose(e)
      }
    });
  }

  handleDelete(e) {
    this.props.remove(this.props.story);
  }

  handleAddTask(e) {
    this.props.addTask(StoryUtil.initTask({
      id: this.id,
      story_id: this.props.story.id,
      user_id: this.props.user_id,
    }));
  }

  handleWorkflowAction(action) {
    return (e) => {
      const story = Object.assign({}, this.props.story, { state: action });
      this.props.commit(story);
    }
  }
}

const mapStateToProps = (state, { story }) => ({
  requester: selectUser(state, story.author_id)['name'],
  user_id: state.session.currentUser.id,
  errorMsg: state.errors[0],
});

const mapDispatchToProps = (dispatch, {story}) => {
  const isNew = StoryUtil.isNew(story);
  const commit = isNew ? createStory : updateStory;
  const remove = isNew ? removeStory : deleteStory;
  return {
    commit: story => dispatch(commit(story)),
    remove: story => dispatch(remove(story)),
    clearErrors: () => dispatch(clearErrors()),
    fetchStory: id => dispatch(fetchStory(id)),
    addTask: task => dispatch(addTask(task)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryForm);
