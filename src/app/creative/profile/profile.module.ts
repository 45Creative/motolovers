import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from '../../material-components.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthModule } from '../../core/auth/auth.module';

import { ProfileService, UploadImagesService } from './services';
import { ProfileEffects } from './store/effects/profile.effects';
import { profileReducer } from './store/reducers/profile.reducers';

import { ProfileComponent, UploadAvatarComponent, AddressDialogComponent } from './components';

import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialComponentsModule,
    FlexLayoutModule,
    AuthModule,
    //store
    StoreModule.forFeature('profile', profileReducer),
    //ngrx effects
    EffectsModule.forFeature([ProfileEffects]),
    //routeing
    ProfileRoutingModule
  ],
  entryComponents: [
    UploadAvatarComponent,
    AddressDialogComponent
  ],
  declarations: [
    ProfileComponent,
    UploadAvatarComponent,
    AddressDialogComponent 
  ],
  providers: [
    //Services
    ProfileService,
    UploadImagesService
  ]
})
export class ProfileModule { }
