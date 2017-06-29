import React from 'react';
import StoryWorkflow from './story_workflow';
import StoryMenu from './story_menu';

const items = {
  unstarted: { title: 'Unstarted' },
  started: { title: 'Started' },
  finished: { title: 'Finished' },
  delivered: { title: 'Delivered' },
  rejected: { title: 'Rejected' },
  accepted: { title: 'Accepted' },
}

const StoryState = ({story, handleMenu, handleWorkflow}) => {
  return (
    <section className='story-state-section'>
      <span className='story-section-caption'>State</span>
      <div className='story-section-content'>
        <StoryWorkflow story={story} handleWorkflow={handleWorkflow}/>
        <StoryMenu items={items} currentValue={story.state}
          handleSelect={handleMenu}/>
      </div>
    </section>
  );
}

export default StoryState;
