import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { CommentService } from '../../services/comment.services';

import * as fromComment from '../actions/comment.actions';

@Injectable()
export class CommentEffects {

  @Effect()
  loadCommentAction$ = this.actions$
    .ofType(fromComment.CommentTypes.LOAD_COMMENT)
    .map((action: fromComment.LoadCommentAction) => action.payload)
    .switchMap(() => this.commentService.loadComments())
    .map(res => new fromComment.LoadCommentCompletedAction({comments: res}))
    .catch(() => Observable.of({ type: fromComment.CommentTypes.LOAD_COMMENT_ERROR }));

  @Effect()
  createCommentAction$ = this.actions$
    .ofType(fromComment.CommentTypes.CREATE_COMMENT)
    .map((action: fromComment.CreateCommentAction) => action.payload)
    .switchMap(payload => this.commentService.createComment(payload.comment))
    .map(res => new fromComment.CreateCommentCompletedAction({comments: res}))
    .catch(() => Observable.of({ type: fromComment.CommentTypes.CREATE_COMMENT_ERROR }));

  @Effect()
  updateCommentAction$ = this.actions$
    .ofType(fromComment.CommentTypes.UPDATE_COMMENT)
    .map((action: fromComment.UpdateCommentAction) => action.payload)
    .switchMap(payload => this.commentService.updateComment(payload.comment))
    .map(res => new fromComment.UpdateCommentCompletedAction({comments: res}))
    .catch(() => Observable.of({ type: fromComment.CommentTypes.UPDATE_COMMENT_ERROR }));

  @Effect()
  removeCommentAction$ = this.actions$
    .ofType(fromComment.CommentTypes.REMOVE_COMMENT)
    .map((action: fromComment.RemoveCommentAction) => action.payload)
    .switchMap(payload => this.commentService.deleteComment(payload.comment))
    .map(res => new fromComment.RemoveCommentCompletedAction({comments: res}))
    .catch(() => Observable.of({ type: fromComment.CommentTypes.REMOVE_COMMENT_ERROR }));

  @Effect()
  likeCommentAction$ = this.actions$
    .ofType(fromComment.CommentTypes.LIKE_COMMENT)
    .map((action: fromComment.LikeCommentAction) => action.payload)
    .switchMap(payload => this.commentService.likeComment(payload.comment, payload.user))
    .map(res => new fromComment.LikeCommentCompletedAction({comment: res}))
    .catch(() => Observable.of({ type: fromComment.CommentTypes.LIKE_COMMENT_ERROR }));

  constructor(
    private commentService: CommentService,
    private actions$: Actions
  ) { }

}
