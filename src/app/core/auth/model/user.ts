import * as firebase from 'firebase/app';

export class User {
  userId: string;
  displayName: string;
  email: string;
  password: string;
  photoURL: string;
  idToken?: string;
  authState: firebase.User;
  roles: any[];

  constructor(authState: firebase.User) {
    if (authState) {
      this.authState = authState;
      this.userId = authState.uid;
      this.photoURL = authState.providerData[0].photoURL ? authState.providerData[0].photoURL :
      'https://pickaface.net/assets/images/slides/slide2.png';
      this.email = authState.providerData[0].email;
      this.displayName = (authState.providerData[0].displayName ? authState.providerData[0].displayName : this.email);
    }
  }

}
