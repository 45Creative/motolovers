import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import '../../../rxjs-extensions';
import { Post, PostStatus } from '../model';
import { User } from '../../../core/auth/model';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable  } from 'angularfire2/database';

import * as postActions from '../store/actions/post.actions';
import * as firebase from 'firebase/app';
import * as states from '../store/state/post.state';
import {postInitialState} from '../store/state/post.state';

// Get a reference to the database service
const database = firebase.database();

@Injectable()
export class PostService {

  constructor(
    public afAuth: AngularFireAuth,
    private store: Store<states.PostState>,
    public db: AngularFireDatabase
  ) {
  }

  loadPosts(): Observable<any> {
    return this.db.list('/posts/published', {
      query: {
        orderByChild: 'createdAt'
      }
    })
    .catch(error => {
      console.log(error);
      return Observable.of(null);
    });
  }

  loadUserPosts(user: User): Observable<Post[]> {
    return this.db.list('/users/' + user.userId + '/posts')
      .map((pids: any[]) => {
        const posts: Post[] = [];
        pids.forEach(pid => {
          this.db.object('/posts/' + pid['$value'] + '/' + pid['$key']).take(1)
            .subscribe(q => {
              posts.push(q);
            });
        });
        return posts;
      })
      .catch(error => {
        console.log(error);
        return Observable.of(null);
      });
  }

  createPost(post: Post): Observable<any> {

    // Get a key for a new Post.
    const newPostKey = database.ref().child('posts/published').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/published/' + newPostKey] = post;
    updates['/users/' + post.createdBy + '/posts/' + newPostKey] = 'published';

    return Observable.of(
      database.ref().update(updates).catch(error => {
      console.log(error);
      return Observable.of(null);
    }));

  }

  updatePost(post: Post): Observable<any> {
    const key: string = post['$key'];

    const updates = {};
    updates['/posts/published/' + key] = post;

    return Observable.of(
      database.ref().set(updates).catch(error => {
      console.log(error);
      return Observable.of(null);
    }));

  }

  deletePost(post: Post): Observable<any> {
    const key: string = post['$key'];
    post.status = PostStatus.INACTIVE;

    const updates = {};
    updates['/posts/unpublished/' + key] = post;
    updates['/users/' + post.createdBy + '/posts/' + key] = 'unpublished';
    updates['/posts/published/' + key] = null;

    return Observable.of(
      database.ref().update(updates).catch(error => {
      console.log(error);
      return Observable.of(null);
    }));

    /*
    return Observable.of(this.db.object('/posts/unpublished').update({[key]: post}).then(
      (ret) => {
        this.db.object('/users/' + post.createdBy + '/posts').update({[key]: 'unpublished'});
        this.db.object('/posts/published/' + key).remove();
        return this.db.object('/posts/unpublished/' + key);
      },
      (error: Error) => {
        console.log(error);
        return null;
      }
    ));
    */
  }

  likePost(post: Post, user: User): Observable<any> {
    const key: string = post['$key'];

    const updates = {};
    updates['/posts/published/' + key +  '/likes/' + user.userId] = true;

    return Observable.of(
      database.ref().update(updates).catch(error => {
      console.log(error);
      return Observable.of(null);
    }));
  /*
    return Observable.of(this.db.object('/posts/published/' + key +  '/likes').update({[user.userId]: true}).then(
      (ret) => {
        return this.db.object('/posts/published/' + key);
      },
      (error: Error) => {
        console.log(error);
        return null;
      }
    ));
    */
  }

}
