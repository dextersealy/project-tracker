import React from 'react';
import PanelHeader from './panel_header.jsx'

const NavPanel = ({tabs, handleNav}) => {
  const items = Object.keys(tabs).map(key => {
    const tab = tabs[key];
    return(
      <li
        key={key}
        onClick={handleNav(key)}
        className={tab.visible ? 'active' : 'inactive'}>
        {tab.nav_title || tab.title}
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
