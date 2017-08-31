import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../material-components.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthModule } from '../../core/auth/auth.module';

import { PostService } from './services/post.services';
import { PostEffects } from './store/effects/post.effects';
import { postReducer } from './store/reducers/post.reducers';

import { PostComponent, PostListComponent, PostListItemComponent, PostConfirmDeleteComponent } from './components';

import { PostRoutingModule } from './post-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    AuthModule,
    //store
    StoreModule.forFeature('post', postReducer),
    //ngrx effects
    EffectsModule.forFeature([PostEffects]),
    //routeing
    PostRoutingModule
  ],
  entryComponents: [
    PostConfirmDeleteComponent
  ],
  declarations: [
    PostComponent,
    PostListComponent,
    PostListItemComponent,
    PostConfirmDeleteComponent
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
