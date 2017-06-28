import React from 'react';

const StoryRequester = ({story}) => {
  return (
    <section className='story-requester-section'>
      <span className='story-section-caption'>Requester</span>
      <div className='story-section-content'>
        {story.requester}
      </div>
    </section >
  );
}

export default StoryRequester;
