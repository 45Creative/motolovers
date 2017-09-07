import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../material-components.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthModule } from '../../core/auth/auth.module';

import { PostService } from './services/post.services';
import { CommentService } from './services/comment.services';
import { PostCommentsService } from './services/post-comments.services';
import { PostEffects } from './store/effects/post.effects';
import { CommentEffects } from './store/effects/comment.effects';
import { PostCommentsEffects } from './store/effects/post-comments.effects';
import { postReducer } from './store/reducers/post.reducers';
import { commentReducer } from './store/reducers/comment.reducers';
import { postCommentsReducer } from './store/reducers/post-comments.reducers';

import { 
  PostComponent, 
  PostListComponent, 
  PostListItemComponent, 
  PostConfirmDeleteComponent,
  CommentComponent,
  CommentListComponent,
  CommentListItemComponent,
  CommentConfirmDeleteComponent } from './components';

import { PostRoutingModule } from './post-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    AuthModule,
    StoreModule.forFeature('post', postReducer),
    StoreModule.forFeature('comment', commentReducer),
    StoreModule.forFeature('postComment', postCommentsReducer),
    EffectsModule.forFeature([PostEffects, CommentEffects, PostCommentsEffects]),
    PostRoutingModule
  ],
  entryComponents: [
    PostConfirmDeleteComponent
  ],
  declarations: [
    PostComponent,
    PostListComponent,
    PostListItemComponent,
    PostConfirmDeleteComponent,
    CommentComponent,
    CommentListComponent,
    CommentListItemComponent,
    CommentConfirmDeleteComponent
  ],
  providers: [
    PostService,
    CommentService,
    PostCommentsService
  ]
})
export class PostModule { }
