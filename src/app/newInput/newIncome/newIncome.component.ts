import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStore } from 'src/app/shared/services/dataStore.service';
import { MatSnackBar } from '@angular/material';
import { InternalCommunicationService } from 'src/app/shared/services/internalCommunication.service';

@Component({
    selector:'app-newIncome',
    templateUrl:'./newIncome.component.html',
    styleUrls:['./newIncome.component.css']
})
export class NewIncome implements OnInit{

    constructor(private dataStore:DataStore, 
        private _snackBar:MatSnackBar,
        private intComm:InternalCommunicationService){}

    @ViewChild('incomeForm',{static:true}) incomeForm:NgForm;
    dateErrorMessage:string = "Date is a Required Field!";
    maxDate:Date;
    currentExpansionPanel:string;
    openPanel=false;

    ngOnInit(): void {
        this.maxDate = new Date();
        this.intComm.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.intComm.expansionPanelDecision(this.currentExpansionPanel,"newIncome",this.openPanel);
        })
    }

    expansionPanelClicked(){
        this.intComm.onExpansionPanelClick("newIncome");
    }

    datePickerCalled(){
        this.intComm.datePickerCalled(this.incomeForm,this.dateErrorMessage);
    }

    saveIncome(){
        if(this.incomeForm.valid){
            this.dataStore.storeIncomeDataToDB(this.incomeForm.form.value).subscribe(
                success =>{
                    this.incomeForm.resetForm();
                    this.intComm.snackBarOpen("Successfully Saved!");
                }, failure =>{
                    this.intComm.snackBarOpen("Error has Occured While Saving!");
                }
            );
        }
    }
}