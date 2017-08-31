import { User } from '../../../auth/model';

export interface AuthState {
  user: User;
  isLoggedIn: boolean,
  error: any;
}

export const authInitialState: AuthState = {
  user: null,
  isLoggedIn: false,
  error: null
}
