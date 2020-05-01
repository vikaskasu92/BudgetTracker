import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector:'app-confirmClose',
    templateUrl:'./confirm.component.html',
    styleUrls:['./confirm.component.css']
})
export class ConfirmComponent{
    
    constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any){}

    confirmClosing(){
        this.dialogRef.close(true);
    }

    cancelConfirm(){
        this.dialogRef.close(false);
    }

}