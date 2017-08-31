import { AuthAction, AuthActionTypes } from '../actions/auth.actions';
import { AuthState, authInitialState } from '../state/auth.state';

export function authReducer(
  state = authInitialState, action: AuthAction): AuthState {
  switch (action.type) {

    case AuthActionTypes.LOGIN_COMPLETED: {
        return Object.assign({}, state, {
            user: action.payload.user,
            isLoggedIn: action.payload.user != null,
            error: null
        });
    }

    case AuthActionTypes.AUTH_ERROR: {
        return Object.assign({}, state, {
            error: action.payload.error
        });
    }

    case AuthActionTypes.LOGOUT_COMPLETED: {
        return Object.assign({}, state, {
            user: null,
            isLoggedIn: false
        });
    }

    default: {
        return state;
    }
  }
}

export const getUser = (state: AuthState) => state.user;
export const getIsUserLoggedIn = (state: AuthState) => state.isLoggedIn;
export const getError = (state: AuthState) => state.error;
