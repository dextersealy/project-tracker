import React from 'react';
import { renderKind } from './story_util';
import StoryMenu from './story_menu';

const items = {
  feature: { title: 'Feature', icon: 'fa fa-star' },
  bug: { title: 'Bug', icon: 'fa fa-bug' },
  chore: { title: 'Chore', icon: 'fa fa-gear' },
  release: { title: 'Release', icon: 'fa fa-flag' },
};

const StoryKind = ({story, handleMenu}) => {
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
