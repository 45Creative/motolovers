import { Action } from "@ngrx/store";
import { type } from "../../../utils/utils";
import { User } from '../../../auth/model';

export const AuthActionTypes = {
  LOGIN_REQUESTED: type("[Auth] -LOGIN Requested-"),
  LOGIN_COMPLETED: type("[Auth] -LOGIN Completed-"),

  LOGOUT_REQUESTED: type("[Auth] -LOGOUT Requested-"),
  LOGOUT_COMPLETED: type("[Auth] -LOGOUT Completed-"),

  SIGNUP_REQUESTED: type("[Auth] -SIGNUP Requested-"),
  SIGNUP_COMPLETED: type("[Auth] -SIGNUP Completed-"),

  USER_ROLE_REQUESTED: type("[Auth] -USER ROLE Requested-"),
  USER_ROLE_COMPLETED: type("[Auth] -USER ROLE Completed-"),

  AUTH_ERROR: type("[Auth] -Auth Error-")
};

export class LoginRequestedAction implements Action {
  readonly type = AuthActionTypes.LOGIN_REQUESTED;

  constructor(public payload: {user: User}) {}
}

export class LoginCompletedAction implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPLETED;

  constructor(public payload: {user: User}) {}
}

export class UserRoleRequestedAction implements Action {
  readonly type = AuthActionTypes.USER_ROLE_REQUESTED;

  constructor(public payload: {user: User}) {}
}

export class UserRoleCompletedAction implements Action {
  readonly type = AuthActionTypes.USER_ROLE_COMPLETED;

  constructor(public payload: {user: User}) {}
}

export class AuthErrorAction implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;

  constructor(public payload: any) {}
}

export class LogoutRequestedAction implements Action {
  readonly type = AuthActionTypes.LOGOUT_REQUESTED;

  constructor(public payload?: null) {}
}

export class LogoutCompletedAction implements Action {
  readonly type = AuthActionTypes.LOGOUT_COMPLETED;

  constructor(public payload?: null) {}
}

export class SignUpRequestedAction implements Action {
  readonly type = AuthActionTypes.SIGNUP_REQUESTED;

  constructor(public payload: {user: User}) {}
}

export class SignUpCompletedAction implements Action {
  readonly type = AuthActionTypes.SIGNUP_COMPLETED;

  constructor(public payload: {user: User}) {}
}

export type AuthAction =
  LoginRequestedAction
  | LoginCompletedAction
  | UserRoleRequestedAction
  | UserRoleCompletedAction
  | LogoutRequestedAction
  | LogoutCompletedAction
  | SignUpRequestedAction
  | SignUpCompletedAction
  | AuthErrorAction;
