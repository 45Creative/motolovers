import { createSelector, createFeatureSelector } from '@ngrx/store';

import { PostState } from '../posts/store/state/post.state';
import { ProfileState } from '../profile/store/state/profile.state';

import * as fromPost from '../posts/store/reducers/post.reducers';
import * as fromProfile from '../profile/store/reducers/profile.reducers';

export interface CreativeState {
  post: PostState;
  profile: ProfileState;
}

export const reducers = {
  post: fromPost.postReducer,
  profile: fromProfile.profileReducer
}

/**
 *
 * @param state
 */
export const getPostState = (state: CreativeState) => state.post;

export const getPost            = createSelector(getPostState, fromPost.getPost);
export const getPosts           = createSelector(getPostState, fromPost.getPosts);
export const getIsLoadingPosts  = createSelector(getPostState, fromPost.getIsLoadingPosts);
export const getError           = createSelector(getPostState, fromPost.getError);

/**
 *
 * @param state
 */
export const getProfileState = (state: CreativeState) => state.profile;

export const getProfile         = createSelector(getProfileState, fromProfile.getProfile);
export const getPicture         = createSelector(getProfileState, fromProfile.getProfilePicture);
export const getProfileError    = createSelector(getProfileState, fromProfile.getError);
