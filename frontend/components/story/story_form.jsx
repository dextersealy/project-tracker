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
import StoryMenu from './story_menu';
import StoryTask from './story_task';

class StoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.story;
    this.handleChange = FormUtil.handleChange.bind(this);
    this.handleCaret = this.handleCaret.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
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
    this.props.clearErrors();
  }

  render() {
    const { errorMsg } = this.props;
    return (
      <div className='story-form'>
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
    const { title } = this.state;
    return (
      <section className='story-title-section'>
        <i onClick={this.handleCaret} className='caret fa fa-caret-down'/>
        <input type='text' value={title} onChange={this.handleChange('title')}/>
      </section>
    );
  }

  renderActions() {
    const isNew = StoryUtil.isNew(this.props.story);
    return (
      <section className='story-actions-section'>
        <button type='button' onClick={this.handleDelete}>
          {isNew ? 'Cancel' : 'Delete'}
        </button>
        <button type='button' onClick={this.handleSave}>
          {isNew ? 'Save' : 'Close'}
        </button>
      </section>
    );
  }

  renderKind() {
    const items = {
      feature: { title: 'Feature', icon: 'fa fa-star' },
      bug: { title: 'Bug', icon: 'fa fa-bug' },
      chore: { title: 'Chore', icon: 'fa fa-gear' },
      release: { title: 'Release', icon: 'fa fa-flag' },
    };
    const { kind } = this.state;
    return (
      <section className='story-type-section'>
        <div className='story-section-caption'>Story type</div>
        <div className='story-section-content'>
          {StoryUtil.renderKind(kind)}
          <StoryMenu items={items} currentValue={kind}
            handleSelect={this.handleMenu('kind')}/>
        </div>
      </section>
    );
  }

  renderPoints() {
    const items = {
      zero: { title: '0\xa0Points' },
      easy: { title: '1\xa0Point' },
      medium: { title: '2\xa0Points' },
      hard: { title: '3\xa0Points' },
    };
    const { points } = this.state;
    return (
      <section className='story-points-section'>
        <span className='story-section-caption'>Points</span>
        <div className='story-section-content'>
          <StoryMenu items={items} currentValue={points}
            handleSelect={this.handleMenu('points')}/>
        </div>
      </section>
    );
  }

  renderState() {
    const items = {
      unstarted: { title: 'Unstarted' },
      started: { title: 'Started' },
      finished: { title: 'Finished' },
      delivered: { title: 'Delivered' },
      rejected: { title: 'Rejected' },
      accepted: { title: 'Accepted' },
    }
    const { state } = this.state;
    return (
      <section className='story-state-section'>
        <span className='story-section-caption'>State</span>
        <div className='story-section-content'>
          <StoryMenu items={items} currentValue={state}
            handleSelect={this.handleMenu('state')}/>
        </div>
      </section>
    );
  }

  renderRequester() {
    const { requester } = this.props;
    return (
      <section className='story-requester-section'>
        <span className='story-section-caption'>Requester</span>
        <div className='story-section-content'>
          {requester}
        </div>
      </section >
    );
  }

  renderDescription() {
    const { description } = this.state;
    return (
      <section className='story-description-section'>
        <label htmlFor='description' className='story-section-caption'>
          Description
        </label>
        <textarea id='description' placeholder='Add a description' rows='3'
          onChange={this.handleChange('description')} value={description}/>
      </section>
    );
  }

  renderTasks() {
    const { tasks } = this.state;
    const items = [];
    let completed = 0;
    let allowAdd = true;
    if (tasks) {
      Object.keys(tasks).forEach(id => {
        const task = tasks[id];
        if (StoryUtil.isNew(task)) {
          if (!task.id.match(`${this.id}$`)) {
            return;
          }
          console.log(task.id);
          allowAdd = false;
        }
        items.push(<StoryTask key={id} task={task}
          handleChange={this.handleTaskChange(task)}/>);
        completed += task.done ? 1 : 0;
      });
    }

    return (
      <section className='story-tasks-section'>
        <div className='story-section-caption'>
          Tasks ({`${completed}/${items.length}`})
        </div>
        <div className='story-section-content'>
          {items}
          { allowAdd &&
            <button className='story-add-task-btn' onClick={this.handleAddTask}>
              <i className='fa fa-plus'/>Add a task
            </button>
          }
        </div>
      </section>
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

  handleMenu(field) {
    return (value, e) => {
      this.setState(prevState => (
        Object.assign({}, prevState, {[field]: value})
      ));
    }
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
