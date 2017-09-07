import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import '../../../rxjs-extensions';
import { PostComments, Post, Comment } from '../model';

import * as fromCreative from '../../reducers';

@Injectable()
export class PostCommentsService {

  constructor(
    private creativeStore: Store<fromCreative.CreativeState>
  ) {
  }

  loadPostsComments(posts$: Post[], comments$: Comment[]): Observable<PostComments[]> {

    return Observable.combineLatest(posts$, comments$, (posts, comments) => {
      return posts.map( post => Object.assign({}, {post: post}, {
        comments: comments.filter(comment => comment.post === post)
      }));
    });

  }

}
