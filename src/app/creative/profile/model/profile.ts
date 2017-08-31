import { Address } from "./address";

export class Profile {
  uid: string;
  profileText: string;
  avatarURL: string;
  coverURL: string;
  published?: boolean;
  status?: ProfileStatus;
  created_uid?: string;
  createdOn?: Date;
  lastUpdated_uid?: string;
  lastUpdatedOn?: Date;
  addresses?: Address[]; 

  constructor() {
    this.uid = "";
    this.published = true;
    this.status = ProfileStatus.ACTIVE;
  }

}

export enum ProfileStatus {
  ACTIVE,
  INACTIVE
}
