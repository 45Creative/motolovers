import { PostComments, Post, Comment } from '../../model';

export interface PostCommentsState {
  postComments: PostComments[];
  isLoadingPostComments: boolean;
  error: any;
}

export const postCommentsInitialState: PostCommentsState = {
  postComments: null,
  isLoadingPostComments: true,
  error: null,
};
