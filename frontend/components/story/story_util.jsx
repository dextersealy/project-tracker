import React from 'react';

const icons = {
  feature: 'star', bug: 'bug', chore: 'cog', release: 'flag'
};

export const renderKind = kind => (
  <i className={`kind fa fa-${icons[kind]}`}/>
);

export const initStory = ({ user_id, project_id, state }) => ({
  id: `new_${state}`,
  project_id: parseInt(project_id),
  author_id: user_id,
  owner_id: user_id,
  assignee_id: user_id,
  kind: 'feature',
  points: 0,
  state,
  priority: 0,
  title: '',
  description: '',
});

export const isNew = ({ id }) => Boolean(`${id}`.startsWith('new_'));

export const isEmpty = story => (
  story.title.trim().length === 0 && story.description.trim().length === 0
);

export const setUIState = (story, state) => {
  if (state) {
    story.ui_state = state;
  } else {
    delete story.ui_state;
  }
}

export const getUIState = story => (
  `${story.id}`.startsWith('new_')
    ? story.id.slice(4)
    : story.ui_state || story.state
);

export const isUnstarted = story => getUIState(story) === 'unstarted';

export const isCompleted = story => getUIState(story) === 'accepted';

export const isCurrent = story => (
  !['accepted', 'unstarted'].includes(getUIState(story))
);

export const initTask = ({ id, user_id, story_id }) => ({
  id: `new_${id || story_id}`,
  story_id,
  author_id: user_id,
  title: '',
  done: false,
});

export const isEmptyTask = task => task.title.trim().length === 0;

export const DragDropItemTypes = {
  STORY: 'STORY'
};
