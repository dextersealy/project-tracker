import React from 'react';
import { connect } from 'react-redux';
import * as FormUtil from '../../util/form_util';
import * as StoryUtil from './story_util';
import StoryMenu from './story_menu';
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
    const items = {
      feature: { title: 'Feature', icon: 'fa fa-star' },
      bug: { title: 'Bug', icon: 'fa fa-bug' },
      chore: { title: 'Chore', icon: 'fa fa-gear' },
      release: { title: 'Release', icon: 'fa fa-flag' },
    };
    const { kind } = this.state;
    return (
      <div>
        <span className='label'>Story type</span>
        <div className='story-type'>
          {StoryUtil.renderKind(kind)}
          <StoryMenu items={items} currentValue={kind}
            handleSelect={this.handleMenu('kind')}/>
        </div>
      </div>
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
      <div>
        <span className='label'>Points</span>
        <div className='story-points'>
          <StoryMenu items={items} currentValue={points}
            handleSelect={this.handleMenu('points')}/>
        </div>
      </div>
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
      <div>
        <span className='label'>State</span>
        <div className='story-state'>
          <StoryMenu items={items} currentValue={state}
            handleSelect={this.handleMenu('state')}/>
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
          <div className='requester-name'>{requester}</div>
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
