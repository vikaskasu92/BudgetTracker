import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';

@Component({
    selector:"app-newInsurance",
    templateUrl:"./newInsurance.component.html",
    styleUrls:['./newInsurance.component.css']
})
export class NewInsuranceComponent{

    constructor(private dataStore:DataStoreService,
        private common:CommonService){}

    @ViewChild('insuranceForm',{static:true}) insuranceForm:NgForm;
    dateErrorMessage:string = "Date is a Required Field!";
    maxDate:Date;
    currentExpansionPanel:string;
    openPanel = false;

    ngOnInit(): void {
        this.maxDate = new Date();
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"newInsurance",this.openPanel);
        });
    }

    datePickerCalled(){
        this.common.datePickerCalled(this.insuranceForm,this.dateErrorMessage);
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("newInsurance");
    }

    saveInsurance(){
        if(this.insuranceForm.valid){
            this.dataStore.storeInsuranceDataToDB(this.insuranceForm.form.value).subscribe(
                success =>{
                    this.insuranceForm.resetForm();
                    this.common.snackBarOpen("Successfully Saved!");
                }, failure =>{
                    this.common.snackBarOpen("Error has Occured While Saving!");
                }
            );
        }
    }
}