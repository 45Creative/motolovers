import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import '../../../rxjs-extensions';
import { PostComment, Post, Comment } from '../model';

import * as fromCreative from '../../reducers';

@Injectable()
export class PostCommentService {

  constructor(
    private creativeStore: Store<fromCreative.CreativeState>
  ) {
  }

  /*
  loadCommnentsPosts(): Observable<PostComment[]> {

    const posts$: Observable<Post[]> = this.creativeStore.select(fromCreative.getPosts);
    const comments$: Observable<Comment[]> = this.creativeStore.select(fromCreative.getComments);

    return Observable.combineLatest(posts$, comments$, (posts, comments) => {
      return posts.map( post => Object.assign({}, post, {
        comments: comments.filter(comment => comment.post === post)
      }));
    });

  }
  */

}
