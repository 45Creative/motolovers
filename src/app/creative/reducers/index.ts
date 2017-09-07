import { createSelector, createFeatureSelector } from '@ngrx/store';

import { PostState } from '../posts/store/state/post.state';
import { CommentState } from '../posts/store/state/comment.state';
import { PostCommentsState } from '../posts/store/state/post-comments.state';
import { ProfileState } from '../profile/store/state/profile.state';

import * as fromPost from '../posts/store/reducers/post.reducers';
import * as fromComment from '../posts/store/reducers/comment.reducers';
import * as fromPostComments from '../posts/store/reducers/post-comments.reducers';
import * as fromProfile from '../profile/store/reducers/profile.reducers';

export interface CreativeState {
  post: PostState;
  comment: CommentState;
  postComments: PostCommentsState;
  profile: ProfileState;
}

export const reducers = {
  post: fromPost.postReducer,
  comment: fromComment.commentReducer,
  postComments: fromPostComments.postCommentsReducer,
  profile: fromProfile.profileReducer
};

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
export const getCommentState = (state: CreativeState) => state.comment;

export const getComment            = createSelector(getCommentState, fromComment.getComment);
export const getComments           = createSelector(getCommentState, fromComment.getComments);
export const getIsLoadingComments  = createSelector(getCommentState, fromComment.getIsLoadingComments);
export const getErrorComment       = createSelector(getCommentState, fromComment.getError);

/**
 *
 * @param state
 */
export const getPostCommentsState = (state: CreativeState) => state.postComments;

export const getPostComments          = createSelector(getPostCommentsState, fromPostComments.getPostComments);
export const getIsLoadingPostComments = createSelector(getPostCommentsState, fromPostComments.getIsLoadingPostComments);
export const getErrorPostComments     = createSelector(getPostCommentsState, fromPostComments.getError);

/**
 *
 * @param state
 */
export const getProfileState = (state: CreativeState) => state.profile;

export const getProfile         = createSelector(getProfileState, fromProfile.getProfile);
export const getPicture         = createSelector(getProfileState, fromProfile.getProfilePicture);
export const getProfileError    = createSelector(getProfileState, fromProfile.getError);
