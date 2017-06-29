import React from 'react';
import { isNew, isEmptyTask } from './story_util';
import StoryTask from './story_task';

class StoryTasks extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  render() {
    const items = this.renderItems();
    const story = this.props.story;
    const completed = story.tasks && Object.keys(story.tasks).reduce(
      (sum, id) => (sum += story.tasks[id].done ? 1 : 0), 0);
    return (
      <section className='story-tasks-section'>
        <div className='story-section-caption'>
          Tasks ({`${completed || '0'}/${items.length}`})
        </div>
        <div className='story-section-content'>
          {items}
          <button
            className='story-add-task-btn'
            onClick={this.handleAdd}>
            <i className='fa fa-plus'/>Add a task
          </button>
        </div>
      </section>
    );
  }

  renderItems() {
    const items = []
    const story = this.props.story;
    if (story.tasks) {
      Object.keys(story.tasks).forEach(id => {
        const task = story.tasks[id];
        if (!isNew(task) || task.id.match(`${this.props.form_id}`)) {
          items.push(
            <StoryTask
              key={id}
              task={task}
              handleChange={this.props.handleChange(task)}
              handleSave={this.props.handleSave}
              handleDelete={this.props.handleDelete}
              />
          );
        }
      });
    }
    return items;
  }

  handleAdd(e) {
    const story = this.props.story;
    const newTaskId = story.tasks && Object.keys(story.tasks).find(
      id => isNew(story.tasks[id])
    )
    if (newTaskId) {
      const task = story.tasks[newTaskId];
      if (isEmptyTask(task)) {
        this.props.handleDelete(task).then(() => {
          this.props.handleAdd(e)
        });
      } else {
        this.props.handleSave(task).then(() => {
          this.props.handleAdd(e)
        });
      }
    } else {
      this.props.handleAdd(e);
    }
  }

}

export default StoryTasks;
