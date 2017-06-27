import React from 'react';
import { connect } from 'react-redux';
import * as FormUtil from '../../util/form_util';
import { updateTask } from '../../actions/task_actions';

class StoryTask extends React.Component {
  constructor(props) {
    super(props);
    const { title } = this.props.task;
    this.state = { title }
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentWillReceiveProps({ task }) {
    this.state.title = task.title;
  }

  handleFocus(focus) {
    return (e) => {
      if (focus) {
        this.saveButton.classList.remove('hide');
      } else {
        //  Delay hiding the button because otherwise you can't click on it
        window.setTimeout(() => { this.saveButton.classList.add('hide') }, 100);
      }
    }
  }

  handleChange(e) {
    const title = e.currentTarget.value;
    this.setState(Object.assign({}, this.state, { title }));
    window.setTimeout(() => {
      this.textInput.style.height = 'auto';
      this.textInput.style.height = this.textInput.scrollHeight  + 'px';
    }, 0);
  }

  handleCheckbox(e) {
    const { task } = this.props;
    this.props.commit(Object.assign({}, task, { done: !task.done }));
  }

  handleSave(e) {
    const { task } = this.props;
    const { title } = this.state;
    if (task.title !== title) {
      this.props.commit(Object.assign({}, task, { title }));
    }
  }

  render() {
    const { task } = this.props;
    const { title } = this.state;
    return (
      <div className={`story-task${task.done ? ' done' : ''}`}>
        <input type='checkbox' checked={task.done}
          onChange={this.handleCheckbox} />
        <textarea rows='1' type='text' value={title}
          ref={instance => this.textInput = instance }
          onFocus={this.handleFocus(true)}
          onBlur={this.handleFocus(false)}
          onChange={this.handleChange} />
        <button ref={instance => this.saveButton = instance}
          className='hide'
          onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  commit: task => dispatch(updateTask(task))
});

export default connect(
  null,
  mapDispatchToProps
)(StoryTask);
