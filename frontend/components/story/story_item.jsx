import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { selectUser } from '../../util/selectors';
import * as StoryUtil from './story_util';
import { updateStory } from '../../actions/story_actions';
import StoryForm from './story_form';

const workflow = {
  unstarted: { started: 'Start'},
  started: { finished: 'Finish'},
  finished: { delivered: 'Deliver'},
  delivered: { accepted: 'Accept', rejected: 'Reject'},
  rejected: { started: 'Restart'},
};

class StoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: StoryUtil.isNew(this.props.story) }
    this.handleCaret = this.handleCaret.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  render() {
    return this.state.open
      ? <StoryForm story={this.props.story} handleClose={this.handleCaret}/>
      : this.renderItem();
  }

  renderItem() {
    const { story } = this.props;
    const { connectDragSource, isDragging } = this.props;
    const { connectDropTarget, isOver } = this.props;

    const className =`story-item ${story.state}`
      + (isDragging ? ' drag-source' : '')
      + (isOver ? ' drop-target' : '');

    return connectDropTarget(connectDragSource(
      <div className={className}>
        <div>
          {this.renderCaret()}
          {this.renderKind()}
          {this.renderTitle()}
        </div>
        <div className='action'>
          {this.renderActions()}
        </div>
      </div>
    ));
  }

  renderCaret() {
    const icon = `fa fa-caret-${this.state.open ? 'down' : 'right'}`
    return <i className={`caret ${icon}`} onClick={this.handleCaret} />
  }

  renderKind() {
    return StoryUtil.renderKind(this.props.story.kind);
  }

  renderTitle() {
    const { story, initials } = this.props;
    return (
      <div>
        <span className='title'>
          {story.title}
        </span> (<span className='initials'>{initials}</span>)
      </div>
    );
  }

  renderActions() {
    const actions = workflow[this.props.story.state];
    const buttons = actions && Object.keys(actions).map(action => {
      const title = actions[action];
      return (
        <button
          key={action}
          type='button'
          className={action.replace(/ed$/, '')}
          onClick={this.handleAction(action)}>
          {title}
        </button>
      );
    });
    return buttons;
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
}

//  redux

const mapStateToProps = (state, {story}) => ({
  initials: selectUser(state, story.author_id)['initials']
});

const mapDispatchToProps = dispatch => ({
  commit: story => dispatch(updateStory(story))
})

//  drag source

const storySource = {
  beginDrag(props) {
    return {
      sourceId: props.story.id
    };
  }
}

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

//  drop target

const storyTarget = {
  drop(props, monitor) {
    const { story } = props;
    const { sourceId } = monitor.getItem();
    console.log(`story ${sourceId} dropped on ${story.id}`);
  }
}

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

// connect everything

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryItem);

const ItemTypes = {
  STORY: 'STORY'
};

const connectedDragSource = DragSource(
  ItemTypes.STORY,
  storySource,
  collectSource
)(connectedComponent);

const connectedDragSourceAndDropTarget = DropTarget(
  ItemTypes.STORY,
  storyTarget,
  collectTarget
)(connectedDragSource);

export default connectedDragSourceAndDropTarget;
