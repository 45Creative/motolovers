import { Component, OnInit, Input } from '@angular/core';
import { fadeInAnimation } from '../../../../route.animation';
import { MdDialog, MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { CommentConfirmDeleteComponent } from '../comment-confirm-delete/comment-confirm-delete.component';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../core/reducers';
import * as fromCreative from '../../../reducers';
import * as commentActions from '../../store/actions/comment.actions'

import { User } from '../../../../core/auth/model';
import { Comment, CommentStatus } from '../../model';



@Component({
  selector: 'ms-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class CommentListItemComponent implements OnInit {

  @Input() comment;
  autoHide: number = 3000;

  user$: Observable<User>;
  user: User;

  constructor(
    private store: Store<fromRoot.AppState>,
    private creativeStore: Store<fromCreative.CreativeState>,
    public commentDialog: MdDialog,
    private snackBar: MdSnackBar
  ) {
    this.user$ = this.store.select(fromRoot.getUser);
    this.user$.subscribe(afUser => {
      if (afUser) {
        this.user = afUser;
      }
    });
  }

  ngOnInit() {
  }

  openRemoveDialog(comment: Comment) {
    const config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    const dialogRef = this.commentDialog.open(CommentConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.creativeStore.dispatch(new commentActions.RemoveCommentAction({comment: comment}));
        this.snackBar.open('Comment Deleted', 'Delete', config);
      }
    });
  }

  onLikeComment(comment: Comment, user: User) {
    this.creativeStore.dispatch(new commentActions.LikeCommentAction({comment: comment, user: user}));
  }

}
