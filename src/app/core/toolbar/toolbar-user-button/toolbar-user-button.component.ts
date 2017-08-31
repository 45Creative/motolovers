import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import '../../../rxjs-extensions';

import * as fromRoot from '../../reducers';
import * as AuthActions from '../../auth/store/actions/auth.actions';

import { User } from '../../auth/model';

@Component({
  selector: 'ms-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit, OnDestroy {

  isOpen: boolean;
  user$: Observable<User>;
  user: User;
  isLoggedIn$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private store: Store<fromRoot.AppState>
  ) {
    this.error$ = this.store.select(fromRoot.getError);
    this.user$ = this.store.select(fromRoot.getUser);
    this.isLoggedIn$ = this.store.select(fromRoot.getIsUserLoggedIn);
  }

  ngOnInit() {
    this.user$.subscribe(afUser => {
      if(afUser)
        this.user = afUser;
    });
  }

  ngOnDestroy() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
    this.store.dispatch(
      new AuthActions.LogoutRequestedAction()
    );
  }

}
