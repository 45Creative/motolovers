import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";

import { Picture } from '../../../model';

import { UploadImagesService } from '../../../services';

@Component({
  selector: './ms-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss'],
})
export class UploadAvatarComponent implements OnInit {

  picture: Picture;
  selectedFiles: FileList;

  constructor(
    private dialogRef: MdDialogRef<UploadAvatarComponent>,
    private uploadImages: UploadImagesService
  ) { }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  ngOnInit() {
  }

  send() {
    this.dialogRef.close('Your message has been send.');
  }

  uploadImagesToFirebase() {

    let file = this.selectedFiles.item(0);
    this.picture = new Picture(file);
    this.uploadImages.uploadImagesToFirebase(this.picture)

  }

}
