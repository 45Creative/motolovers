import { NgModule, ModuleWithProviders } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer } from './store/reducers/auth.reducer';


@NgModule({
  imports: [
  ],
  providers: [
  ]
})

export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, AuthGuard],
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})

export class RootAuthModule { }
