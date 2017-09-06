import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog, MdSnackBar, MdSnackBarConfig } from "@angular/material";
import { fadeInAnimation } from "../../../../route.animation";

import { PostComponent } from '../post/post.component';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../core/reducers';
import * as fromCreative from '../../../reducers';

import * as postActions from '../../store/actions/post.actions';
import * as commentActions from '../../store/actions/comment.actions';

import { User } from '../../../../core/auth/model';
import { Post, Comment, PostComment } from '../../model';

@Component({
  selector: 'ms-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostListComponent implements OnInit {

  user$: Observable<User>;
  posts$: Observable<Post[]>;
  comments$: Observable<Comment[]>;
  postComments$: Observable<any>;
  user: User;
  posts: Post[];

  // Hide Snackbar
  autoHide: number = 3000;

  constructor(
    public postDialog: MdDialog,
    private snackBar: MdSnackBar,
    private store: Store<fromRoot.AppState>,
    private creativeStore: Store<fromCreative.CreativeState>
  ) {
    this.creativeStore.dispatch(
      new postActions.LoadPostAction()
    );
    this.creativeStore.dispatch(
      new commentActions.LoadCommentAction()
    );
  }

  ngOnInit() {

    this.user$ = this.store.select(fromRoot.getUser);
    this.posts$ = this.creativeStore.select(fromCreative.getPosts);
    this.comments$ = this.creativeStore.select(fromCreative.getComments);

    this.user$.subscribe(afUser => {
      if(afUser)
        this.user = afUser;
    });

    this.postComments$ = Observable.combineLatest(this.posts$, this.comments$, (posts, comments) => {
      console.log(posts);
      return posts.map(post => Object.assign({}, post, {
        comments: comments.filter(comment => comment.post === post['$key'])
      }));
    });

  }

  openPostDialog() {
    let config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    let dialogRef = this.postDialog.open(PostComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open(result, 'Post', config);
      }
    });
  }

}
