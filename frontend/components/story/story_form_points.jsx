import React from 'react';
import StoryMenu from './story_menu';

const items = {
  0: { title: '0\xa0Points' },
  1: { title: '1\xa0Point' },
  2: { title: '2\xa0Points' },
  3: { title: '3\xa0Points' },
};

const StoryPoints = ({story, handleMenu}) => {
  const title = (items[story.points] && items[story.points].title)
    || `${story.points} Points`;
  return (
    <section className='story-points-section'>
      <span className='story-section-caption'>Points</span>
      <div className='story-section-content'>
        <StoryMenu items={items} currentValue={title}
          handleSelect={handleMenu}/>
      </div>
    </section>
  );
}

export default StoryPoints;
