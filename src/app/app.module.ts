import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { reducers } from './core/reducers';
//import { CustomRouterStateSerializer } from './core/utils/utils';

import { AppComponent } from './app.component';
import { MdIconRegistry, } from "@angular/material";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from './core/core.module';
import { CreativeModule } from './creative/creative.module';
import { SortablejsModule, SortablejsOptions } from 'angular-sortablejs';

import { CONFIG } from '../environments/environment';

export const firebaseConfig: FirebaseAppConfig = CONFIG.firebaseConfig;

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  swipePropagation: false
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "~assets/i18n/", ".json");
}

const sortablejsConfig: SortablejsOptions = {
  animation: 300
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    //firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CoreModule,
    CreativeModule,
    AppRoutingModule,

    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([]),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),

    EffectsModule.forRoot([]),

    SortablejsModule,
    PerfectScrollbarModule.forRoot(perfectScrollbarConfig)
    // StoreDevtoolsModule.instrument()

  ],
  providers: [
    MdIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
