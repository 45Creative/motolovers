import { PostAction, PostTypes } from '../actions/post.actions';
import { PostState, postInitialState } from '../state/post.state';
import { Post } from '../../model';

export function postReducer(
  state = postInitialState, action: PostAction): PostState {
  switch (action.type) {

    case PostTypes.LOAD_USER_POST: {
      return Object.assign({}, state, {
        post: null,
        posts: null,
        isLoadingPosts: true,
        error: null
      });
    }

    case PostTypes.LOAD_USER_POST_COMPLETED: {
      return Object.assign({}, state, {
        post: null,
        posts: action.payload.posts,
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.LOAD_USER_POST_ERROR: {
      return Object.assign({}, state, {
        post: null,
        posts: null,
        isLoadingPosts: false,
        error: action.payload.error
      });
    }

    case PostTypes.LOAD_POST: {
      return Object.assign({}, state, {
        post: null,
        posts: null,
        isLoadingPosts: true,
        error: null
      });
    }

    case PostTypes.LOAD_POST_COMPLETED: {
      return Object.assign({}, state, {
        post: null,
        posts: action.payload.posts,
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.LOAD_POST_ERROR: {
      return Object.assign({}, state, {
        post: null,
        posts: null,
        isLoadingPosts: false,
        error: action.payload.error
      });
    }

    case PostTypes.CREATE_POST: {
      return Object.assign({}, state, {
        post: action.payload.post,
        posts: action.payload.posts,
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.CREATE_POST_COMPLETED: {
      return Object.assign({}, state, {
        post: action.payload.post,
        posts: action.payload.posts,
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.CREATE_POST_ERROR: {
      return Object.assign({}, state, {
        post: null,
        posts: null,
        isLoadingPosts: false,
        error: action.payload.error
      });
    }

    case PostTypes.UPDATE_POST: {

      return Object.assign({}, state, {
        post: action.payload.post,
        posts: null,
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.UPDATE_POST_COMPLETED: {

      const post = action.payload;

      return Object.assign({}, state, {
        post: state.post,
        posts: null,
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.UPDATE_POST_ERROR: {
      return Object.assign({}, state, {
        post: null,
        posts: null,
        isLoadingPosts: false,
        error: action.payload.error
      });
    }

    case PostTypes.REMOVE_POST: {

      return Object.assign({}, state, {
        post: action.payload.post,
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.REMOVE_POST_COMPLETED: {

      return Object.assign({}, state, {
        post: action.payload.post,
        posts: state.posts.filter((post: Post) => {
            return post.id !== action.payload.post.id;
          }),
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.REMOVE_POST_ERROR: {
      return Object.assign({}, state, {
        post: null,
        posts: null,
        isLoadingPosts: false,
        error: action.payload.error
      });
    }

    case PostTypes.LIKE_POST: {
      
      return Object.assign({}, state, {
        post: action.payload.post,
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.LIKE_POST_COMPLETED: {

      return Object.assign({}, state, {
        user: action.payload.user,
        post: action.payload.post,
        isLoadingPosts: false,
        error: null
      });
    }

    case PostTypes.LIKE_POST_ERROR: {
      return Object.assign({}, state, {
        post: null,
        posts: null,
        isLoadingPosts: false,
        error: action.payload.error
      });
    }

    default: {
      return state;
    }
  }
}

export const getPost = (state: PostState) => state.post;
export const getPosts = (state: PostState) => state.posts;
export const getIsLoadingPosts = (state: PostState) => state.isLoadingPosts;
export const getError = (state: PostState) => state.error;
