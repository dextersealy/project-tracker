import React from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router-dom';

class Analytics extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.history.listen(location => {
      ReactGA.pageview(location.pathname);
    });
  }

  render() {
    return null;
  }
}

export default withRouter(Analytics);
