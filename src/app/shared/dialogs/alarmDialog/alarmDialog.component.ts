import { Component, Inject, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { InputDataService } from '../../services/inputData.service';
import { LocalAuthService } from '../../services/auth.service';

@Component({
    selector:'app-alarmDialog',
    templateUrl:'./alarmDialog.component.html',
    styleUrls:['./alarmDialog.component.css']
})
export class AlarmDialogComponent implements OnInit, AfterViewInit{

    constructor(public dialogRef: MatDialogRef<AlarmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        private inputDataService:InputDataService,
        private localAuthService:LocalAuthService){}

    newAlarmForm:FormGroup;
    isDarkTheme:boolean;
    isDark:boolean
    userEmail:string;
    @ViewChild('divValue',{static:false}) divValue:ElementRef;

    ngOnInit(): void {
        this.localAuthService.userEmail.subscribe( value=>{
            console.log(this.userEmail);
            this.userEmail = value;
            console.log(this.userEmail);
        });
        this.newAlarmForm =  this.inputDataService.createNewAlarmForm(this.newAlarmForm,this.userEmail);
        this.isDarkTheme = this.data.isDarkTheme;
        this.isDark = this.data.isDark;
    }

    
    ngAfterViewInit(): void {
        if(this.isDark){
            this.divValue.nativeElement.parentElement.parentElement.style = 'background-color:#303030;';
        }
    }

    createAlarm(){
        if(this.newAlarmForm.valid){
            this.dialogRef.close(this.newAlarmForm);
        }
    }

    cancelAlarm(){
        this.dialogRef.close(true);
    }

}