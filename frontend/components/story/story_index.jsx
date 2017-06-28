import React from 'react';
import StoryItem from './story_item';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class StoryIndex extends React.Component {
  render() {
    return (
      <div className='index'>
        {this.renderItems(this.props.stories)}
      </div>
    );
  }

  renderItems(stories) {
    return stories && stories.map(story => (
      <StoryItem key={story.id} story={story}/>
    ));
  }
}

export default DragDropContext(
  HTML5Backend
)(StoryIndex);
