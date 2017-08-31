import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../services/auth.service';

import * as fromAuth from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

    @Effect()
    loginAction$: Observable<Action> = this.actions$
        .ofType(fromAuth.AuthActionTypes.LOGIN_REQUESTED)
        .map((action: fromAuth.LoginRequestedAction) => action.payload)
        .switchMap(payload => this.authService.signIn(payload.user)
            .map(res => (new fromAuth.LoginCompletedAction({user:res})))
            .do(() => this.router.navigate(['/']))
            .catch((error) => Observable.of(new fromAuth.AuthErrorAction({error: error})))
    );

    @Effect()
    signUpAction$: Observable<Action> = this.actions$
      .ofType(fromAuth.AuthActionTypes.SIGNUP_REQUESTED)
      .map((action: fromAuth.SignUpRequestedAction) => action.payload)
      .switchMap(payload => this.authService.signUp(payload.user)
        .map(res => (new fromAuth.SignUpCompletedAction({user:res})))
        .do(() => this.router.navigate(['/']))
        .catch((error) => Observable.of(new fromAuth.AuthErrorAction({error: error})))
    );

    @Effect()
    logoutAction$: Observable<Action> = this.actions$
        .ofType(fromAuth.AuthActionTypes.LOGOUT_REQUESTED)
        .map((action: fromAuth.LogoutRequestedAction) => action.payload)
        .switchMap(payload => this.authService.signOut()
            .map(res => (new fromAuth.LogoutCompletedAction()))
            .do(() => this.router.navigate(['/login']))
            .catch((error) => Observable.of(new fromAuth.AuthErrorAction({error: error})))
    );

    @Effect()
    loadUserRoles$ = this.actions$
      .ofType(fromAuth.AuthActionTypes.USER_ROLE_COMPLETED)
      .map((action: fromAuth.UserRoleRequestedAction) => action.payload)
      .switchMap(payload => this.authService.getUserRoles(payload.user))
            .map(res => (new fromAuth.UserRoleCompletedAction({user:res})))
            .catch((error) => Observable.of(new fromAuth.AuthErrorAction({error: error})))

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) { }

}
