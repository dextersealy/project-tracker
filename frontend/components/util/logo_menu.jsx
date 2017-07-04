import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';
import { selectProject } from '../../util/selectors';

const LogoMenu = ({ history, project, projects }) => {
  const title = project ? project.title : 'Project Tracker';
  return (
    <Wrapper className='drop-down' onSelection={handleSelect(history)}>
      <Button className='drop-down-trigger'>{title}</Button>
      <Menu>
        <ul className='drop-down-menu'>
          {renderItems(projects)}
          {renderHomeItem()}
        </ul>
      </Menu>
    </Wrapper>
  );
};

const renderItems = items => Object.keys(items).map(key => {
  const project = items[key];
  return (
    <li key={key} className='drop-down-menuItemWrapper'>
      <MenuItem value={key} className='drop-down-menuItem'>
        {project.title}
      </MenuItem>
    </li>
  );
});

const renderHomeItem = () => {
  return (
    <li className='drop-down-menuItemWrapper'>
      <MenuItem value={'home'} className='drop-down-menuItem'>
        <div><i className='fa fa-home'/>Dashboard</div>
      </MenuItem>
    </li>
  );
}

const handleSelect = (history) => {
  return (value, e) => {
    if (value === 'home') {
      history.push('/projects');
    } else {
      history.push(`/project/${value}`);
    }
  };
};

const mapStateToProps = (state, ownProps) => ({
  projects: state.projects,
  project: selectProject(state, ownProps),
});

export default withRouter(connect(
  mapStateToProps
)(LogoMenu));
