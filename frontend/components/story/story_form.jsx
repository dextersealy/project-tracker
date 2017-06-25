import React from 'react';
import { connect } from 'react-redux';
import * as FormUtil from '../../util/form_util';
import * as StoryUtil from './story_util';
import { selectUser } from '../../util/selectors';

class StoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.story);
    this.handleChange = FormUtil.handleChange.bind(this);
  }

  render() {
    return (
      <div className='story-form'>
        {this.renderTitle()}
        {this.renderActions()}
        <div className='options'>
          {this.renderKind()}
          {this.renderPoints()}
          {this.renderState()}
          {this.renderRequester()}
        </div>
        {this.renderDescription()}
      </div>
    );
  }

  renderTitle() {
    const { title } = this.state;
    const { handleClose } = this.props;
    return (
      <div className='title'>
        <i onClick={handleClose} className='caret fa fa-caret-down'/>
        <input type='text' value={title} onChange={this.handleChange('title')}/>
      </div>
    );
  }

  renderActions() {
    const { handleClose } = this.props;
    return (
      <div className='actions'>
        <button type='button' onClick={handleClose}>Close</button>
      </div>
    );
  }

  renderKind() {
    const { kind } = this.state;
    return (
      <div>
        <span className='label'>Story type</span>
        <div className='story-type'>
          {StoryUtil.renderKind(kind)}
          <button className='drop-down'>{kind}</button>
        </div>
      </div>
    );
  }

  renderPoints() {
    const { points } = this.state;
    return (
      <div>
        <span className='label'>Points</span>
        <div className='story-points'>
          <button className='drop-down'>{points} Points</button>
        </div>
      </div>
    );
  }

  renderState() {
    const { state } = this.state;
    return (
      <div>
        <span className='label'>State</span>
        <div className='story-state'>
          <button className='drop-down'>{state}</button>
        </div>
      </div>
    );
  }

  renderRequester() {
    const { requester } = this.props;
    return (
      <div>
        <span className='label'>Requester</span>
        <div className='story-requester'>
          <button className='drop-down'>{requester}</button>
        </div>
      </div>
    );
  }

  renderDescription() {
    const { description } = this.state;
    return (
      <div className='description'>
        <label htmlFor='description'>Description</label>
        <textarea id='description' placeholder='Add a description' rows='3'
          onChange={this.handleChange('description')} value={description}/>
      </div>
    );
  }
}

const mapStateToProps = (state, { story }) => ({
  requester: selectUser(state, story.author_id)['name']
});

export default connect(
  mapStateToProps
)(StoryForm);
