import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlarmDialogComponent } from 'src/app/shared/dialogs/alarmDialog/alarmDialog.component';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirmDialog/confirmDialog.component';
import { InputDataService } from 'src/app/shared/services/inputData.service';
import { ErrorDialogComponent } from 'src/app/shared/dialogs/errorDialog/errorDialog.component';

@Component({
    selector:'app-alarms',
    templateUrl:'./alarms.component.html',
    styleUrls:['./alarms.component.css']
})
export class AlarmsComponent implements OnInit{

    constructor(private matDialog:MatDialog,
                private dataStore:DataStoreService,
                private dataRetrieval:DataRetrievalService,
                private inputDataService:InputDataService,
                private dialog: MatDialog){}

    noAlarms:boolean = true;
    budgetAlarms:any = [];

    ngOnInit(): void {
        this.retrieveAlarms(false);
    }

    retrieveAlarms(recheck:boolean){
        this.dataRetrieval.getAllAlarms().subscribe( length => {
            this.dataRetrieval.allAlarms.length === 0 ? this.noAlarms = true : this.noAlarms = false;
            if(length > 0 && recheck != true){
                this.dataStore.checkAndIntiateAlarms().subscribe( () => {
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

    deleteBudgetAlarm(id:number){
        const data = {message:'Are you sure, you want to delete the alarm?'};
        const dialogRef =  this.inputDataService.openDialog(this.matDialog,ConfirmDialogComponent,data);
       
        dialogRef.afterClosed().subscribe( response =>{
            const deleteObj = {deleteById:id};
            if(response){
                this.dataStore.deleteBudgetAlarmFromDB(deleteObj).subscribe( response =>{
                    if(response != null){
                        const data = {message:"As a 'Demo User' you cannot delete data from budget tracker!"};
                        this.inputDataService.openDialog(this.dialog,ErrorDialogComponent,data);        
                      }else{
                        this.retrieveAlarms(false);
                      } 
                },failure =>{
                    console.log("Error Deleting alarm");
                })
            }
        });
    }

    addNewAlarm(){
        this._openNewAlarmDialog();
    }

    addAdditionalNewAlarm(){
        this._openNewAlarmDialog();
    }

    private _generateTables(response:any){
        this.budgetAlarms = [];
        for(let i=0; i<response.length; i++){
            let currentObj = {
                budgetAmount:response[i].budgetAmount,
                budgetEmail:response[i].budgetEmail,
                alarmBy:response[i].alarmBy,
                id:response[i].id
            }
            this.budgetAlarms.push(currentObj);
        }
    }

    private _openNewAlarmDialog(){
        const data = {displayMessage:'Create Alarm'};
        const dialogRef =  this.inputDataService.openDialog(this.matDialog,AlarmDialogComponent,data);
       
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