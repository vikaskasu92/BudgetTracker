import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { InputDataService } from '../../services/inputData.service';

@Component({
    selector:'app-alarmDialog',
    templateUrl:'./alarmDialog.component.html',
    styleUrls:['./alarmDialog.component.css']
})
export class AlarmDialogComponent implements OnInit{

    constructor(public dialogRef: MatDialogRef<AlarmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private common:CommonService, 
        private inputData:InputDataService){}

    newAlarmForm:FormGroup;
    alarmTypes:string[];
    frequencies:string[];
    periodicAlarm:boolean;
    budgetAlarm:boolean;

    ngOnInit(): void {
        this.alarmTypes = this.common.alarmTypes;
        this.frequencies = this.common.frequencies;
        this.newAlarmForm =  this.inputData.createNewAlarmForm(this.newAlarmForm);
        this.newAlarmForm.controls.alarmTypes.valueChanges.subscribe( value => {
            this._openCloseAlarmTypes(value);
        });
    }

    private _setValidationsForPeriodicAlarm(){
        this.newAlarmForm.controls.frequency.setValidators([Validators.required]);
        this.newAlarmForm.controls.frequency.updateValueAndValidity();
        this.newAlarmForm.controls.periodicEmail.setValidators([Validators.required,Validators.email]);
        this.newAlarmForm.controls.periodicEmail.updateValueAndValidity();
        this.newAlarmForm.controls.budgetAmount.clearValidators();
        this.newAlarmForm.controls.budgetEmail.clearValidators();
    }

    private _setValidationsForBudgetAlarm(){
        this.newAlarmForm.controls.budgetAmount.setValidators([Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]);
        this.newAlarmForm.controls.budgetAmount.updateValueAndValidity();
        this.newAlarmForm.controls.budgetEmail.setValidators([Validators.required,Validators.email]);
        this.newAlarmForm.controls.budgetEmail.updateValueAndValidity();
        this.newAlarmForm.controls.frequency.clearValidators();
        this.newAlarmForm.controls.periodicEmail.clearValidators();
    }

    private _openCloseAlarmTypes(value:string){
        if(value === "PeriodicAlarm"){
            this._setValidationsForPeriodicAlarm();
            this.budgetAlarm = false;
            this.periodicAlarm = true;
        }else{
            this._setValidationsForBudgetAlarm();
            this.periodicAlarm = false;
            this.budgetAlarm = true;  
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