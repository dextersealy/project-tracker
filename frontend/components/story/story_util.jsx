import React from 'react';

const icons = {
  feature: 'star', bug: 'bug', chore: 'cog', release: 'flag'
};

export const renderKind = kind => (
  <i className={`kind fa fa-${icons[kind]}`}/>
);

export const initStory = ({ user_id, project_id, state }) => ({
  id: `new_${state}`,
  project_id,
  author_id: user_id,
  owner_id: user_id,
  kind: 'feature',
  points: 0,
  state,
  priority: 0,
  title: '',
  description: '',
});

export const isNew = ({ id }) => Boolean(`${id}`.match(/^new/));
export const isEmpty = story => {
  return story.title.trim().length === 0
    && story.description.trim().length === 0;
}
export const isEmptyTask = task => task.title.trim().length === 0;

export const isUnstarted = ({ state }) => state === 'unstarted';
export const isCompleted = ({ state }) => state === 'accepted';
export const isCurrent = ({ state }) => (
  !['accepted', 'unstarted'].includes(state)
);

export const initTask = ({ id, user_id, story_id }) => ({
  id: `new_${id || story_id}`,
  story_id,
  author_id: user_id,
  title: '',
  done: false,
});

export const DragDropItemTypes = {
  STORY: 'STORY'
};
