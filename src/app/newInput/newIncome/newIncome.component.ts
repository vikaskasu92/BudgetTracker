import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { MatSnackBar } from '@angular/material';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
    selector:'app-newIncome',
    templateUrl:'./newIncome.component.html',
    styleUrls:['./newIncome.component.css']
})
export class NewIncomeComponent implements OnInit{

    constructor(private dataStore:DataStoreService, 
        private _snackBar:MatSnackBar,
        private common:CommonService){}

    @ViewChild('incomeForm',{static:true}) incomeForm:NgForm;
    dateErrorMessage:string = "Date is a Required Field!";
    maxDate:Date;
    currentExpansionPanel:string;
    openPanel=false;

    ngOnInit(): void {
        this.maxDate = new Date();
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"newIncome",this.openPanel);
        })
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("newIncome");
    }

    datePickerCalled(){
        this.common.datePickerCalled(this.incomeForm,this.dateErrorMessage);
    }

    saveIncome(){
        if(this.incomeForm.valid){
            this.dataStore.storeIncomeDataToDB(this.incomeForm.form.value).subscribe(
                success =>{
                    this.incomeForm.resetForm();
                    this.common.snackBarOpen("Successfully Saved!");
                }, failure =>{
                    this.common.snackBarOpen("Error has Occured While Saving!");
                }
            );
        }
    }
}