import React from 'react';
import PanelHeader from './panel_header.jsx'

class NavPanel extends React.Component {

  render() {
    return (
      <div className='nav panel'>
        <PanelHeader/>
        <div className='nav-list'>
          {this.renderItems()}
        </div>
      </div>
    );
  }

  renderItems() {
    const { tabs, handleNav } = this.props;
    const items = Object.keys(tabs).map(key => {
      const tab = tabs[key];
      return(
        <div
          key={key}
          onClick={handleNav(key)}
          className={`nav-item ${tab.visible ? 'active' : 'inactive'}`}>
          {this.renderIcon(key)}
          {tab.navTitle || tab.title}
        </div>
      )
    });
    return items;
  }

  renderIcon(key) {
    if (key === 'add') {
      return <i className='fa fa-plus'/>;
    } else {
      return null;
    }
  }
}

export default NavPanel;
