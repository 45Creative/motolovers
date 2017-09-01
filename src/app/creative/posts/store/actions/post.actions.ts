import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';

import { Post } from '../../model';
import { User } from '../../../../core/auth/model';
import { type } from "../../../../core/utils/utils";

export const PostTypes = {
  LOAD_POST: type('[Post] -LOAD Requested-'),
  LOAD_POST_COMPLETED: type('[Post] -LOAD SUCCESS-'),
  LOAD_POST_ERROR: type('[Post] -LOAD Error-'),

  LOAD_USER_POST: type('[Post] -USER LOAD Requested-'),
  LOAD_USER_POST_COMPLETED: type('[Post] -USER LOAD Completed-'),
  LOAD_USER_POST_ERROR: type('[Post] -USER LOAD Error-'),

  CREATE_POST: type('[Post] -CREATE Requested-'),
  CREATE_POST_COMPLETED: type('[Post] -CREATE Completed-'),
  CREATE_POST_ERROR: type('[Post] -CREATE Error-'),

  UPDATE_POST: type('[Post] -UPDATE Requested-'),
  UPDATE_POST_COMPLETED: type('[Post] -UPDATE Completed-'),
  UPDATE_POST_ERROR: type('[Post] -UPDATE Error-'),

  REMOVE_POST: type('[Post] -REMOVE Requested-'),
  REMOVE_POST_COMPLETED: type('[Post] -REMOVE Completed-'),
  REMOVE_POST_ERROR: type('[Post] -REMOVE Error-'),

  LIKE_POST: type('[Post] -LIKE Requested-'),
  LIKE_POST_COMPLETED: type('[Post] -LIKE Completed-'),
  LIKE_POST_ERROR: type('[Post] -LIKE Error-')
};

export class LoadPostAction implements Action {
  type = PostTypes.LOAD_POST;

  constructor(public payload: any = null) { }
}

export class LoadPostCompletedAction implements Action {
  type = PostTypes.LOAD_POST_COMPLETED;

  constructor(public payload: {posts: Post[]}) { }
}

export class LoadPostErrorAction implements Action {
  type = PostTypes.LOAD_POST_ERROR;

  constructor(public payload: string) { }
}

export class LoadUserPostAction implements Action {
  type = PostTypes.LOAD_USER_POST;

  constructor(public payload: {user: User}) { }
}

export class LoadUserPostCompletedAction implements Action {
  type = PostTypes.LOAD_USER_POST_COMPLETED;

  constructor(public payload: {posts: Post[]}) { }
}

export class LoadUserPostErrorAction implements Action {
  type = PostTypes.LOAD_USER_POST_ERROR;

  constructor(public payload: string) { }
}

export class CreatePostAction implements Action {
  type = PostTypes.CREATE_POST;

  constructor(public payload: {post: Post}) { }
}

export class CreatePostCompletedAction implements Action {
  type = PostTypes.CREATE_POST_COMPLETED;

  constructor(public payload: {posts: Post[]}) { }
}

export class CreatePostErrorAction implements Action {
  type = PostTypes.CREATE_POST_ERROR;

  constructor(public payload: string) { }
}

export class UpdatePostAction implements Action {
  type = PostTypes.UPDATE_POST;

  constructor(public payload: {post: Post}) { }
}

export class UpdatePostCompletedAction implements Action {
  type = PostTypes.UPDATE_POST_COMPLETED;

  constructor(public payload: {post: Post}) { }
}

export class UpdatePostErrorAction implements Action {
  type = PostTypes.UPDATE_POST_ERROR;

  constructor(public payload: string) { }
}

export class RemovePostAction implements Action {
  type = PostTypes.REMOVE_POST;

  constructor(public payload: {post: Post}) { }
}

export class RemovePostCompletedAction implements Action {
  type = PostTypes.REMOVE_POST_COMPLETED;

  constructor(public payload: {post: Post}) { }
}

export class RemovePostErrorAction implements Action {
  type = PostTypes.REMOVE_POST_ERROR;

  constructor(public payload: string) { }
}

export class LikePostAction implements Action {
  type = PostTypes.LIKE_POST;

  constructor(public payload: {post: Post, user: User}) { }
}

export class LikePostCompletedAction implements Action {
  type = PostTypes.LIKE_POST_COMPLETED;

  constructor(public payload: {post: Post}) { }
}

export class LikePostErrorAction implements Action {
  type = PostTypes.LIKE_POST_ERROR;

  constructor(public payload: string) { }
}

export type PostAction
  = LoadPostAction
  | LoadPostCompletedAction
  | LoadPostErrorAction
  | LoadUserPostAction
  | LoadUserPostCompletedAction
  | LoadUserPostErrorAction
  | CreatePostAction
  | CreatePostCompletedAction
  | CreatePostErrorAction
  | UpdatePostAction
  | UpdatePostCompletedAction
  | UpdatePostErrorAction
  | RemovePostAction
  | RemovePostCompletedAction
  | RemovePostErrorAction
  | LikePostAction
  | LikePostCompletedAction
  | LikePostErrorAction;
