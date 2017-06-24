import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStory } from '../../actions/story_actions';
import { selectUserInitials } from '../../util/selectors';

class StoryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteStory(this.props.story);
  }

  render() {
    const { story } = this.props;
    return (
      <div className='item'>
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

  renderCaret() {
    return (
      <i className='caret fa fa-caret-right'/>
    );
  }

  renderKind() {
    const icons = {
      feature: 'star', bug: 'bug', chore: 'cog', release: 'flag'
    };
    return (
      <i className={`kind fa fa-${icons[this.props.story.kind]}`}/>
    );
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
      unscheduled: { started: 'Start'},
      pending: { started: 'Start'},
      started: { finished: 'Finish'},
      finished: { delivered: 'Deliver'},
      delivered: { accepted: 'Accept', rejected: 'Reject'},
      rejected: { restarted: 'Restart'},
    };

    const flow = actions[this.props.story.state];
    const buttons = flow && Object.keys(flow).map(key => {
      return (
        <button type='button' className={key.replace(/ed$/, '')}>
          {flow[key]}
        </button>
      );
    });
    return buttons;
  }

}

const mapStateToProps = (state, {story}) => ({
  initials: selectUserInitials(state, story.author_id)
});

const mapDisptachToProps = dispatch => ({
  deleteStory: (story) => dispatch(deleteStory(story))
});

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(StoryIndexItem);
