import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { MatSnackBarConfig } from '@angular/material';
import { InputDataService } from 'src/app/shared/services/inputData.service';

@Component({
    selector:"app-newInsurance",
    templateUrl:"./newInsurance.component.html",
    styleUrls:['./newInsurance.component.css']
})
export class NewInsuranceComponent{

    constructor(private dataStore:DataStoreService,
        private common:CommonService,
        private inputDate:InputDataService){}

    insuranceFormToReset:NgForm;
    insuranceForm:FormGroup;
    insurances:string[];
    currentExpansionPanel:string;
    openPanel = false;
    config = new MatSnackBarConfig();
    cancelInsuranceEnabled = false;

    ngOnInit(): void {
        this.insuranceForm = this.inputDate.createInsuranceFormGroup(this.insuranceForm,null,null,null);
        this.insurances = this.common.insurances;
        this.insuranceForm.controls.insurancePaidDate.setValidators([Validators.required]);
        this.insuranceForm.controls.insurancePaidDate.updateValueAndValidity();
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"newInsurance",this.openPanel);
        });
        this.config.panelClass = ['custom-class'];
        this.config.duration = 3000;
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("newInsurance");
    }

    saveOrUpdateInsurance(formData:FormGroup){
        if(formData.valid){
            this.common.updateDate(formData.value.insurancePaidDate,formData);
            this.dataStore.storeInsuranceDataToDB(formData.value).subscribe(
                success =>{
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
}