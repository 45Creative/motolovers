import { Comment } from '../../model';
import { User } from '../../../../core/auth/model';

export interface CommentState {
  comment: Comment;
  comments: Comment[];
  isLoadingComments: boolean;
  error: any;
  user: User;
}

export const commentInitialState: CommentState = {
  comment: null,
  comments: null,
  isLoadingComments: true,
  error: null,
  user: null
}
