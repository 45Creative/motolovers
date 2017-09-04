
export class Comment {
  commentText: string;
  published?: boolean;
  status?: CommentStatus;
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
    this.status = CommentStatus.SAVED;
  }
}

export enum CommentStatus {
  SAVED,
  SUBMITTED,
  APPROVED,
  INACTIVE
}
