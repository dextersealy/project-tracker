import React from 'react';
import StoryWorkflowActions from './story_workflow_actions';
import StoryMenu from './story_menu';

const items = {
  unstarted: { title: 'Unstarted' },
  started: { title: 'Started' },
  finished: { title: 'Finished' },
  delivered: { title: 'Delivered' },
  rejected: { title: 'Rejected' },
  accepted: { title: 'Accepted' },
}

const StoryState = ({story, handleMenu, handleAction}) => {
  return (
    <section className='story-state-section'>
      <span className='story-section-caption'>State</span>
      <div className='story-section-content'>
        <StoryWorkflowActions story={story} handleAction={handleAction}/>
        <StoryMenu items={items} currentValue={story.state}
          handleSelect={handleMenu}/>
      </div>
    </section>
  );
}

export default StoryState;
