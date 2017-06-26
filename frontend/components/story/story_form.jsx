import React from 'react';
import { connect } from 'react-redux';
import * as FormUtil from '../../util/form_util';
import * as StoryUtil from './story_util';
import { selectUser } from '../../util/selectors';
import { clearErrors } from '../../actions/error_actions';
import ErrorMsg from '../util/error';

import {
  createStory,
  updateStory,
  deleteStory,
  removeStory,
} from '../../actions/story_actions';

class StoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.story);
    this.handleChange = FormUtil.handleChange.bind(this);
    this.handleCaret = this.handleCaret.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleCaret(e) {
    const { story, remove } = this.props;
    if (StoryUtil.isNew(story) && StoryUtil.isEmpty(this.state)) {
      remove(story);
    } else {
      this.handleSave(e)
    }
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
        <div className='options'>
          {this.renderKind()}
          {this.renderPoints()}
          {this.renderState()}
          {this.renderRequester()}
        </div>
        {this.renderDescription()}
      </div>
    );
  }

  renderTitle() {
    const { title } = this.state;
    return (
      <div className='title'>
        <i onClick={this.handleCaret} className='caret fa fa-caret-down'/>
        <input type='text' value={title} onChange={this.handleChange('title')}/>
      </div>
    );
  }

  renderActions() {
    const isNew = StoryUtil.isNew(this.props.story);
    return (
      <div className='actions'>
        <button type='button' onClick={this.handleDelete}>
          {isNew ? 'Cancel' : 'Delete'}
        </button>
        <button type='button' onClick={this.handleSave}>
          {isNew ? 'Save' : 'Close'}
        </button>
      </div>
    );
  }

  renderKind() {
    const { kind } = this.state;
    return (
      <div>
        <span className='label'>Story type</span>
        <div className='story-type'>
          {StoryUtil.renderKind(kind)}
          <button className='drop-down'>{kind}</button>
        </div>
      </div>
    );
  }

  renderPoints() {
    const { points } = this.state;
    return (
      <div>
        <span className='label'>Points</span>
        <div className='story-points'>
          <button className='drop-down'>{points} Points</button>
        </div>
      </div>
    );
  }

  renderState() {
    const { state } = this.state;
    return (
      <div>
        <span className='label'>State</span>
        <div className='story-state'>
          <button className='drop-down'>{state}</button>
        </div>
      </div>
    );
  }

  renderRequester() {
    const { requester } = this.props;
    return (
      <div>
        <span className='label'>Requester</span>
        <div className='story-requester'>
          <button className='drop-down'>{requester}</button>
        </div>
      </div>
    );
  }

  renderDescription() {
    const { description } = this.state;
    return (
      <div className='description'>
        <label htmlFor='description'>Description</label>
        <textarea id='description' placeholder='Add a description' rows='3'
          onChange={this.handleChange('description')} value={description}/>
      </div>
    );
  }
}

const mapStateToProps = (state, { story }) => ({
  requester: selectUser(state, story.author_id)['name'],
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryForm);
