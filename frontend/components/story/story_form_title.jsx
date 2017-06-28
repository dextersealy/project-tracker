import React from 'react';

const StoryTitle = ({ story, handleCaret, handleChange })  => {
  return (
    <section className='story-title-section'>
      <i onClick={handleCaret} className='caret fa fa-caret-down'/>
      <input type='text' value={story.title} onChange={handleChange}/>
    </section>
  );
}

export default StoryTitle;
