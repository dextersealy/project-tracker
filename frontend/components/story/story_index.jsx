import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import StoryItem from './story_item';
import { DragDropItemTypes } from './story_util';

class StoryIndex extends React.Component {
  render() {
    return this.props.connectDropTarget(
      <div className='index'>
        {this.renderItems(this.props.stories)}
      </div>
    );
  }

  renderItems(stories) {
    return stories && stories.map(story => (
      <StoryItem
        key={story.id}
        story={story}
        handleEdit={this.props.handleEdit}
        canDrag={this.props.canDrag}
        />
    ));
  }
}

const indexTarget = {
  drop: ({stories}, monitor) => {
    if (!monitor.didDrop()) {
      if (stories) {
        return stories[stories.length - 1];
      }
    }
  }
}

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
});

export default DropTarget(
  DragDropItemTypes.STORY,
  indexTarget,
  collectTarget
)(StoryIndex);
