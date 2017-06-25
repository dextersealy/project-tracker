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

export const isNew = ({ id }) => `${id}`.match(/^new/);
