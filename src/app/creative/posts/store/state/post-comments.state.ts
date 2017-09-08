import { PostComments, Post, Comment } from '../../model';

export interface PostCommentsState {
  postComments: PostComments[];
  comments: Comment[];
  posts: Post[];
  isLoadingPostComments: boolean;
  error: any;
}

export const postCommentsInitialState: PostCommentsState = {
  postComments: null,
  comments: null,
  posts:null,
  isLoadingPostComments: true,
  error: null,
};
