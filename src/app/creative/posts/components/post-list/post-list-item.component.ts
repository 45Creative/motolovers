import { Component, OnInit, Input } from '@angular/core';
import { fadeInAnimation } from "../../../../route.animation";
import { MdDialog, MdSnackBar, MdSnackBarConfig } from "@angular/material";

import { PostConfirmDeleteComponent } from '../post-confirm-delete/post-confirm-delete.component';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../core/reducers';
import * as fromCreative from '../../../reducers';
import * as postActions from '../../store/actions/post.actions'

import { User } from '../../../../core/auth/model';
import { Post, PostStatus }     from '../../model';



@Component({
  selector: 'ms-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class PostListItemComponent implements OnInit {

  @Input() post;
  autoHide: number = 3000;

  user$: Observable<User>;
  user: User;

  constructor(
    private store: Store<fromRoot.AppState>,
    private creativeStore: Store<fromCreative.CreativeState>,
    public postDialog: MdDialog,
    private snackBar: MdSnackBar
  ) {
    this.user$ = this.store.select(fromRoot.getUser);
    this.user$.subscribe(afUser => {
      if(afUser)
        this.user = afUser;
    });
  }

  ngOnInit() {
  }

  openRemoveDialog(post: Post) {
    let config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    let dialogRef = this.postDialog.open(PostConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.creativeStore.dispatch(new postActions.RemovePostAction({post: post}));
        this.snackBar.open('Post Deleted','Delete',config);
      }
    });
  }

  onLikePost(post: Post, user: User) {
    this.creativeStore.dispatch(new postActions.LikePostAction({post: post, user: user}));
  }

}
