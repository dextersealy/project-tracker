import React from 'react';
import PanelHeader from './panel_header.jsx'

const NavPanel = ({panels, handleNav}) => {
  const items = Object.keys(panels).map(key => {
    const panel = panels[key];
    return(
      <li
        key={key}
        onClick={handleNav(key)}
        className={panel.visible ? 'active' : 'inactive'}>
        {panel.nav_title || panel.title}
      </li>
    )
  });
  return (
      <div className='nav panel'>
        <PanelHeader/>
        <div>
          <ul>
            {items}
          </ul>
        </div>
      </div>
  );
}

export default NavPanel;
