import { User } from '../../../core/auth/model';
import { Comment } from '../model';

export class Post {
  postText: string;
  published?: boolean;
  status?: PostStatus;
  authorName?: string;
  authorPhotoURL?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;

  constructor() {
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
