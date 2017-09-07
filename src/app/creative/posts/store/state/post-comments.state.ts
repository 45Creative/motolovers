import { PostComments, Post, Comment } from '../../model';

export interface PostCommentsState {
  posts: Post[];
  comments: Comment[];
  postComments: PostComments[];
  isLoadingPostComments: boolean;
  error: any;
}

export const postCommentsInitialState: PostCommentsState = {
  posts: null,
  comments: null,
  postComments: null,
  isLoadingPostComments: true,
  error: null,
}
