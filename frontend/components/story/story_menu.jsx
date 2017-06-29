import React from 'react';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

const StoryMenu = ({ items, currentValue, handleSelect }) => (
  <Wrapper className='drop-down' onSelection={handleSelect}>
    <Button className='drop-down-trigger'>{currentValue}</Button>
    <Menu><ul className='drop-down-menu'>{renderItems(items)}</ul></Menu>
  </Wrapper>
);

const renderItems = items => Object.keys(items).map(key => {
  const item = items[key];
  return (
    <li key={key} className='drop-down-menuItemWrapper'>
      <MenuItem value={key} className='drop-down-menuItem'>
        <div>{item.icon}{item.title}</div>
      </MenuItem>
    </li>
  );
});

export default StoryMenu;
