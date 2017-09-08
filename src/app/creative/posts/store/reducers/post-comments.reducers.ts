import { PostCommentsAction, PostCommentsTypes } from '../actions/post-comments.actions';
import { PostCommentsState, postCommentsInitialState } from '../state/post-comments.state';

export function postCommentsReducer(
  state = postCommentsInitialState, action: PostCommentsAction): PostCommentsState {
  switch (action.type) {

    case PostCommentsTypes.LOAD_POST_COMMENTS: {
      return Object.assign({}, state, {
        posts: action.payload.posts,
        comments: action.payload.comments,
        postComments: null,
        isLoadingPostComments: true,
        error: null
      });
    }

    case PostCommentsTypes.LOAD_POST_COMMENTS_COMPLETED: {
      return Object.assign({}, state, {
        posts: action.payload.posts,
        comments: action.payload.comments,
        postComments: action.payload.postComments,
        isLoadingPostComments: false,
        error: null
      });
    }

    case PostCommentsTypes.LOAD_POST_COMMENTS_ERROR: {
      return Object.assign({}, state, {
        posts: null,
        comments: null,
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
export const getError = (state: PostCommentsState) => state.error;
