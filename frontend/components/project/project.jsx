import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import * as StoryUtil from '../story/story_util';
import * as StorageAPI from '../../util/storage_util';
import { fetchProject } from '../../actions/project_actions';
import { selectProject, selectStories } from '../../util/selectors';
import {
  fetchStory,
  addStory,
  removeStory,
  prioritizeStories
} from '../../actions/story_actions';
import Header from '../util/header';
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
    this.handleEdit = this.handleEdit.bind(this);
    this.startListeningForUpdates();
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
    this.stopListeningForUpdates()
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
            handleClose={this.handleClose(key)}
            handleAdd={this.handleAdd(key)}
            handleEdit={this.handleEdit}
            canDrag={this.canDrag(key)}
            />
        );
      }
    });
    return panels;
  }

  startListeningForUpdates() {
    const { pusher } = this.props;
    this.channel = pusher.subscribe(this.getUpdatesChannel());
    this.channel.bind('mod', data => window.setTimeout(
      () => this.handleModUpdate(data), 100)
    );
    this.channel.bind('del', data => window.setTimeout(
      () => this.handleDelUpdate(data), 100)
    );
    this.channel.bind('prioritize', data=> window.setTimeout(
      () => this.handlePrioritizeUpdate(data), 100)
    );
  }

  stopListeningForUpdates() {
    if (this.channel) {
      this.channel.unbind();
      this.props.pusher.unsubscribe(this.getUpdatesChannel());
      delete this.channel;
    }
  }

  getUpdatesChannel() {
    return `private-project${this.props.project_id}`
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

  handlePrioritizeUpdate(payload) {
    const { stories } = this.props;
    const { id, at } = payload.story;
    if (!stories[id] || stories[id].updated_at !== at) {
      this.props.prioritizeStories(payload);
    }
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
    if (StoryUtil.isNew(story)) {
      return false;
    } else {
      const state = StoryUtil.getUIState(story);
      if ('delivered' === state) {
        return story.owner_id === this.props.user_id;
      } else if (['started', 'finished', 'rejected'].includes(state)) {
        return story.assignee_id === this.props.user_id;
      }
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

  handleClose(id) {
    return (e) => {
      e.stopPropagation();
      this.toggleNav(id);
    }
  }

  handleAdd(tab_id) {
    return theTabs[tab_id].storyToAdd
      ? (e) => this.addStory(theTabs[tab_id].storyToAdd)
      : null;
  }

  handleEdit(story, action)  {
    StoryUtil.setUIState(story, (action === 'start') ? story.state : null);
  }

  canDrag(tab_id) {
    return () => !['done', 'assigned'].includes(tab_id)
  }

  addStory(state) {
    const { user_id, project_id } = this.props;
    const story = StoryUtil.initStory({ user_id, project_id, state });
    this.props.addStory(story).then(() => {
      if (state === 'unstarted' && !this.state.tabs['unstarted'].visible) {
        this.toggleNav('unstarted');
      }
    });
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
  addStory: story => dispatch(addStory(story)),
  removeStory: story => dispatch(removeStory(story)),
  prioritizeStories: payload => dispatch(prioritizeStories(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
