import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector:'app-errorDialog',
    templateUrl:'./errorDialog.component.html',
    styleUrls:['./errorDialog.component.css']
})
export class ErrorDialogComponent implements OnInit{

    constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any){}

    ngOnInit(){
        let element:any = document.getElementById('errorDialogHeader').parentNode.parentNode;
        element.style.background = "#D3504D";
    }

    confirmClosing(){
        this.dialogRef.close(true);
    }

}