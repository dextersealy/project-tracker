import React from 'react';
import Header from '../util/header';
import * as StorageAPI from '../../util/storage_util';
import { connect } from 'react-redux';
import { fetchProject } from '../../actions/project_actions';
import { currentProject, currentStories } from '../../selectors/project';
import NavPanel from './nav_panel'
import StoryPanel from '../story/story_panel'

const defaultState = {
  panels: {
    addStory: { title: 'Add Story', visible: true },
    current: {
      title: 'Current iteration/backlog', nav_title: 'Current/backlog',
      visible: true
    },
    assigned: { title: 'My Work', visible: true },
    unscheduled: { title: 'Icebox', visible: true },
    done: { title: 'Done', visible: false },
  }
}

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.retrieveState();
    this.handleNav = this.handleNav.bind(this);
  }

  componentDidMount() {
    this.props.fetchProject(this.props.project_id)
  }

  componentWillReceiveProps({ project_id }) {
    if (project_id !== this.props.project_id) {
      this.setState(this.retrieveState(project_id));
    }
  }

  render() {
    return (
      <div className='project'>
        <Header/>
        <div className='content'>
          <NavPanel panels={this.state.panels} handleNav={this.handleNav}/>
          {this.renderPanels()}
        </div>
      </div>
    );
  }

  renderPanels() {
    const storyPanels = [];
    const { panels } = this.state;
    Object.keys(panels).forEach(key => {
      if (key !== 'addStory' && panels[key].visible) {
        storyPanels.push(
          <StoryPanel
            key={key}
            title={panels[key].title}
            stories={this.props.stories}
            />
        );
      }
    });
    return storyPanels;
  }

  handleNav(id) {
    return (e) => {
      e.stopPropagation();
      if (id === 'addStory') {
      } else {
        this.toggleNav(id);
      }
    }
  }

  toggleNav(id) {
    const newState = Object.assign({}, this.state);
    newState.panels[id].visible = !newState.panels[id].visible;
    this.setState(newState);
    this.saveState();
  }

  saveState() {
    const currState = {};
    const { panels } = this.state;
    Object.keys(panels).forEach(key => {
      currState[key] = { visible: panels[key].visible }
    });
    StorageAPI.set(this.getKey(), currState);
  }

  retrieveState(project_id = null) {
    const newState = Object.assign({}, defaultState, this.state);
    const prevState = StorageAPI.get(this.getKey(project_id));
    Object.keys(prevState).forEach(key => {
      if (newState.panels[key]) {
        newState.panels[key].visible = prevState[key].visible;
      }
    });
    return newState;
  }

  getKey(project_id = null) {
    return `project_${project_id || this.props.project_id}`;
  }
}

const mapStateToProps = (state, ownProps) => {
  const project_id = ownProps.match.params.id;
  const project = currentProject(state, ownProps);
  const stories = project && Object.keys(state.stories)
    .map(id => state.stories[id])
    .filter(story => story.project_id === project.id);
  return { project_id, project, stories };
};

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProject(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
