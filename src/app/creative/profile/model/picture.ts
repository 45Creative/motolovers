export class Picture {

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  created_uid?: string;
  createdOn?: Date = new Date();

  public constructor(file:File) {
    this.file = file;
  }

}

export enum PictureType {
  COVER,
  AVATAR
}
