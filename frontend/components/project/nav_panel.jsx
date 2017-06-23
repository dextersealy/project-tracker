import React from 'react';
import PanelHeader from './panel_header.jsx'

const NavPanel = () => {
  return (
      <div className='nav panel'>
        <PanelHeader/>
        <ul>
          <li>Add Story</li>
          <li>My Work</li>
          <li>Current/backlog</li>
          <li>Icebox</li>
          <li>Done</li>
        </ul>
      </div>
  );
}

export default NavPanel;
