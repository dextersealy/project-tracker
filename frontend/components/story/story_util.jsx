import React from 'react';

const icons = {
  feature: 'star', bug: 'bug', chore: 'cog', release: 'flag'
};

export const renderKind = kind => {
  return (
    <i className={`kind fa fa-${icons[kind]}`}/>
  );
}

export const initStory = ({ user_id, project_id, state }) => ({
  id: `new_${state}`,
  project_id,
  author_id: user_id,
  owner_id: user_id,
  title: '',
  kind: 'feature',
  points: 'zero',
  state,
  description: '',
});

export const isNew = ({ id }) => Boolean(`${id}`.match(/^new/));
export const isUnstarted = ({ state }) => state === 'unstarted';
export const isCompleted = ({ state }) => state === 'accepted';
export const isCurrent = ({ state }) => (
  !['accepted', 'unstarted'].includes(state)
);
export const belongsToUser = ({ owner_id }, user_id) => {
  return owner_id == user_id
}
