import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStory } from '../../actions/story_actions';

class StoryIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteStory(this.props.story);
  }

  render() {
    const { story } = this.props;
    return (
      <li className='item'>
        <Link className='title' to={`/story/${story.id}`}>
          {story.title}
        </Link>
        <div className='controls'>
          <Link className='button' to={`/storys/edit/${story.id}`}>Edit</Link>
          <button type="button" onClick={this.handleDelete}>Delete</button>
        </div>
      </li>
    );
  }
}

const mapDisptachToProps = dispatch => ({
  deleteStory: (story) => dispatch(deleteStory(story))
});

export default connect(
  null,
  mapDisptachToProps
)(StoryIndexItem);
