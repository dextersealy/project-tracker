import React from 'react';

const icons = {
  feature: 'star', bug: 'bug', chore: 'cog', release: 'flag'
};

export const renderKind = kind => {
  return (
    <i className={`kind fa fa-${icons[kind]}`}/>
  );
}
