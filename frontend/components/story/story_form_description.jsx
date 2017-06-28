import React from 'react';

const StoryDescription = ({story, handleChange}) => {
  return (
    <section className='story-description-section'>
      <label htmlFor='description' className='story-section-caption'>
        Description
      </label>
      <textarea id='description' placeholder='Add a description' rows='3'
        onChange={handleChange} value={story.description}/>
    </section>
  );
}

export default StoryDescription;
