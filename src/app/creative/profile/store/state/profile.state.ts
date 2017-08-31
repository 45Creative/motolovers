import { Profile, Picture, PictureType } from '../../model';
import { User } from '../../../../core/auth/model';

export interface ProfileState {
  profile: Profile;
  picture: Picture;
  avatarURL: string;
  coverURL: string;
  user: User;
  error: any;
}

export const profileInitialState: ProfileState = {
  profile: null,
  picture: null,
  avatarURL: null,
  coverURL: null,
  user: null,
  error: null
}
