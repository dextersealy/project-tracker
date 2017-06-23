import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { currentProject } from '../../selectors/project';

const Logo = ({project}) => {
  const title = project ? project.title : 'Project Tracker';
  return (
    <logo>
      <Link to='/'>
        <img className="logo-image" src={window.images.logo} alt="logo"/>
      </Link>
      <Link to='/'><p>{title}</p></Link>
    </logo>
  );
}

const mapStateToProps = (state, ownProps) => ({
  project: currentProject(state, ownProps)
});

export default withRouter(connect(
  mapStateToProps
)(Logo));
