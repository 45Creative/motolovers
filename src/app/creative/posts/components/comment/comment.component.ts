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
    this.post = new Comment();
    this.createForm(this.post);
  }

  createForm(post: Comment) {
    this.postForm = this.fb.group({
      postText: [post.postText, Validators.required]
    });
  }

  onSubmit() {
    this.postForm.updateValueAndValidity();
    if (this.postForm.invalid) {
      return;
    }
    const post: Comment = this.getCommentFromFormValue(this.postForm.value);
    post.status = CommentStatus.APPROVED;
    post.createdBy = this.user.userId;
    post.authorName = this.user.displayName;
    post.authorPhotoURL = this.user.photoURL;
    this.saveComment(post);
  }

  getPostFromFormValue(formValue: any): Comment {
    let post: Comment;
    post = new Comment();
    post.postText = formValue.postText;
    return post;
  }

  savePost(post: Comment) {
    this.creativeStore.dispatch(new postActions.CreateCommentAction({post: post}));
    this.dialogRef.close('Post Saved');
  }

}
