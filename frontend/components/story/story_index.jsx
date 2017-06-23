import React from 'react';
import StoryIndexItem from './story_index_item';

const StoryIndex = ({title, stories}) => {
  const items = stories
    ? stories.map(story => <StoryIndexItem key={story.id} story={story} />)
    : null;
  return (
    <div className='index'>
      <ul>{items}</ul>
    </div>
  );
};

export default StoryIndex;
