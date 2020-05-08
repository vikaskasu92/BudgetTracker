import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlarmDialogComponent } from 'src/app/shared/dialogs/alarmDialog/alarmDialog.component';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';

@Component({
    selector:'app-alarms',
    templateUrl:'./alarms.component.html',
    styleUrls:['./alarms.component.css']
})
export class AlarmsComponent implements OnInit{

    constructor(private matDialog:MatDialog,
                private dataStore:DataStoreService,
                private dataRetrieval:DataRetrievalService){}

    noAlarms:boolean = true;
    budgetAlarms:any = [];

    ngOnInit(): void {
        this.retrieveAlarms(false);
    }

    retrieveAlarms(recheck:boolean){
        this.dataRetrieval.getAllAlarms().subscribe( length => {
            this.dataRetrieval.allAlarms.length === 0 ? this.noAlarms = true : this.noAlarms = false;
            if(length > 0 && recheck != true){
                this.dataRetrieval.checkAndIntiateAlarms(this.dataRetrieval.allAlarms).subscribe( () => {
                    this.retrieveAlarms(true);
                },failure =>{
                    console.log("Error Checking alarm triggers");
                });
                this._generateTables(this.dataRetrieval.allAlarms);
            }
        },failure => {
            console.log("Error Creating alarm");
        });
    }

    _generateTables(response:any){
        this.budgetAlarms = [];
        for(let i=0; i<response.length; i++){
            let currentObj = {
                budgetAmount:response[i].budgetAmount,
                budgetEmail:response[i].budgetEmail,
                alarmBy:response[i].alarmBy
            }
            this.budgetAlarms.push(currentObj);
        }
    }

    addNewAlarm(){
        this._openNewAlarmDialog();
    }

    addAdditionalNewAlarm(){
        this._openNewAlarmDialog();
    }

    private _openNewAlarmDialog(){
        let dialogRef = this.matDialog.open(AlarmDialogComponent,{
            disableClose:true,
            data:{displayMessage:'Create Alarm'}
        });
        dialogRef.afterClosed().subscribe( response =>{
            if(response != true){
                this._createBudgetAlarm(response);
            }
        });
    }

    private _createBudgetAlarm(response:any){
        this.dataStore.createNewBudgetAlarm(response.value).subscribe( response => {
            this.retrieveAlarms(false);
        },failure => {
            console.log("Error Creating alarm");
        });
    }
}