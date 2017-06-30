import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Header from '../util/header';
import * as StorageAPI from '../../util/storage_util';
import { fetchProject } from '../../actions/project_actions';
import { selectProject, selectStories } from '../../util/selectors';
import {
  fetchStory,
  receiveStory,
  receiveDeleteStory
} from '../../actions/story_actions';
import * as StoryUtil from '../story/story_util';
import NavPanel from './nav_panel';
import StoryPanel from '../story/story_panel';

const theTabs = {
  add: {
    title: 'Add Story',
    visible: true,
    storyToAdd: 'unstarted'
  },
  assigned: {
    title: 'My Work',
    visible: true
  },
  current: {
    title: 'Current iteration/Backlog',
    navTitle: 'Current/Backlog',
    visible: true,
    storyToAdd: 'started'
  },
  unstarted: {
    title: 'Icebox',
    visible: true,
    storyToAdd: 'unstarted'
  },
  done: {
    title: 'Done',
    visible: false
  }
}

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.retrieveState();
    this.handleNav = this.handleNav.bind(this);
    this.handleModUpdate = this.handleModUpdate.bind(this);
    this.handleDelUpdate = this.handleDelUpdate.bind(this);

    const { pusher } = this.props;
    this.channelId = `private-project${props.project_id}`
    this.channel = pusher.subscribe(this.channelId);
    this.channel.bind('mod', data => window.setTimeout(
      () => this.handleModUpdate(data), 100)
    );
    this.channel.bind('del', data => window.setTimeout(
      () => this.handleDelUpdate(data), 100)
    );
  }

  handleModUpdate(story) {
    const { id, at } = story;
    const { stories } = this.props;
    if (!stories[id] || stories[id].updated_at !== at) {
      this.props.fetchStory(story)
    }
  }

  handleDelUpdate(story) {
    const { stories } = this.props;
    if (stories[story.id]) {
      this.props.removeStory(story);
    }
  }

  componentDidMount() {
    this.props.fetchProject(this.props.project_id)
  }

  componentWillReceiveProps({ project_id }) {
    if (project_id !== this.props.project_id) {
      this.setState(this.retrieveState(project_id));
    }
  }

  componentWillUnmount() {
    this.channel.unbind();
    this.props.pusher.unsubscribe(this.channelId);
  }

  render() {
    return (
      <div className='project'>
        <Header/>
        <div className='content'>
          <NavPanel tabs={this.state.tabs} handleNav={this.handleNav}/>
          {this.renderPanels()}
        </div>
      </div>
    );
  }

  renderPanels() {
    const panels = [];
    const { tabs } = this.state;
    Object.keys(tabs).forEach(key => {
      const tab = tabs[key];
      if (key !== 'add' && tab.visible) {
        panels.push(
          <StoryPanel
            key={key}
            title={tab.title}
            stories={this.filterStories(key)}
            handleAdd={this.handleAdd(key)}
            handleClose={this.handleClose(key)}
            canDrag={this.canDrag(key)}
            />
        );
      }
    });
    return panels;
  }

  filterStories(key) {
    const { stories } = this.props;
    return stories && Object.keys(stories).map(id => stories[id])
      .filter(story => this.filter(story, key))
      .sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
  }

  filter(story, key) {
    switch (key) {
      case 'done': return StoryUtil.isCompleted(story);
      case 'current': return StoryUtil.isCurrent(story);
      case 'unstarted': return StoryUtil.isUnstarted(story);
      case 'assigned': return this.isWorkItem(story);
      default: return true;
    }
  }

  isWorkItem(story) {
    return !StoryUtil.isNew(story) && story.assignee_id === this.props.user_id
      && ['started', 'finished', 'rejected'].includes(story.state);
  }

  handleClose(id) {
    return (e) => {
      e.stopPropagation();
      this.toggleNav(id);
    }
  }

  handleNav(id) {
    return (e) => {
      e.stopPropagation();
      if (id === 'add') {
        this.addStory(theTabs[id].storyToAdd);
      } else {
        this.toggleNav(id);
      }
    }
  }

  handleAdd(tab_id) {
    return theTabs[tab_id].storyToAdd
      ? (e) => this.addStory(theTabs[tab_id].storyToAdd)
      : null;
  }

  canDrag(tab_id) {
    return () => !['done', 'assigned'].includes(tab_id)
  }

  addStory(state) {
    const { user_id, project_id } = this.props;
    const story = StoryUtil.initStory({ user_id, project_id, state });
    if (state === 'started') {
      story.assignee_id = user_id;
    }

    this.props.addStory(story);
    if (state === 'unstarted' && !this.state.tabs['unstarted'].visible) {
      this.toggleNav('unstarted');
    }
  }

  toggleNav(id) {
    this.setState(prevState => {
      const newState = Object.assign({}, prevState);
      newState.tabs[id].visible = !prevState.tabs[id].visible;
      this.saveState(newState);
      return newState;
    });
  }

  saveState({ tabs }) {
    const state = {};
    Object.keys(tabs).forEach(key => {
      state[key] = { visible: tabs[key].visible }
    });
    StorageAPI.set(this.getKey(), state);
  }

  retrieveState(project_id = null) {
    const state = _.merge({}, { tabs: theTabs }, this.state);
    const { tabs } = state;
    const savedState = StorageAPI.get(this.getKey(project_id));
    Object.keys(savedState).forEach(key => {
      if (tabs[key]) {
        tabs[key].visible = savedState[key].visible;
      }
    });
    return state;
  }

  getKey(project_id = null) {
    return `project_${project_id || this.props.project_id}`;
  }
}

const mapStateToProps = (state, ownProps) => {
  const pusher = state.session.pusher;
  const user_id = state.session.currentUser.id;
  const project_id = ownProps.match.params.id;
  const project = selectProject(state, ownProps);
  const stories = selectStories(state, project);
  return { user_id, project_id, project, stories, pusher };
};

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProject(id)),
  fetchStory: ({id}) => dispatch(fetchStory(id)),
  addStory: story => dispatch(receiveStory(story)),
  removeStory: story => dispatch(receiveDeleteStory(story)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
