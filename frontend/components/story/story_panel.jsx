import React from 'react';
import PanelHeader from '../project/panel_header';
import StoryIndex from './story_index';

const StoryPanel = ({title, stories}) => {
  return (
    <div className='story panel'>
      <PanelHeader title={title}/>
      <StoryIndex stories={stories}/>
    </div>
  )
};

export default StoryPanel;
