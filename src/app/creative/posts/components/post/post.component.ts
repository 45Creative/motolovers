import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { fadeInAnimation } from "../../../../route.animation";

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../core/reducers';
import * as fromCreative from '../../../reducers';
import * as postActions from '../../store/actions/post.actions'

import { User } from '../../../../core/auth/model';
import { Post, PostStatus }     from '../../model';

@Component({
  selector: 'ms-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [ fadeInAnimation ]
})
export class PostComponent implements OnInit {

  user$: Observable<User>;
  user: User;

  text: string;
  postForm: FormGroup;
  post: Post;

  constructor(private fb: FormBuilder,
              private store: Store<fromRoot.AppState>,
              private creativeStore: Store<fromCreative.CreativeState>,
              public  dialogRef: MdDialogRef<PostComponent>) {
    this.user$ = this.store.select(fromRoot.getUser);
  }

  ngOnInit() {

    this.user$.subscribe(afUser => {
      if(afUser)
        this.user = afUser;
    });

    this.post = new Post();
    this.createForm(this.post);
  }

  createForm(post: Post) {
    this.postForm = this.fb.group({
      postText: [post.postText, Validators.required]
    });
  }

  onSubmit() {
    //validations
    this.postForm.updateValueAndValidity();
    if (this.postForm.invalid)
      return;

    let post: Post = this.getPostFromFormValue(this.postForm.value);

    post.status = PostStatus.APPROVED;
    post.created_uid = this.user.userId;

    this.savePost(post);
  }

  getPostFromFormValue(formValue: any): Post {
    let post: Post;

    post = new Post();
    post.postText = formValue.postText;
    return post;
  }

  savePost(post: Post) {
    this.creativeStore.dispatch(new postActions.CreatePostAction({post: post}));
    this.dialogRef.close('Post Saved');
  }

}
