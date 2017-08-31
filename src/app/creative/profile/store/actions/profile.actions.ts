import { Action } from '@ngrx/store';
import { Profile, Picture, PictureType } from '../../model';
import { User } from '../../../../core/auth/model';
import { type } from "../../../../core/utils/utils";

export const ProfileActionTypes = {
  UPDATE_PROFILE: type("[Profile] -Upload Profile-"),
  UPDATE_PROFILE_SUCCESS: type("[Profile] -Upload Profile Success-"),
  UPDATE_PROFILE_ERROR: type("[Profile] -Upload Profile Error-"),
  LOAD_PROFILE: type("[Profile] -Load Profile-"),
  LOAD_PROFILE_SUCCESS: type("[Profile] -Load Profile Success-"),
  LOAD_PROFILE_ERROR: type("[Profile] -Load Profile Error-"),
  UPLOAD_PROFILE_PICTURE: type("[Profile] -Upload Profile Picture-"),
  UPLOAD_PROFILE_PICTURE_SUCCESS: type("[Profile] -Upload Profile Picture Success-"),
  UPLOAD_PROFILE_PICTURE_ERROR: type("[Profile] -Upload Profile Picture Error-"),
};

export class updateProfileAction implements Action {
  readonly type = ProfileActionTypes.UPDATE_PROFILE;

  constructor(public payload: {profile: Profile}) {}
}

export class updateProfileSuccessAction implements Action {
  readonly type = ProfileActionTypes.UPDATE_PROFILE_SUCCESS;

  constructor(public payload: {profile: Profile}) {}
}

export class updateProfileErrorAction implements Action {
  readonly type = ProfileActionTypes.UPDATE_PROFILE_ERROR;

  constructor(public payload: any) {}
}

export class loadProfileAction implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE;

  constructor(public payload: {user: User}) {}
}

export class loadProfileSuccessAction implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE_SUCCESS;

  constructor(public payload: {profile: Profile}) {}
}

export class loadProfileErrorAction implements Action {
  readonly type = ProfileActionTypes.LOAD_PROFILE_ERROR;

  constructor(public payload: any) {}
}

export class uploadProfilePictureAction implements Action {
  readonly type = ProfileActionTypes.UPLOAD_PROFILE_PICTURE;

  constructor(public payload: {picture: Picture, profile: Profile}) {}
}

export class uploadProfilePictureSuccessAction implements Action {
  readonly type = ProfileActionTypes.UPLOAD_PROFILE_PICTURE_SUCCESS;

  constructor(public payload: {avatarURL: string}) {}
}

export class uploadProfilePictureErrorAction implements Action {
  readonly type = ProfileActionTypes.UPLOAD_PROFILE_PICTURE_ERROR;

  constructor(public payload: any) {}
}

export type ProfileAction
  = updateProfileAction
  | updateProfileSuccessAction
  | updateProfileErrorAction
  | loadProfileAction
  | loadProfileSuccessAction
  | loadProfileErrorAction
  | uploadProfilePictureAction
  | uploadProfilePictureSuccessAction
  | uploadProfilePictureErrorAction;
