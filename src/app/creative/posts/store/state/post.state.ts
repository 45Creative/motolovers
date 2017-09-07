import { Post } from '../../model';
import { User } from '../../../../core/auth/model';

export interface PostState {
  post: Post;
  posts: Post[];
  isLoadingPosts: boolean;
  error: any;
  user: User;
}

export const postInitialState: PostState = {
  post: null,
  posts: null,
  isLoadingPosts: true,
  error: null,
  user: null
};
