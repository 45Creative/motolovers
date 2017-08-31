import { User } from '../../../core/auth/model';

export class Post {
  id: string;
  postText: string;
  published?: boolean;
  status?: PostStatus;
  created_uid?: string;
  createdOn?: Date;
  lastUpdated_uid?: string;
  lastUpdatedOn?: Date;
  approved_uid?: string;
  approvedOn?: Date;

  constructor() {
    this.id = "";
    this.published = true;
    this.status = PostStatus.SAVED;
  }
}

export enum PostStatus {
  SAVED,
  SUBMITTED,
  APPROVED,
  INACTIVE
}
