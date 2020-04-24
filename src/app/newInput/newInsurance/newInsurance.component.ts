import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InternalCommunicationService } from 'src/app/shared/services/internalCommunication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataStore } from 'src/app/shared/services/dataStore.service';

@Component({
    selector:"app-newInsurance",
    templateUrl:"./newInsurance.component.html",
    styleUrls:['./newInsurance.component.css']
})
export class NewInsurance{

    constructor(private dataStore:DataStore,
        private intComm:InternalCommunicationService,
        private _snackBar:MatSnackBar,
        private insuranceExpansionPanel:ElementRef){}

    @ViewChild('insuranceForm',{static:true}) insuranceForm:NgForm;
    dateErrorMessage:string = "Date is a Required Field!";
    maxDate:Date;
    currentExpansionPanel:string;
    openPanel = false;

    ngOnInit(): void {
        this.maxDate = new Date();
        this.intComm.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.intComm.expansionPanelDecision(this.currentExpansionPanel,"newInsurance",this.openPanel);
        });
    }

    datePickerCalled(){
        this.intComm.datePickerCalled(this.insuranceForm,this.dateErrorMessage);
    }

    expansionPanelClicked(){
        this.intComm.onExpansionPanelClick("newInsurance");
    }

    saveInsurance(){
        if(this.insuranceForm.valid){
            this.dataStore.storeInsuranceDataToDB(this.insuranceForm.form.value).subscribe(
                success =>{
                    this.insuranceForm.resetForm();
                    this.intComm.snackBarOpen("Successfully Saved!");
                }, failure =>{
                    this.intComm.snackBarOpen("Error has Occured While Saving!");
                }
            );
        }
    }
}