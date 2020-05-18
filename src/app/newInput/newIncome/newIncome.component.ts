import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { MatSnackBarConfig, MatDialog } from '@angular/material';
import { CommonService } from 'src/app/shared/services/common.service';
import { InputDataService } from 'src/app/shared/services/inputData.service';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';
import { ErrorDialogComponent } from 'src/app/shared/dialogs/errorDialog/errorDialog.component';

@Component({
    selector:'app-newIncome',
    templateUrl:'./newIncome.component.html',
    styleUrls:['./newIncome.component.css']
})
export class NewIncomeComponent implements OnInit{

    constructor(private dataStore:DataStoreService,
        private common:CommonService,
        private inputDataService:InputDataService,
        private dataRetrieval:DataRetrievalService,
        private matDialog:MatDialog){}

    salaryAndTaxFormToReset:NgForm;
    incomeForm:FormGroup;
    currentExpansionPanel:string;
    openPanel:boolean=false;
    config:MatSnackBarConfig = new MatSnackBarConfig();
    cancelIncomeEnabled:boolean = false;

    ngOnInit(): void {
        this._createAndUpdateForm();
        this._executeExpansionPanel();
        this.config = this.inputDataService.addConfigForSnackBar(this.config);
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("newIncome");
    }

    saveIncome(formData:FormGroup){
        if(formData.valid){
            this.common.updateIncomeDate(formData.value.dateRecieved,formData);
            this.dataStore.storeIncomeDataToDB(formData.value).subscribe(success =>{
                if(success === null){
                    this.dataRetrieval.getAllAlarms().subscribe( ()=> {
                        this.dataStore.checkAndIntiateAlarms().subscribe( response => {

                        },failure =>{
    
                        });
                    });
                    this.salaryAndTaxFormToReset.resetForm();
                    this.common.snackBarOpen("Successfully Saved!",this.config);
                }else{
                    const data = {message:"As a 'Demo User' you cannot create or modify Income data of 'salary' more than '$1500' and 'Tax Amount' not more than '$200 Each' from budget tracker! You can login to your account and add the amount you want!"};
                    this.inputDataService.openDialog(this.matDialog,ErrorDialogComponent,data);     
                }
            }, failure =>{
                this.common.snackBarOpen("Error has Occured While Saving!",this.config);
            }
            );
        }
    }

    updateIncomeFormToReset(formReset:NgForm){
        this.salaryAndTaxFormToReset = formReset;
    }
    
    private _executeExpansionPanel(){
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"newIncome",this.openPanel);
        });
    }

    private _createAndUpdateForm(){
        this.incomeForm = this.inputDataService.createIncomeFormGroup(this.incomeForm,null,null,null,null,null,null);
        this.incomeForm.controls.dateRecieved.setValidators([Validators.required]);
        this.incomeForm.controls.dateRecieved.updateValueAndValidity();
    }
}