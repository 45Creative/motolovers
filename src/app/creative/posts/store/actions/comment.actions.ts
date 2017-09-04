import { Action } from '@ngrx/store';
import {Injectable} from '@angular/core';

import { Comment } from '../../model';
import { User } from '../../../../core/auth/model';
import { type } from "../../../../core/utils/utils";

export const CommentTypes = {
  LOAD_COMMENT: type('[Comment] -LOAD Requested-'),
  LOAD_COMMENT_COMPLETED: type('[Comment] -LOAD SUCCESS-'),
  LOAD_COMMENT_ERROR: type('[Comment] -LOAD Error-'),

  LOAD_USER_COMMENT: type('[Comment] -USER LOAD Requested-'),
  LOAD_USER_COMMENT_COMPLETED: type('[Comment] -USER LOAD Completed-'),
  LOAD_USER_COMMENT_ERROR: type('[Comment] -USER LOAD Error-'),

  CREATE_COMMENT: type('[Comment] -CREATE Requested-'),
  CREATE_COMMENT_COMPLETED: type('[Comment] -CREATE Completed-'),
  CREATE_COMMENT_ERROR: type('[Comment] -CREATE Error-'),

  UPDATE_COMMENT: type('[Comment] -UPDATE Requested-'),
  UPDATE_COMMENT_COMPLETED: type('[Comment] -UPDATE Completed-'),
  UPDATE_COMMENT_ERROR: type('[Comment] -UPDATE Error-'),

  REMOVE_COMMENT: type('[Comment] -REMOVE Requested-'),
  REMOVE_COMMENT_COMPLETED: type('[Comment] -REMOVE Completed-'),
  REMOVE_COMMENT_ERROR: type('[Comment] -REMOVE Error-'),

  LIKE_COMMENT: type('[Comment] -LIKE Requested-'),
  LIKE_COMMENT_COMPLETED: type('[Comment] -LIKE Completed-'),
  LIKE_COMMENT_ERROR: type('[Comment] -LIKE Error-')
};

export class LoadCommentAction implements Action {
  type = CommentTypes.LOAD_COMMENT;

  constructor(public payload: any = null) { }
}

export class LoadCommentCompletedAction implements Action {
  type = CommentTypes.LOAD_COMMENT_COMPLETED;

  constructor(public payload: {comments: Comment[]}) { }
}

export class LoadCommentErrorAction implements Action {
  type = CommentTypes.LOAD_COMMENT_ERROR;

  constructor(public payload: string) { }
}

export class LoadUserCommentAction implements Action {
  type = CommentTypes.LOAD_USER_COMMENT;

  constructor(public payload: {user: User}) { }
}

export class LoadUserCommentCompletedAction implements Action {
  type = CommentTypes.LOAD_USER_COMMENT_COMPLETED;

  constructor(public payload: {comments: Comment[]}) { }
}

export class LoadUserCommentErrorAction implements Action {
  type = CommentTypes.LOAD_USER_COMMENT_ERROR;

  constructor(public payload: string) { }
}

export class CreateCommentAction implements Action {
  type = CommentTypes.CREATE_COMMENT;

  constructor(public payload: {comment: Comment}) { }
}

export class CreateCommentCompletedAction implements Action {
  type = CommentTypes.CREATE_COMMENT_COMPLETED;

  constructor(public payload: {comments: Comment[]}) { }
}

export class CreateCommentErrorAction implements Action {
  type = CommentTypes.CREATE_COMMENT_ERROR;

  constructor(public payload: string) { }
}

export class UpdateCommentAction implements Action {
  type = CommentTypes.UPDATE_COMMENT;

  constructor(public payload: {comment: Comment}) { }
}

export class UpdateCommentCompletedAction implements Action {
  type = CommentTypes.UPDATE_COMMENT_COMPLETED;

  constructor(public payload: {comments: Comment[]}) { }
}

export class UpdateCommentErrorAction implements Action {
  type = CommentTypes.UPDATE_COMMENT_ERROR;

  constructor(public payload: string) { }
}

export class RemoveCommentAction implements Action {
  type = CommentTypes.REMOVE_COMMENT;

  constructor(public payload: {comment: Comment}) { }
}

export class RemoveCommentCompletedAction implements Action {
  type = CommentTypes.REMOVE_COMMENT_COMPLETED;

  constructor(public payload: {comments: Comment[]}) { }
}

export class RemoveCommentErrorAction implements Action {
  type = CommentTypes.REMOVE_COMMENT_ERROR;

  constructor(public payload: string) { }
}

export class LikeCommentAction implements Action {
  type = CommentTypes.LIKE_COMMENT;

  constructor(public payload: {comment: Comment, user: User}) { }
}

export class LikeCommentCompletedAction implements Action {
  type = CommentTypes.LIKE_COMMENT_COMPLETED;

  constructor(public payload: {comment: Comment}) { }
}

export class LikeCommentErrorAction implements Action {
  type = CommentTypes.LIKE_COMMENT_ERROR;

  constructor(public payload: string) { }
}

export type CommentAction
  = LoadCommentAction
  | LoadCommentCompletedAction
  | LoadCommentErrorAction
  | LoadUserCommentAction
  | LoadUserCommentCompletedAction
  | LoadUserCommentErrorAction
  | CreateCommentAction
  | CreateCommentCompletedAction
  | CreateCommentErrorAction
  | UpdateCommentAction
  | UpdateCommentCompletedAction
  | UpdateCommentErrorAction
  | RemoveCommentAction
  | RemoveCommentCompletedAction
  | RemoveCommentErrorAction
  | LikeCommentAction
  | LikeCommentCompletedAction
  | LikeCommentErrorAction;
