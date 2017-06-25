import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../util/selectors';
import StoryForm from './story_form';
import * as StoryUtil from './story_util';

class StoryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: StoryUtil.isNew(this.props.story) }
    this.handleCaret = this.handleCaret.bind(this);
  }

  handleCaret(e) {
    this.setState(Object.assign({}, this.state, {open: !this.state.open }));
  }

  render() {
    const { story } = this.props;
    if (this.state.open) {
      return (
        <StoryForm story={story} handleClose={this.handleCaret}/>
      );
    } else {
      return (
        <div className='story-item'>
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
      <p>
        <span className='title'>{story.title}
        </span> (<span className='initials'>{initials}
        </span>)
      </p>
    );
  }

  renderActions() {
    const actions = {
      unstarted: { started: 'Start'},
      started: { finished: 'Finish'},
      finished: { delivered: 'Deliver'},
      delivered: { accepted: 'Accept', rejected: 'Reject'},
      rejected: { restarted: 'Restart'},
    };

    const flow = actions[this.props.story.state];
    const buttons = flow && Object.keys(flow).map(key => {
      return (
        <button key={key} type='button' className={key.replace(/ed$/, '')}>
          {flow[key]}
        </button>
      );
    });
    return buttons;
  }

}

const mapStateToProps = (state, {story}) => ({
  initials: selectUser(state, story.author_id)['initials']
});

export default connect(
  mapStateToProps
)(StoryIndexItem);
