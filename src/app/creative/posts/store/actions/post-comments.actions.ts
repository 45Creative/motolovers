import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';

import { PostComments, Post, Comment } from '../../model';
import { type } from "../../../../core/utils/utils";

export const PostCommentsTypes = {
  LOAD_POST_COMMENTS: type('[Post-Comment] -LOAD Requested-'),
  LOAD_POST_COMMENTS_COMPLETED: type('[Post-Comment] -LOAD SUCCESS-'),
  LOAD_POST_COMMENTS_ERROR: type('[Post-Comment] -LOAD Error-'),
};

export class LoadPostCommentsAction implements Action {
  type = PostCommentsTypes.LOAD_POST_COMMENTS;

  constructor(public payload: {posts: Post[], comments: Comment[]}) { }
}

export class LoadPostCommentsCompletedAction implements Action {
  type = PostCommentsTypes.LOAD_POST_COMMENTS_COMPLETED;

  constructor(public payload: {postComments: PostComments[]}) { }
}

export class LoadPostCommentsErrorAction implements Action {
  type = PostCommentsTypes.LOAD_POST_COMMENTS_ERROR;

  constructor(public payload: string) { }
}

export type PostCommentsAction
  = LoadPostCommentsAction
  | LoadPostCommentsCompletedAction
  | LoadPostCommentsErrorAction;
