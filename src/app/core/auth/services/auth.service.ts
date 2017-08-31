import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import '../../../rxjs-extensions';
import { User } from '../model/user';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as auth from '../store/actions/auth.actions';
import * as firebase from 'firebase/app';
import * as states from '../../reducers';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(
    public afAuth: AngularFireAuth,
    private store: Store<states.AppState>,
    public db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(afUser => {
      if(afUser) {
        let user = new User(afUser);
        afUser.getIdToken(false).then((token) => {
          user.idToken = token;
          this.store.dispatch(new auth.LoginCompletedAction({user: user}));
          this.store.dispatch(new auth.UserRoleCompletedAction({user: user}));
        });
      }
      else {
        // user not logged in
        this.store.dispatch(new auth.LogoutRequestedAction());
      }
    });
  }

  getUserRoles(user: User): Observable<User> {
    return this.db.object('/users/' + user.userId + "/roles")
      .take(1)
      .map(roles => {
        user.roles = roles;
        return user;
      });
  }

  signIn(user: User) {
    return this.fromFirebaseAuthPromise(
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    );
  }

  signOut() {
    return this.fromFirebaseAuthPromise(
      this.afAuth.auth.signOut()
    );
  }

  signUp(user: User) {
    return this.fromFirebaseAuthPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    );
  }

  private fromFirebaseAuthPromise(promise): Observable<any> {
    return Observable.fromPromise(<Promise<any>>promise);
  }

}
