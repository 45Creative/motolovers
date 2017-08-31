import { Injectable } from '@angular/core';
import { Picture } from '../model';
import * as firebase from 'firebase';

import { AngularFireDatabase } from 'angularfire2/database';
import '../../../rxjs-extensions';

@Injectable()
export class UploadImagesService {

  private IMAGES_FOLDER: string = '/images';

  constructor(private db: AngularFireDatabase) {
  }

  uploadImagesToFirebase(picture: Picture) {

    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.IMAGES_FOLDER}/${picture.file.name}`).put(picture.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        picture.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error)
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        picture.url = uploadTask.snapshot.downloadURL;
        picture.name = picture.file.name;
        this.saveImage({url: picture.url});
      });
  }

 private saveImage(picture: any) {
   this.db.list(`/${this.IMAGES_FOLDER}`).push(picture);
 }

}
