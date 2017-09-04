import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { fadeInAnimation } from '../../../../route.animation';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../core/reducers';
import * as fromCreative from '../../../reducers';
import * as commentActions from '../../store/actions/comment.actions';

import { User } from '../../../../core/auth/model';
import { Comment, CommentStatus } from '../../model';

@Component({
  selector: 'ms-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  host: { '[@fadeInAnimation]': 'true' },
  animations: [ fadeInAnimation ]
})
export class CommentComponent implements OnInit {

  user$: Observable<User>;
  user: User;

  text: string;
  commentForm: FormGroup;
  comment: Comment;

  constructor(private fb: FormBuilder,
              private store: Store<fromRoot.AppState>,
              private creativeStore: Store<fromCreative.CreativeState>,
              public  dialogRef: MdDialogRef<CommentComponent>) {
    this.user$ = this.store.select(fromRoot.getUser);
  }

  ngOnInit() {

    this.user$.subscribe(afUser => {
      if (afUser) {
        this.user = afUser;
      }
    });
    this.comment = new Comment();
    this.createForm(this.comment);
  }

  createForm(comment: Comment) {
    this.commentForm = this.fb.group({
      commentText: [comment.commentText, Validators.required]
    });
  }

  onSubmit() {
    this.commentForm.updateValueAndValidity();
    if (this.commentForm.invalid) {
      return;
    }
    const comment: Comment = this.getCommentFromFormValue(this.commentForm.value);
    comment.status = CommentStatus.APPROVED;
    comment.createdBy = this.user.userId;
    comment.authorName = this.user.displayName;
    comment.authorPhotoURL = this.user.photoURL;
    this.saveComment(comment);
  }

  getCommentFromFormValue(formValue: any): Comment {
    let comment: Comment;
    comment = new Comment();
    comment.commentText = formValue.commentText;
    return comment;
  }

  saveComment(comment: Comment) {
    this.creativeStore.dispatch(new commentActions.CreateCommentAction({comment: comment}));
    this.dialogRef.close('Comment Saved');
  }

}
