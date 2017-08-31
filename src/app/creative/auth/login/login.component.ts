import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";

import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Store, State } from '@ngrx/store';

import {fadeInAnimation} from "../../../route.animation";
import * as actions from '../../../core/auth/store/actions/auth.actions';
import { AuthState } from '../../../core/auth/store/state/auth.state';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private store: Store<AuthState>
  ) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }
    );
  }

  //signin
  onSigninSubmit() {

    this.store.dispatch(
      new actions.LoginRequestedAction({user: this.signinForm.value})
    );
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  fbLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  twitterLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  githubLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

}
