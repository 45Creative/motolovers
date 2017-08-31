import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { PostService } from '../../services/post.services';

import * as fromPost from '../actions/post.actions';

@Injectable()
export class PostEffects {

  @Effect()
  loadPostAction$ = this.actions$
    .ofType(fromPost.PostTypes.LOAD_POST)
    .map((action: fromPost.LoadPostAction) => action.payload)
    .switchMap(() => this.postService.loadPosts())
    .map(res => new fromPost.LoadPostCompletedAction({posts: res}))
    .catch(() => Observable.of({ type: fromPost.PostTypes.LOAD_POST_ERROR }));

  @Effect()
  createPostAction$ = this.actions$
    .ofType(fromPost.PostTypes.CREATE_POST)
    .map((action: fromPost.CreatePostAction) => action.payload)
    .switchMap(payload => this.postService.createPost(payload.post))
    .map(res => new fromPost.CreatePostCompletedAction({post: res}))
    .catch(() => Observable.of({ type: fromPost.PostTypes.CREATE_POST_ERROR }));

  @Effect()
  updatePostAction$ = this.actions$
    .ofType(fromPost.PostTypes.UPDATE_POST)
    .map((action: fromPost.UpdatePostAction) => action.payload)
    .switchMap(payload => this.postService.updatePost(payload.post))
    .map(res => new fromPost.UpdatePostCompletedAction({post: res}))
    .catch(() => Observable.of({ type: fromPost.PostTypes.UPDATE_POST_ERROR }));

  @Effect()
  removePostAction$ = this.actions$
    .ofType(fromPost.PostTypes.REMOVE_POST)
    .map((action: fromPost.RemovePostAction) => action.payload)
    .switchMap(payload => this.postService.deletePost(payload.post))
    .map(res => new fromPost.RemovePostCompletedAction({post: res}))
    .catch(() => Observable.of({ type: fromPost.PostTypes.REMOVE_POST_ERROR }));

  @Effect()
  likePostAction$ = this.actions$
    .ofType(fromPost.PostTypes.LIKE_POST)
    .map((action: fromPost.LikePostAction) => action.payload)
    .switchMap(payload => this.postService.likePost(payload.post, payload.user))
    .map(res => new fromPost.LikePostCompletedAction({post: res}))
    .catch(() => Observable.of({ type: fromPost.PostTypes.LIKE_POST_ERROR }));

  constructor(
    private postService: PostService,
    private actions$: Actions
  ) { }

}
