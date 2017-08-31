import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../auth/store/state/auth.state';
import * as fromAuth from '../auth/store/reducers/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers = {
  auth: fromAuth.authReducer
}

export const getAuthState = (state: AppState) => state.auth;

export const getUser            = createSelector(getAuthState, fromAuth.getUser);
export const getIsUserLoggedIn  = createSelector(getAuthState, fromAuth.getIsUserLoggedIn);
export const getError           = createSelector(getAuthState, fromAuth.getError);

