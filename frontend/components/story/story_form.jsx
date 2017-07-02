import React from 'react';
import { connect } from 'react-redux';
import * as StoryUtil from './story_util';
import { selectUser } from '../../util/selectors';
import { clearErrors } from '../../actions/error_actions';
import ErrorMsg from '../util/error';
import {
  fetchStory,
  receiveStory,
  createStory,
  updateStory,
  deleteStory,
  receiveDeleteStory,
} from '../../actions/story_actions';
import {
  receiveTask,
  createTask,
  updateTask,
  deleteTask,
  removeTask,
} from '../../actions/task_actions';
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

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.id = `${Math.random() * 1e6}`;
    this.task_id = 0;
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.props.handleEdit(this.props.story, 'start');
    } else {
      this.props.fetchStory(this.props.story.id).then(function() {
        this.props.handleEdit(this.props.story, 'start');
      }.bind(this));
    }
  }

  componentWillUnmount() {
    this.props.handleEdit(this.props.story, 'end')
    if (this.props.errorMsg) {
      this.props.clearErrors();
    }
  }

  render() {
    const { errorMsg } = this.props;
    return (
      <div ref={instance => this.myRef = instance} className='story-form'
        onDoubleClick={this.handleDoubleClick}>
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
        story={this.props.story}
        handleCaret={this.handleClose}
        handleChange={this.handleChange('title')}
        />
    );
  }

  renderActions() {
    return (
      <StoryActions
        story={this.props.story}
        handleDelete={this.handleDelete}
        handleSave={this.handleSave}
        />
    );
  }

  renderKind() {
    return (
      <StoryKind
        story={this.props.story}
        handleMenu={this.handleMenu('kind')}
        />
    );
  }

  renderPoints() {
    return (
      <StoryPoints
        story={this.props.story}
        handleMenu={this.handleMenu('points')}/>
    );
  }

  renderState() {
    return (
      <StoryState
        story={this.props.story}
        handleMenu={this.handleMenu('state')}
        handleWorkflow={this.props.handleWorkflow}
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
        story={this.props.story}
        handleChange={this.handleChange('description')}
        />
    );
  }

  renderTasks() {
    return(
      <StoryTasks
        story={this.props.story}
        form_id={this.id}
        handleAdd={this.handleAddTask}
        handleChange={this.handleChangeTask}
        handleSave={this.handleSaveTask}
        handleDelete={this.handleDeleteTask}
        />
    );
  }

  handleDoubleClick(e) {
    if (Object.is(e.target, e.currentTarget)) {
      this.handleClose(e)
    }
  }

  handleClose(e) {
    this.handleSave(e)
  }

  handleDelete(e) {
    if (this.props.isNew) {
      this.props.removeStory(this.props.story);
    } else {
      this.props.deleteStory(this.props.story);
    }
  }

  handleSave(e) {
    const { story, isNew } = this.props;
    if (isNew) {
      if (StoryUtil.isEmpty(story)) {
        this.props.removeStory(story);
      } else {
        this.props.createStory(this.flatten(story))
          .then(() => this.props.removeStory(story));
      }
    } else {
      this.props.updateStory(story).then(() => {
        if (this.refs.myRef) {
          this.props.handleClose(e)
        }
      });
    }
  }

  flatten(story) {
    const result = Object.assign({}, story)
    result.tasks = story.tasks && Object.keys(story.tasks).map(id => ({
      title: story.tasks[id].title,
      done: story.tasks[id].done
    }));
    return result;
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.setValue(field, e.currentTarget.value);
    };
  }

  handleMenu(field) {
    return (value, e) => {
      this.setValue(field, value);
    };
  }

  setValue(field, value) {
    this.props.receiveStory(Object.assign({}, this.props.story,
      {[field]: value}));
  }

  handleAddTask(e) {
    const task = StoryUtil.initTask({
      id: `${this.id}_${this.task_id++}`,
      story_id: this.props.story.id,
      user_id: this.props.user_id,
    });
    this.props.receiveTask(task);
  }

  handleChangeTask({ id }) {
    return function (field, value) {
      const story = this.props.story;
      const task = Object.assign({}, story.tasks[id], {[field]: value})
      this.props.receiveTask(task);
    }.bind(this);
  }

  handleSaveTask(task) {
    if (this.props.isNew) {
      return new Promise((resolve, reject) => {
        resolve(this.props.receiveTask(task))
      });
    } else if (StoryUtil.isNew(task)) {
      return this.props.createTask(task)
        .then(() => this.props.removeTask(task))
    } else {
      return this.props.updateTask(task);
    }
  }

  handleDeleteTask(task) {
    if (this.props.isNew || StoryUtil.isNew(task)) {
      return this.props.removeTask(task);
    } else {
      return this.props.deleteTask(task);
    }
  }
}

const mapStateToProps = (state, { story }) => ({
  requester: selectUser(state, story.author_id)['name'],
  user_id: state.session.currentUser.id,
  errorMsg: state.errors[0],
});

const mapDispatchToProps = (dispatch, {story}) => {
  return {
    isNew: StoryUtil.isNew(story),
    clearErrors: () => dispatch(clearErrors()),
    fetchStory: id => dispatch(fetchStory(id)),

    receiveStory: story => dispatch(receiveStory(story)),
    createStory: story => dispatch(createStory(story)),
    deleteStory: story => dispatch(deleteStory(story)),
    updateStory: story => dispatch(updateStory(story)),
    removeStory: story => dispatch(receiveDeleteStory(story)),

    receiveTask: task => dispatch(receiveTask(task)),
    createTask: task => dispatch(createTask(task)),
    deleteTask: task => dispatch(deleteTask(task)),
    updateTask: task => dispatch(updateTask(task)),
    removeTask: task => dispatch(removeTask(task)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryForm);
