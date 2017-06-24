import * as APIUtil from '../util/story_api_util';
import { receiveErrors } from './error_actions';

export const RECEIVE_STORY = 'RECEIVE_STORY';
export const RECEIVE_DELETE_STORY = 'RECEIVE_DELETE_STORY';

const receiveStory = story => ({
  type: RECEIVE_STORY,
  story
});

const receiveDeleteStory = story => ({
  type: RECEIVE_DELETE_STORY,
  story
});

export const createStory = story => dispatch => (
  APIUtil.createStory(story)
    .done(story => dispatch(receiveStory(story)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const updateStory = story => dispatch => (
  APIUtil.updateStory(story)
    .done(story => dispatch(receiveStory(story)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const deleteStory = story => dispatch => (
  APIUtil.deleteStory(story)
    .done(() => dispatch(receiveDeleteStory(story)))
    .fail(errors => dispatch(receiveErrors(errors)))
);
