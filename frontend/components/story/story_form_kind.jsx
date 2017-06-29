import React from 'react';
import { renderKind } from './story_util';
import StoryMenu from './story_menu';

const items = {
  feature: { title: 'Feature' },
  bug: { title: 'Bug' },
  chore: { title: 'Chore' },
  release: { title: 'Release' },
};

const StoryKind = ({story, handleMenu}) => {
  Object.keys(items).map(key => {
    items[key].icon = items[key].icon || renderKind(key)
  });
  return (
    <section className='story-type-section'>
      <div className='story-section-caption'>Story type</div>
      <div className='story-section-content'>
        {renderKind(story.kind)}
        <StoryMenu
          items={items}
          currentValue={story.kind}
          handleSelect={handleMenu}
          />
      </div>
    </section>
  );
}

export default StoryKind;
