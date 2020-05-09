import { Component } from '@angular/core';
import { FormGroup, Validators, NgForm } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { MatSnackBarConfig } from '@angular/material';
import { InputDataService } from 'src/app/shared/services/inputData.service';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';

@Component({
    selector:"app-newInsurance",
    templateUrl:"./newInsurance.component.html",
    styleUrls:['./newInsurance.component.css']
})
export class NewInsuranceComponent{

    constructor(private dataStore:DataStoreService,
        private common:CommonService,
        private inputDataService:InputDataService,
        private dataRetrieval:DataRetrievalService){}

    insuranceFormToReset:NgForm;
    insuranceForm:FormGroup;
    insurances:string[];
    currentExpansionPanel:string;
    openPanel:boolean = false;
    config:MatSnackBarConfig = new MatSnackBarConfig();
    cancelInsuranceEnabled:boolean = false;

    ngOnInit(): void {
        this.insurances = this.common.insurances;
        this._createAndUpdateForm();
        this._executeExpansionPanel();
        this.config = this.inputDataService.addConfigForSnackBar(this.config);
    }


    expansionPanelClicked(){
        this.common.onExpansionPanelClick("newInsurance");
    }

    saveOrUpdateInsurance(formData:FormGroup){
        if(formData.valid){
            this.common.updateDate(formData.value.insurancePaidDate,formData);
            this.dataStore.storeInsuranceDataToDB(formData.value).subscribe(
                success =>{
                    this.dataRetrieval.getAllAlarms().subscribe( ()=> {
                        this.dataRetrieval.checkAndIntiateAlarms(this.dataRetrieval.allAlarms).subscribe( response => {

                        },failure =>{
    
                        });
                    });
                    this.insuranceFormToReset.resetForm();
                    this.common.snackBarOpen("Successfully Saved!",this.config);
                }, failure =>{
                    this.common.snackBarOpen("Error has Occured While Saving!",this.config);
                }
            );
        }
    }

    updateInsuranceFormReset(formReset:NgForm){
        this.insuranceFormToReset = formReset;
    }

    private _executeExpansionPanel(){
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"newInsurance",this.openPanel);
        });
    }

    private _createAndUpdateForm(){
        this.insuranceForm = this.inputDataService.createInsuranceFormGroup(this.insuranceForm,null,null,null); 
        this.insuranceForm.controls.insurancePaidDate.setValidators([Validators.required]);
        this.insuranceForm.controls.insurancePaidDate.updateValueAndValidity();
    }
}