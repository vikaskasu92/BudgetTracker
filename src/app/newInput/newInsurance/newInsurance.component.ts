import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

    insuranceForm:FormGroup;
    insurances:string[];
    maxDate:Date;
    currentExpansionPanel:string;
    openPanel = false;

    ngOnInit(): void {
        this.insuranceForm = new FormGroup({
            'insuranceType': new FormControl(null,Validators.required),
            'insuranceAmount': new FormControl(null,Validators.required),
            'insurancePurchasedDate': new FormControl(null,Validators.required)
        });
        this.insurances = this.common.insurances;
        this.maxDate = new Date();
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"newInsurance",this.openPanel);
        });
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("newInsurance");
    }

    saveInsurance(){
        if(this.insuranceForm.valid){
            this._updateDate(this.insuranceForm.value.insurancePurchasedDate,this.insuranceForm);
            this.dataStore.storeInsuranceDataToDB(this.insuranceForm.value).subscribe(
                success =>{
                    this.insuranceForm.reset();
                    this.common.snackBarOpen("Successfully Saved!");
                }, failure =>{
                    this.common.snackBarOpen("Error has Occured While Saving!");
                }
            );
        }
    }

    private _updateDate(date:any,form:FormGroup){
        if(typeof date != "string"){
            let day = this._adjustDigits(date.getDate().toString());
            let month = this._adjustDigits((date.getMonth()+1).toString());
            let year = date.getFullYear().toString();
            form.value.insurancePurchasedDate = year+'-'+month+'-'+day;
        }
    }

    private _adjustDigits(number:string){
        if(number.length == 1){
            return number = "0"+number;
        }
        return number;
    }
}