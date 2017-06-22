import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class Logo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const title = this.props.project
      ?  this.props.project.title
      : 'Project Tracker';
    return (
      <logo>
        <Link to='/'><img className="logo-image" src={window.images.logo} alt="Project Tracker logo"/></Link>
        <Link to='/'><p>{title}</p></Link>
      </logo>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const project = id ? state.projects[id] : null;
  return {
    project
  };
};

export default withRouter(connect(
  mapStateToProps
)(Logo));
