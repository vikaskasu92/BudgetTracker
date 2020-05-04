import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector:'app-confirmClose',
    templateUrl:'./confirmDialog.component.html',
    styleUrls:['./confirmDialog.component.css']
})
export class ConfirmDialogComponent{
    
    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any){}

    confirmClosing(){
        this.dialogRef.close(true);
    }

    cancelConfirm(){
        this.dialogRef.close(false);
    }

}