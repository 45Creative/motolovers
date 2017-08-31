import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import { Store, State } from '@ngrx/store';

import {fadeInAnimation} from "../../../route.animation";
import * as actions from '../../../core/auth/store/actions/auth.actions';
import { AuthState } from '../../../core/auth/store/state/auth.state';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})

export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private store: Store<AuthState>
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: signupFormValidator}
    );
  }

  //register
  onSignupSubmit() {
    this.store.dispatch(
      new actions.SignUpRequestedAction({user: this.signupForm.value})
    );
  }

}

function signupFormValidator(fg: FormGroup): {[key: string]: boolean} {
  //TODO: check if email is already taken

  //Password match validation
  if (fg.get('password').value !== fg.get('confirmPassword').value)
    return {'passwordmismatch': true}

  return null;
}
