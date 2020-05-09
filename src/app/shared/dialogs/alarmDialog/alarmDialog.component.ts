import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { InputDataService } from '../../services/inputData.service';

@Component({
    selector:'app-alarmDialog',
    templateUrl:'./alarmDialog.component.html',
    styleUrls:['./alarmDialog.component.css']
})
export class AlarmDialogComponent implements OnInit{

    constructor(public dialogRef: MatDialogRef<AlarmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, 
        private inputDataService:InputDataService){}

    newAlarmForm:FormGroup;

    ngOnInit(): void {
        this.newAlarmForm =  this.inputDataService.createNewAlarmForm(this.newAlarmForm);
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