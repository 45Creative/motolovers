import { ProfileAction, ProfileActionTypes } from '../actions/profile.actions';
import { ProfileState, profileInitialState } from '../state/profile.state';

export function profileReducer(
  state = profileInitialState, action: ProfileAction): ProfileState {
  switch (action.type) {

    case ProfileActionTypes.LOAD_PROFILE: {
      return Object.assign({}, state, {
        user: action.payload.user,
        profile: null,
        error: null
      });
    }

    case ProfileActionTypes.LOAD_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        user: null,
        profile: action.payload.profile,
        error: null
      });
    }

    case ProfileActionTypes.LOAD_PROFILE_ERROR: {
      return Object.assign({}, state, {
        user: null,
        profile: null,
        error: action.payload.error
      });
    }
    
    case ProfileActionTypes.UPLOAD_PROFILE_PICTURE: {
      return Object.assign({}, state, {
        picture: action.payload.picture,
        profile: action.payload.profile,
        error: null
      });
    }

    case ProfileActionTypes.UPLOAD_PROFILE_PICTURE_SUCCESS: {
      return Object.assign({}, state, {
        picture: action.payload.picture,
        profile: action.payload.profile,
        error: null
      });
    }

    case ProfileActionTypes.UPLOAD_PROFILE_PICTURE_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error
      });
    }

    default: {
      return state;
    }
  }
}

export const getProfilePicture  = (state: ProfileState) => state.picture;
export const getProfile         = (state: ProfileState) => state.profile;
export const getError           = (state: ProfileState) => state.error;
