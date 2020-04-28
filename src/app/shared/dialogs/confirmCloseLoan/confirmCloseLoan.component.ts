import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector:'app-confirmClose',
    templateUrl:'./confirmCloseLoan.component.html',
    styleUrls:['./confirmCloseLoan.component.css']
})
export class ConfirmCloseLoanComponent{
    
    constructor(private dialogRef: MatDialogRef<ConfirmCloseLoanComponent>){}

    confirmClosing(){
        this.dialogRef.close(true);
    }

    cancelConfirm(){
        this.dialogRef.close(false);
    }

}