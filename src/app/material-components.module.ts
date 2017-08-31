import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'hammerjs';
import {
  MdAutocompleteModule, MdButtonModule, MdCardModule, MdCheckboxModule, MdDatepickerModule, MdDialogModule,
  MdGridListModule, MdIconModule, MdInputModule, MdListModule,
  MdMenuModule, MdNativeDateModule, MdProgressBarModule, MdProgressSpinnerModule, MdRippleModule, MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule, MdSnackBarModule, MdTabsModule, MdToolbarModule, MdTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MdInputModule,
    MdTabsModule,
    MdIconModule,
    MdListModule,
    MdButtonModule,
    MdToolbarModule,
    MdDialogModule,
    MdMenuModule,
    MdGridListModule,
    MdCardModule,
    MdSnackBarModule,
    MdTooltipModule,
    MdSliderModule,
    MdAutocompleteModule,
    MdDatepickerModule,
    MdSlideToggleModule,
    MdSidenavModule,
    MdCheckboxModule,
    MdNativeDateModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdSelectModule,
    MdRippleModule
  ],
  declarations: []
})
export class MaterialComponentsModule { }
