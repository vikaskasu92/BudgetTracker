import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

    salaryAndTaxForm:FormGroup;
    dateErrorMessage:string = "Date is a Required Field!";
    maxDate:Date;
    currentExpansionPanel:string;
    openPanel=false;

    ngOnInit(): void {
        this.salaryAndTaxForm = new FormGroup({
            'salary': new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'salaryRecievedDate': new FormControl(null,Validators.required),
            'federalTax': new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'stateTax': new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'medicareTax': new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'socialSecurityTax': new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')])
        })
        this.maxDate = new Date();
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel => {
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"newIncome",this.openPanel);
        })
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("newIncome");
    }

    saveIncome(){
        if(this.salaryAndTaxForm.valid){
            this._updateDate(this.salaryAndTaxForm.value.salaryRecievedDate,this.salaryAndTaxForm);
            this.dataStore.storeIncomeDataToDB(this.salaryAndTaxForm.value).subscribe(
                success =>{
                    this.salaryAndTaxForm.reset();
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
            form.value.salaryRecievedDate = year+'-'+month+'-'+day;
        }
    }

    private _adjustDigits(number:string){
        if(number.length == 1){
            return number = "0"+number;
        }
        return number;
    }
}