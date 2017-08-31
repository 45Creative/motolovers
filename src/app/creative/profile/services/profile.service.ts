import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import '../../../rxjs-extensions';
import { Profile, Picture, PictureType } from '../model';
import { User } from '../../../core/auth/model';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as profileActions from '../store/actions/profile.actions';
import * as firebase from 'firebase/app';
import * as states from '../store/state/profile.state';

@Injectable()
export class ProfileService {

  private IMAGES_FOLDER: string = '/images/profile';

  constructor(
    private store: Store<states.ProfileState>,
    public db: AngularFireDatabase) {
  }

  loadProfile(user: User): Observable<Profile>{
    return this.db.list('/profile/' + user.userId)
      .catch(error => {
        console.log(error);
        return Observable.of(null);
      });
  }

  /*
  createProfile(user: User): Observable<Profile> {
    return Observable.of(this.db.list('/profiles/published').push(user).then(
      (ret) => {  //success
        if (ret.key){
          this.db.object('/users/' + user.userId + '/profile').update({[ret.key]: "published"});
          this.db.object('/profiles/published/' + ret.key).update({id: ret.key});
        }
        return this.db.object('/profiles/published/' + ret.key);
      },
      (error: Error) => {//error
        console.log(error);
        return null;
      }
    ));
  }

  updateProfile(profile: Profile): Observable<Profile> {
    let key: string = profile["$key"];
    return Observable.of(this.db.object('/profiles/published').update({[key]: profile}).then(
      (ret) => {  //success
        return this.db.object('/profiles/published/' + key);
      },
      (error: Error) => {//error
        console.log(error);
        return null;
      }
    ));
  }
   */

  updateProfilePicture(profile: Profile, pictureUrl: string): Observable<any> {
    let key: string = profile["$key"];
    profile.avatarURL = pictureUrl;
    return Observable.of(this.db.object('/profiles/published').update({[key]: profile}).then(
      (ret) => {  //success
        return this.db.object('/profiles/published/' + key);
      },
      (error: Error) => {//error
        console.log(error);
        return null;
      }
    ));
  }

  uploadProfilePicure(picture: Picture): Observable<string>{

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.IMAGES_FOLDER}/avatar/${picture.file.name}`).put(picture.file);
    let imageURL = null;
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        picture.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      },
      (error) => {
        error.message;
      },
      () => {
        imageURL = uploadTask.snapshot.downloadURL;
      });
    return imageURL;
  }

  getUserProfile(profile: Profile): Observable<Profile> {
    return this.db.object('/profile/' + profile.uid)
      .take(1)
      .map(profile => {
        return profile;
      });
  }

}
