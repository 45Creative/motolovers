import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import '../../../rxjs-extensions';
import { Comment, CommentStatus } from '../model';
import { User } from '../../../core/auth/model';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';

import * as commentActions from '../store/actions/comment.actions';
import * as firebase from 'firebase/app';
import * as states from '../store/state/comment.state';
import { commentInitialState } from '../store/state/comment.state';

// Get a reference to the database service
const database = firebase.database();

@Injectable()
export class CommentService {

  constructor(
    public afAuth: AngularFireAuth,
    private store: Store<states.CommentState>,
    public db: AngularFireDatabase
  ) {
  }

  loadComments(): Observable<any> {
    return this.db.list('/comments/published', {
      query: {
        orderByChild: 'createdAt'
      }
    })
    .catch(error => {
      console.log(error);
      return Observable.of(null);
    });
  }

  loadUserComments(user: User): Observable<Comment[]> {
    return this.db.list('/users/' + user.userId + '/comments')
      .map((pids: any[]) => {
        const comments: Comment[] = [];
        pids.forEach(pid => {
          this.db.object('/comments/' + pid['$value'] + '/' + pid['$key']).take(1)
            .subscribe(q => {
              comments.push(q);
            });
        });
        return comments;
      })
      .catch(error => {
        console.log(error);
        return Observable.of(null);
      });
  }

  createComment(comment: Comment): Observable<any> {

    // Get a key for a new Comment.
    const newCommentKey = database.ref().child('comments/published').push().key;

    // Write the new comment's data simultaneously in the comments list and the user's comment list.
    const updates = {};
    updates['/comments/published/' + newCommentKey] = comment;
    updates['/users/' + comment.createdBy + '/comments/' + newCommentKey] = 'published';

    return Observable.of(
      database.ref().update(updates).catch(error => {
      console.log(error);
      return Observable.of(null);
    }));

  }

  updateComment(comment: Comment): Observable<any> {
    const key: string = comment['$key'];

    const updates = {};
    updates['/comments/published/' + key] = comment;

    return Observable.of(
      database.ref().set(updates).catch(error => {
      console.log(error);
      return Observable.of(null);
    }));

  }

  deleteComment(comment: Comment): Observable<any> {
    const key: string = comment['$key'];
    comment.status = CommentStatus.INACTIVE;

    const updates = {};
    updates['/comments/unpublished/' + key] = comment;
    updates['/users/' + comment.createdBy + '/comments/' + key] = 'unpublished';
    updates['/comments/published/' + key] = null;

    return Observable.of(
      database.ref().update(updates).catch(error => {
      console.log(error);
      return Observable.of(null);
    }));

    /*
    return Observable.of(this.db.object('/comments/unpublished').update({[key]: comment}).then(
      (ret) => {
        this.db.object('/users/' + comment.createdBy + '/comments').update({[key]: 'unpublished'});
        this.db.object('/comments/published/' + key).remove();
        return this.db.object('/comments/unpublished/' + key);
      },
      (error: Error) => {
        console.log(error);
        return null;
      }
    ));
    */
  }

  likeComment(comment: Comment, user: User): Observable<any> {
    const key: string = comment['$key'];

    const updates = {};
    updates['/comments/published/' + key +  '/likes/' + user.userId] = true;

    return Observable.of(
      database.ref().update(updates).catch(error => {
      console.log(error);
      return Observable.of(null);
    }));
  /*
    return Observable.of(this.db.object('/comments/published/' + key +  '/likes').update({[user.userId]: true}).then(
      (ret) => {
        return this.db.object('/comments/published/' + key);
      },
      (error: Error) => {
        console.log(error);
        return null;
      }
    ));
    */
  }

}
