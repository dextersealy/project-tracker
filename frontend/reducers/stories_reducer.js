import {
  RECEIVE_ALL_STORIES,
  RECEIVE_STORY,
  RECEIVE_DELETE_STORY,
} from '../actions/story_actions';

const defaultState = {}

const StoriesReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_STORIES:
      return action.stories;

    case RECEIVE_STORY: {
      let newState = Object.assign({}, state);
      newState[action.story.id] = action.story;
      return newState;
    }

    case RECEIVE_DELETE_STORY: {
      let newState = Object.assign({}, state);
      delete newState[action.story.id];
      return newState;
    }

    default:
      return state;
  }
};

export default StoriesReducer;
