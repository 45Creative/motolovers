import { PostCommentsAction, PostCommentsTypes } from '../actions/post-comments.actions';
import { PostCommentsState, postCommentsInitialState } from '../state/post-comments.state';
import { Post } from '../../model';

export function postCommentsReducer(
  state = postCommentsInitialState, action: PostCommentsAction): PostCommentsState {
  switch (action.type) {

    case PostCommentsTypes.LOAD_POST_COMMENTS: {
      return Object.assign({}, state, {
        posts: action.payload.posts,
        comments: action.payload.comments,
        isLoadingPostComments: true,
      });
    }

    case PostCommentsTypes.LOAD_POST_COMMENTS_COMPLETED: {
      return Object.assign({}, state, {
        postComments: action.payload.postComments,
        isLoadingPostComments: false,
        error: null
      });
    }

    case PostCommentsTypes.LOAD_POST_COMMENTS_ERROR: {
      return Object.assign({}, state, {
        postComments: null,
        isLoadingPostComments: false,
        error: action.payload.error
      });
    }

    default: {
      return state;
    }
  }
}

export const getPostComments = (state: PostCommentsState) => state.postComments;
export const getIsLoadingPostComments = (state: PostCommentsState) => state.isLoadingPostComments;
export const getErrorPostComments = (state: PostCommentsState) => state.error;
