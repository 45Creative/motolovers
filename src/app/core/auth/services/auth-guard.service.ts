import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import * as fromRoot from '../../reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromRoot.AppState>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.store.select(state => state.auth.isLoggedIn);

  }

}
