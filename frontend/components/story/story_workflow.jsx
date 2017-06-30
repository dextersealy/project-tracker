import React from 'react';
import { connect } from 'react-redux';

const workflow = {
  unstarted: { started: 'Start'},
  started: { finished: 'Finish'},
  finished: { delivered: 'Deliver'},
  delivered: { accepted: 'Accept', rejected: 'Reject'},
  rejected: { started: 'Restart'},
};

class StoryWorkflow extends React.Component {
  render() {
    const { story, handleWorkflow } = this.props;
    const actions = workflow[story.state];
    const buttons = actions && Object.keys(actions).map(action => {
      const title = actions[action];
      return (
        <button
          key={action}
          type='button'
          className={action.replace(/ed$/, '')}
          disabled={this.isDisabled(action)}
          onClick={handleWorkflow(action)}>
          {title}
        </button>
        );
    });
    return (
      <div className='story-workflow-actions'>
        {buttons}
      </div>
    );
  }

  isDisabled(action) {
    const story = this.props.story;
    if (['accepted', 'rejected'].includes(action)) {
      if (this.props.user_id !== story.owner_id) {
        return true;
      }
    } else if (['delivered', 'finished', 'restarted'].includes(action)) {
      if (this.props.user_id !== story.assignee_id) {
        return true;
      }
    }
    return false;
  }
}

const mapStateToProps = state => ({
  user_id: state.session.currentUser.id
});

export default connect(mapStateToProps)(StoryWorkflow);
