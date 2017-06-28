import React from 'react';
import { isNew } from './story_util';

const StoryActions = ({story, handleDelete, handleSave}) => {
  return (
    <section className='story-actions-section'>
      <button type='button' onClick={handleDelete}>
        {isNew(story) ? 'Cancel' : 'Delete'}
      </button>
      <button type='button' onClick={handleSave}>
        {isNew(story) ? 'Save' : 'Close'}
      </button>
    </section>
  );
}

export default StoryActions;
