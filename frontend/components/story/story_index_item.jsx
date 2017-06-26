import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../util/selectors';
import StoryForm from './story_form';
import * as StoryUtil from './story_util';
import { updateStory } from '../../actions/story_actions';

const workflow = {
  unstarted: { started: 'Start'},
  started: { finished: 'Finish'},
  finished: { delivered: 'Deliver'},
  delivered: { accepted: 'Accept', rejected: 'Reject'},
  rejected: { started: 'Restart'},
};

class StoryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: StoryUtil.isNew(this.props.story) }
    this.handleCaret = this.handleCaret.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  handleCaret(e) {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  handleAction(action) {
    return (e) => {
      const story = Object.assign({}, this.props.story, { state: action });
      this.props.commit(story);
    }
  }

  render() {
    const { story } = this.props;
    if (this.state.open) {
      return (
        <StoryForm story={story} handleClose={this.handleCaret}/>
      );
    } else {
      return (
        <div className={`story-item ${story.state}`}>
          <div>
            {this.renderCaret()}
            {this.renderKind()}
            {this.renderTitle()}
          </div>
          <div className='action'>
            {this.renderActions()}
          </div>
        </div>
      );
    }
  }

  renderCaret() {
    return (
      <i onClick={this.handleCaret}
        className={`caret fa fa-caret-${this.state.open ? 'down' : 'right'}`}
      />
    );
  }

  renderKind() {
    return StoryUtil.renderKind(this.props.story.kind);
  }

  renderTitle() {
    const { story, initials } = this.props;
    return (
      <div>
        <span className='title'>{story.title}
        </span> (<span className='initials'>{initials}
        </span>)
      </div>
    );
  }

  renderActions() {
    const actions = workflow[this.props.story.state];
    const buttons = actions && Object.keys(actions).map(action => {
      const title = actions[action];
      return (
        <button type='button' key={action} onClick={this.handleAction(action)}
          className={action.replace(/ed$/, '')}>
          {title}
        </button>
      );
    });
    return buttons;
  }

}

const mapStateToProps = (state, {story}) => ({
  initials: selectUser(state, story.author_id)['initials']
});

const mapDispatchToProps = dispatch => ({
  commit: story => dispatch(updateStory(story))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryIndexItem);
