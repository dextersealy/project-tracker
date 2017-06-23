import React from 'react';
import StoryIndexItem from './story_index_item';

const StoryIndex = ({stories}) => {
  const items = stories 
    ? stories.map(story => <StoryIndexItem key={story.id} story={story} />)
    : null;
  return (
    <ul className='index'>{items}</ul>
  );
};

export default StoryIndex;
