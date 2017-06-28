import React from 'react';
import StoryMenu from './story_menu';

const items = {
  unstarted: { title: 'Unstarted' },
  started: { title: 'Started' },
  finished: { title: 'Finished' },
  delivered: { title: 'Delivered' },
  rejected: { title: 'Rejected' },
  accepted: { title: 'Accepted' },
}

const StoryState = ({story, handleMenu}) => {
  return (
    <section className='story-state-section'>
      <span className='story-section-caption'>State</span>
      <div className='story-section-content'>
        <StoryMenu items={items} currentValue={story.state}
          handleSelect={handleMenu}/>
      </div>
    </section>
  );
}

export default StoryState;
