import { Component, Inject, ViewChild, ElementRef, OnChanges, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector:'app-confirmClose',
    templateUrl:'./confirmDialog.component.html',
    styleUrls:['./confirmDialog.component.css']
})
export class ConfirmDialogComponent implements OnInit, AfterViewInit{

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any){}

    isDarkTheme:boolean;
    isDark:boolean;
    @ViewChild('divValue',{static:false}) divValue:ElementRef;

    ngOnInit(): void {
        this.isDarkTheme = this.data.isDarkTheme;
        this.isDark = this.data.isDark;
    }

    ngAfterViewInit(): void {
        if(this.isDark){
            this.divValue.nativeElement.parentElement.parentElement.style = 'background-color:#303030;';
        }
    }

    confirmClosing(){
        this.dialogRef.close(true);
    }

    cancelConfirm(){
        this.dialogRef.close(false);
    }

}