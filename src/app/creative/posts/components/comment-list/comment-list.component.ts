import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MdDialog, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { fadeInAnimation } from '../../../../route.animation';

import { CommentComponent } from '../comment/comment.component';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../core/reducers';
import * as fromCreative from '../../../reducers';

import * as commentActions from '../../store/actions/comment.actions';

import { User } from '../../../../core/auth/model';
import { Comment } from '../../model';

@Component({
  selector: 'ms-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit {

  user$: Observable<User>;
  comments$: Observable<Comment[]>;
  user: User;
  comments: Comment[];

  // Hide Snackbar
  autoHide: number = 3000;

  constructor(
    public commentDialog: MdDialog,
    private snackBar: MdSnackBar,
    private store: Store<fromRoot.AppState>,
    private creativeStore: Store<fromCreative.CreativeState>
  ) {
    this.creativeStore.dispatch(
      new commentActions.LoadCommentAction()
    );
  }

  ngOnInit() {

    this.user$ = this.store.select(fromRoot.getUser);
    this.comments$ = this.creativeStore.select(fromCreative.getComments);
    this.user$.subscribe(afUser => {
      if (afUser) {
        this.user = afUser;
      }
    });

  }

  openPostDialog() {
    const config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    const dialogRef = this.commentDialog.open(CommentComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open(result, 'Comment', config);
      }
    });
  }

}
