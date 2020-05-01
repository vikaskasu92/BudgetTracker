import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector:'app-confirmClose',
    templateUrl:'./confirmCloseLoan.component.html',
    styleUrls:['./confirmCloseLoan.component.css']
})
export class ConfirmCloseLoanComponent{
    
    constructor(public dialogRef: MatDialogRef<ConfirmCloseLoanComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any){}

    confirmClosing(){
        this.dialogRef.close(true);
    }

    cancelConfirm(){
        this.dialogRef.close(false);
    }

}