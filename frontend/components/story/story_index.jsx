import React from 'react';
import StoryIndexItem from './story_index_item';

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
      <StoryIndexItem
        key={story.id}
        story={story}
        />
    );
    return items;
  }
}

export default StoryIndex;
