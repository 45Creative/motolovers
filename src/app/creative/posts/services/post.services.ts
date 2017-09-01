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
import {postInitialState} from "../store/state/post.state";

@Injectable()
export class PostService {

  constructor(
    public afAuth: AngularFireAuth,
    private store: Store<states.PostState>,
    public db: AngularFireDatabase
  ) {
  }

  loadPosts(): Observable<Post[]> {
    // Compose an observable based on the projectList:

  //get the keys for the lib albums
  const posts$ = this.db.list(`/posts/published`);

    return this.db.list('/posts/published', {
      query: {
        orderByChild: 'createdOn'
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
        let posts: Post[] = [];
        pids.forEach(pid => {
          this.db.object('/posts/' + pid['$value'] + '/' + pid['$key']).take(1)
            .subscribe(q => {
              console.log(q);
              posts.push(q)
            });
        });
        return posts;
      })
      .catch(error => {
        console.log(error);
        return Observable.of(null);
      });
  }

  createPost(post: Post): Observable<any>{
    return Observable.of(this.db.list('/posts/published').push(post).then(
      (ret) => {  //success
        if (ret.key){
          this.db.object('/users/' + post.created_uid + '/posts').update({[ret.key]: "published"});
          this.db.object('/posts/published/' + ret.key).update({id: ret.key});
        }
        return this.db.list('/posts/published')
      },
      (error: Error) => {//error
        console.log(error);
      }
    ));
  }

  updatePost(post: Post): Observable<any> {
    let key: string = post["$key"];
    return Observable.of(this.db.object('/posts/published').update({[key]: post}).then(
      (ret) => {  //success
        return this.db.object('/posts/published/' + key);
        // this.store.dispatch(new postActions.UpdatePostCompletedAction({post: post}));
      },
      (error: Error) => {//error
        console.log(error);
        return null;
      }
    ));
  }

  deletePost(post: Post): Observable<any> {
    let key: string = post["$key"];
    post.status = PostStatus.INACTIVE;
    return Observable.of(this.db.object('/posts/unpublished').update({[key]: post}).then(
      (ret) => {  //success
        this.db.object('/users/' + post.created_uid + '/posts').update({[key]: "unpublished"});
        this.db.object('/posts/published/' + key).remove();
        return this.db.object('/posts/unpublished/' + key);
      },
      (error: Error) => {//error
        console.log(error);
        return null;
      }
    ));
  }

  likePost(post: Post, user: User): Observable<any> {
    let key: string = post["$key"];
    return Observable.of(this.db.object('/posts/published/' + key +  '/likes').update({[user.userId]: true}).then(
      (ret) => {  //success
        return this.db.object('/posts/published/' + key);
      },
      (error: Error) => {//error
        console.log(error);
        return null;
      }
    ));
  }
}
