import React from 'react';

class StoryTask extends React.Component {
  render() {
    const { task } = this.props;
    return (
      <div className='story-task'>
        <input type='checkbox'/>
        <input type='text' value={task.title}/>
      </div>
    );
  }
}

export default StoryTask;
