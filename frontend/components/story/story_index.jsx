import React from 'react';
import StoryItem from './story_item';

class StoryIndex extends React.Component {
  render() {
    return (
      <div className='index'>
        {this.renderItems(this.props.stories)}
      </div>
    );
  }

  renderItems(stories) {
    const items = stories && stories.map(story =>
      <StoryItem
        key={story.id}
        story={story}
        />
    );
    return items;
  }
}

export default StoryIndex;
