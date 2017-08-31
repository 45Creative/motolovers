import {
  Component, OnInit, OnDestroy
} from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { MdDialog, MdSnackBar, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { fadeInAnimation } from "../../../../route.animation";
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';


import { AbstractControl, FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromRoot from '../../../../core/reducers';
import * as fromCreative from '../../../reducers';

import { User } from '../../../../core/auth/model';
import { Profile, Address } from '../../model';

import { AddressDialogComponent } from './address/address-dialog.component';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'ms-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})
export class ProfileComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  profile$: Observable<Profile>;
  user: User;

  addresses: Address[];

  profileForm: FormGroup;

  constructor(
    public avatarDialog: MdDialog,
    private snackBar: MdSnackBar,
    private store: Store<fromRoot.AppState>,
    private creativeStore: Store<fromCreative.CreativeState>,
    private fb: FormBuilder,
    public dialog: MdDialog
  ) {
    this.user$ = this.store.select(fromRoot.getUser);
    this.profile$ = this.creativeStore.select(fromCreative.getProfile);
  }

  ngOnInit() {
    this.user$.subscribe(afUser => {
      if (afUser)
        this.user = afUser;
    });

    this.addresses = [];

    this.profile$.subscribe(afUserProfile => {
      if (afUserProfile)
        console.log(afUserProfile);
    });

    this.profileForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])]
    });

  }

  addAddress(): void {

    let dialogRef = this.dialog.open(AddressDialogComponent, {width: '650px', height: '400px' , data: Address } );

    dialogRef.afterClosed().subscribe(result => {
      console.log('Address dialog was closed');
      this.addresses.push(result);
    });

  }

  openAvatarDialog() {
    let dialogRef = this.avatarDialog.open(UploadAvatarComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open(result);
      }
    });
  }

  onProfileSubmit() {

  }


  ngOnDestroy() {
  }

}
