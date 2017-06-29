import React from 'react';
import PanelHeader from '../project/panel_header';
import StoryIndex from './story_index';

const StoryPanel = ({title, stories, handleAdd, handleClose, canDrag }) => {
  return (
    <div className='story panel'>
      <PanelHeader
        title={title}
        handleAdd={handleAdd}
        handleClose={handleClose}/>
      <StoryIndex stories={stories} canDrag={canDrag}/>
    </div>
  )
};

export default StoryPanel;
