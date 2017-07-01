import React from 'react';
import PanelHeader from '../project/panel_header';
import StoryIndex from './story_index';

const StoryPanel = props => {
  return (
    <div className='story panel'>
      <PanelHeader
        title={props.title}
        handleAdd={props.handleAdd}
        handleClose={props.handleClose}
        />
      <StoryIndex
        stories={props.stories}
        handleEdit={props.handleEdit}
        canDrag={props.canDrag}
        />
    </div>
  )
};

export default StoryPanel;
