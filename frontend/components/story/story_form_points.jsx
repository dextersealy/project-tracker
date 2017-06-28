import React from 'react';
import StoryMenu from './story_menu';

const items = {
  zero: { title: '0\xa0Points' },
  easy: { title: '1\xa0Point' },
  medium: { title: '2\xa0Points' },
  hard: { title: '3\xa0Points' },
};

const StoryPoints = ({story, handleMenu}) => {
  return (
    <section className='story-points-section'>
      <span className='story-section-caption'>Points</span>
      <div className='story-section-content'>
        <StoryMenu items={items} currentValue={story.points}
          handleSelect={handleMenu}/>
      </div>
    </section>
  );
}

export default StoryPoints;
