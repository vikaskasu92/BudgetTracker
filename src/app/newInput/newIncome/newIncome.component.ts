import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CommonService } from 'src/app/shared/services/common.service';
import { InputDataService } from 'src/app/shared/services/inputData.service';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';

@Component({
    selector:'app-newIncome',
    templateUrl:'./newIncome.component.html',
    styleUrls:['./newIncome.component.css']
})
export class NewIncomeComponent implements OnInit{

    constructor(private dataStore:DataStoreService,
        private common:CommonService,
        private inputData:InputDataService,
        private dataRetrieval:DataRetrievalService){}

    salaryAndTaxFormToReset:NgForm;
    incomeForm:FormGroup;
    currentExpansionPanel:string;
    openPanel=false;
    config = new MatSnackBarConfig();
    cancelIncomeEnabled = false;

    ngOnInit(): void {
        this.incomeForm = this.inputData.createIncomeFormGroup(this.incomeForm,null,null,null,null,null,null);
        this.incomeForm.controls.dateRecieved.setValidators([Validators.required]);
        this.incomeForm.controls.dateRecieved.updateValueAndValidity();
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"newIncome",this.openPanel);
        });
        this.config.panelClass = ['custom-class'];
        this.config.duration = 3000;
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("newIncome");
    }

    saveIncome(formData:any){
        if(formData.valid){
            this.common.updateIncomeDate(formData.value.dateRecieved,formData);
            this.dataStore.storeIncomeDataToDB(formData.value).subscribe(
                success =>{
                    this.dataRetrieval.getAllAlarms().subscribe( ()=> {
                        this.dataRetrieval.checkAndIntiateAlarms(this.dataRetrieval.allAlarms).subscribe( response => {

                        },failure =>{
    
                        });
                    });
                    this.salaryAndTaxFormToReset.resetForm();
                    this.common.snackBarOpen("Successfully Saved!",this.config);
                }, failure =>{
                    this.common.snackBarOpen("Error has Occured While Saving!",this.config);
                }
            );
        }
    }

    updateIncomeFormToReset(formReset:any){
        this.salaryAndTaxFormToReset = formReset;
    }
    
}