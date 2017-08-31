import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import '../../../../rxjs-extensions';

import { Profile, Picture } from '../../model';
import { User } from '../../../../core/auth/model';

import { ProfileService } from '../../services/profile.service';

import * as fromProfile from '../actions/profile.actions';

@Injectable()
export class ProfileEffects {

  @Effect()
  loadProfile$ = this.actions$
    .ofType(fromProfile.ProfileActionTypes.LOAD_PROFILE)
    .map((action: fromProfile.loadProfileAction) => action.payload)
    .switchMap((payload: {user:User}) => this.profileService.loadProfile(payload.user))
    .map(res => new fromProfile.loadProfileSuccessAction({ profile: res }));

  @Effect()
  uploadProfilePicture$ = this.actions$
    .ofType(fromProfile.ProfileActionTypes.UPLOAD_PROFILE_PICTURE)
    .map((action: fromProfile.uploadProfilePictureAction) => action.payload)
    .switchMap(payload => this.profileService.uploadProfilePicure(payload.picture))
    .map(res => new fromProfile.uploadProfilePictureSuccessAction({ avatarURL: res }))
    .catch(() => Observable.of({ type: fromProfile.ProfileActionTypes.UPLOAD_PROFILE_PICTURE_ERROR }));
    /*
    .switchMap(payload => this.profileService.updateProfilePicture(payload.profile, payload.avatarURL))
    .map(res => new fromProfile.updateProfileSuccessAction({ profile: res }))
    .catch(() => Observable.of({ type: fromProfile.ProfileActionTypes.UPLOAD_PROFILE_PICTURE_ERROR }));
    */

    //.do((action: Action) => this.profileService.getUserProfile(action.payload.profile))
    //.filter(() => false);
    // .switchMap((action: fromProfile.updateProfileAction) => this.profileService.getUserProfile(action.payload.profile))
    // .map((profile: Profile) => new fromProfile.updateProfileAction(profile));

  constructor(
    private profileService: ProfileService,
    private actions$: Actions
  ) { }

  /*
  @Effect()
  loadProfile$ = this.actions$
    .ofType(ProfileActions.LOAD_PROFILE)
    .map((action:Action) => action.payload)
    .switchMap(() => this.svc.getProfile())
    .map((profile:Profile[]) => this.profileActions.loadProfileSuccess(profile));

  @Effect()
  loadUnpublishedProfile$ = this.actions$
    .ofType(ProfileActions.LOAD_UNPUBLISHED_PROFILE)
    .map((action:Action) => action.payload)
    .switchMap(() => this.svc.getUnpublishedProfile())
    .map((profile:Profile[]) => this.profileActions.loadUnpublishedProfileSuccess(profile));

  @Effect()
  loadUserProfile$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_PROFILE)
    .map((action: Action) => action.payload)
    .switchMap((action:Action) => this.svc.getUserProfile(action.payload))
    .map((profile:Profile[]) => this.profileActions.loadUserProfileSuccess(profile));

  @Effect()
  addProfile$ = this.actions$
    .ofType(ProfileActions.ADD_PROFILE)
    .map((action: Action) => action.payload)
    .do((action:Action) => this.svc.saveProfile(action.payload))
    .filter(() => false);

  @Effect()
  diapproveProfile$ = this.actions$
    .ofType(ProfileActions.DISAPPROVE_PROFILE)
    .map((action: Action) => action.payload)
    .do((action:Action) => this.svc.disapproveProfile(action.payload))
    .filter(() => false);

  @Effect()
  uploadProfilePicture$ = this.actions$
    .ofType(ProfileActions.UPLOAD_PROFILE_PICTURE)
    .map((action:Action) => action.payload)
    .do((payload:{picture:Picture, profile:Profile, pictureType:PictureType }) => this.svc.uploadProfilePicure(payload.picture, payload.profile, payload.pictureType))
    .filter(() => false);
   */


}
