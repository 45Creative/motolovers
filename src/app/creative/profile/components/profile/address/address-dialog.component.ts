import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { Address } from './../../../model';

@Component({
    selector: 'address-dialog',
    templateUrl: 'address-dialog.component.html'
})
export class AddressDialogComponent {

    constructor(
        public dialogRef: MdDialogRef<AddressDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: Address) { }


    ngOnInit() {
        this.data = new Address("","","","","");    
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}