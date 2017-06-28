import React from 'react';
import * as StoryUtil from './story_util';
import StoryTask from './story_task';

const StoryTasks = ({story, form_id, handleAdd, handleChange}) => {

  let allowAdd = true;
  let completed = 0;
  const items = [];

  if (story.tasks) {
    Object.keys(story.tasks).forEach(id => {
      const task = story.tasks[id];
      if (StoryUtil.isNew(task)) {
        if (!task.id.match(`${form_id}$`)) {
          return;
        }
        allowAdd = false;
      }
      items.push(
        <StoryTask
          key={id}
          task={task}
          handleChange={handleChange(task)}
          />
      );
      completed += task.done ? 1 : 0;
    });
  }

  return (
    <section className='story-tasks-section'>
      <div className='story-section-caption'>
        Tasks ({`${completed}/${items.length}`})
      </div>
      <div className='story-section-content'>
        {items}
        { allowAdd &&
          <button
            className='story-add-task-btn'
            onClick={handleAdd}>
            <i className='fa fa-plus'/>Add a task
          </button>
        }
      </div>
    </section>
  );
}

export default StoryTasks;
