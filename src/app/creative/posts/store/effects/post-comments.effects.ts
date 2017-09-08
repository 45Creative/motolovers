import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { PostCommentsService } from '../../services/post-comments.services';
import { PostService } from '../../services/post.services';
import { CommentService } from '../../services/comment.services';

import * as fromPostComments from '../actions/post-comments.actions';
import * as fromPost from '../actions/post.actions';
import * as fromComment from '../actions/comment.actions';

import {PostComments} from '../../model';

@Injectable()
export class PostCommentsEffects {

  @Effect()
  loadPostCommentAction$ = this.actions$
    .ofType(fromPostComments.PostCommentsTypes.LOAD_POST_COMMENTS)
    .map((action: fromPostComments.LoadPostCommentsAction) => action.payload)
    .switchMap(payload => this.PostCommentsService.loadPostsComments(payload.posts, payload.comments))
    .map(res => new fromPostComments.LoadPostCommentsCompletedAction({postComments: res}))
    .catch(() => Observable.of({ type: fromPostComments.PostCommentsTypes.LOAD_POST_COMMENTS_ERROR }));

  constructor(
    private PostCommentsService: PostCommentsService,
    private actions$: Actions
  ) { }

}
