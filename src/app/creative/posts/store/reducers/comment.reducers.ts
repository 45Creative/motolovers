import { CommentAction, CommentTypes } from '../actions/comment.actions';
import { CommentState, commentInitialState } from '../state/comment.state';
import { Comment } from '../../model';

export function commentReducer(
  state = commentInitialState, action: CommentAction): CommentState {
  switch (action.type) {

    case CommentTypes.LOAD_USER_COMMENT: {
      return Object.assign({}, state, {
        comment: null,
        comments: null,
        isLoadingComments: true,
        error: null
      });
    }

    case CommentTypes.LOAD_USER_COMMENT_COMPLETED: {
      return Object.assign({}, state, {
        comment: null,
        comments: action.payload.comments,
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.LOAD_USER_COMMENT_ERROR: {
      return Object.assign({}, state, {
        comment: null,
        comments: null,
        isLoadingComments: false,
        error: action.payload.error
      });
    }

    case CommentTypes.LOAD_COMMENT: {
      return Object.assign({}, state, {
        isLoadingComments: true,
        error: null
      });
    }

    case CommentTypes.LOAD_COMMENT_COMPLETED: {
      return Object.assign({}, state, {
        comments: action.payload.comments,
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.LOAD_COMMENT_ERROR: {
      return Object.assign({}, state, {
        comment: null,
        comments: null,
        isLoadingComments: false,
        error: action.payload.error
      });
    }

    case CommentTypes.CREATE_COMMENT: {
      return Object.assign({}, state, {
        comment: action.payload.comment,
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.CREATE_COMMENT_COMPLETED: {
      return Object.assign({}, state, {
        comments: action.payload.comments,
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.CREATE_COMMENT_ERROR: {
      return Object.assign({}, state, {
        comment: null,
        comments: null,
        isLoadingComments: false,
        error: action.payload.error
      });
    }

    case CommentTypes.UPDATE_COMMENT: {
      return Object.assign({}, state, {
        comment: action.payload.comment,
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.UPDATE_COMMENT_COMPLETED: {
      const comment = action.payload;
      return Object.assign({}, state, {
        comments: action.payload.comments,
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.UPDATE_COMMENT_ERROR: {
      return Object.assign({}, state, {
        comment: null,
        comments: null,
        isLoadingComments: false,
        error: action.payload.error
      });
    }

    case CommentTypes.REMOVE_COMMENT: {
      return Object.assign({}, state, {
        comment: action.payload.comment,
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.REMOVE_COMMENT_COMPLETED: {
      return Object.assign({}, state, {
        comments: state.comments.filter((comment: Comment) => {
            return comment !== action.payload.comment;
          }),
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.REMOVE_COMMENT_ERROR: {
      return Object.assign({}, state, {
        comment: null,
        comments: null,
        isLoadingComments: false,
        error: action.payload.error
      });
    }

    case CommentTypes.LIKE_COMMENT: {
      return Object.assign({}, state, {
        comment: action.payload.comment,
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.LIKE_COMMENT_COMPLETED: {
      return Object.assign({}, state, {
        user: action.payload.user,
        comment: action.payload.comment,
        isLoadingComments: false,
        error: null
      });
    }

    case CommentTypes.LIKE_COMMENT_ERROR: {
      return Object.assign({}, state, {
        comment: null,
        comments: null,
        isLoadingComments: false,
        error: action.payload.error
      });
    }

    default: {
      return state;
    }
  }
}

export const getComment = (state: CommentState) => state.comment;
export const getComments = (state: CommentState) => state.comments;
export const getIsLoadingComments = (state: CommentState) => state.isLoadingComments;
export const getError = (state: CommentState) => state.error;
