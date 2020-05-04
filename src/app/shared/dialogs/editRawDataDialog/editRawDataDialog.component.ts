import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { InputDataService } from '../../services/inputData.service';

@Component({
    selector:'app-editRawData',
    templateUrl:'./editRawDataDialog.component.html',
    styleUrls:['./editRawDataDialog.component.css']
})
export class EditRawDataDialogComponent implements OnInit{

    constructor(public dialogRef: MatDialogRef<EditRawDataDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private common:CommonService,
        private inputDataService:InputDataService){}

    purchaseForm:FormGroup;
    category:any;
    subCategory:any;
    cancelEnabled = true;
    insurances:any;
    insuranceForm:FormGroup;
    incomeForm:FormGroup;
    purchasesType:boolean = false;
    insuranceType:boolean = false;
    incomeType:boolean = false;

    ngOnInit(): void {
        if(this.data.type === "purchases"){
            this._purchaseFormSetup();
            this.purchasesType = true;
        }else if(this.data.type === "insurance"){
            this._insuranceFormSetup();
            this.insuranceType = true;
        }else if(this.data.type === "income"){
            this._incomeFormSetup();
            this.incomeType = true;
        }
    }

    cancelUpdate(event:any){
        this.dialogRef.close(true);
    }
    
    updateData(formData:any){
        if(formData.valid){
            this.dialogRef.close(formData);
        }
    }

    private _purchaseFormSetup(){
        let updatedDate = new Date(this._updateDateFromMonthToYear(this.data.date));
        this.category = Object.values(this.common.category);
        this.purchaseForm = this.inputDataService.createPurchaseFormGroup(
            this.purchaseForm,this.data.item,this.data.cost.toFixed(2),
            this.data.mainCategory,this.data.subCategory,updatedDate,false);
        this.purchaseForm.controls.mainCategory.valueChanges.subscribe( value =>{
            this.subCategory = this.common.generateSubCategories(value);
        });
        this.subCategory = this.common.generateSubCategories(this.data.mainCategory);
        this.purchaseForm.controls.date.setValidators([Validators.required]);
        this.purchaseForm.controls.date.updateValueAndValidity();
    }

    private _insuranceFormSetup(){
        let updatedDate = new Date(this._updateDateFromMonthToYear(this.data.insurancePaidDate));
        this.insurances = this.common.insurances;
        this.insuranceForm = this.inputDataService.createInsuranceFormGroup(this.insuranceForm,
            this.data.insuranceType,this.data.insurancePaidAmount.toFixed(2),updatedDate);
        this.insuranceForm.controls.insurancePaidDate.setValidators([Validators.required]);
        this.insuranceForm.controls.insurancePaidDate.updateValueAndValidity();
    }

    private _incomeFormSetup(){
        let updatedDate = new Date(this._updateDateFromMonthToYear(this.data.dateRecieved));
        this.incomeForm = this.inputDataService.createIncomeFormGroup(this.incomeForm,
            this.data.salaryRecieved.toFixed(2),updatedDate,
            this.data.federalTax.toFixed(2),this.data.stateTax.toFixed(2),
            this.data.medicareTax.toFixed(2),this.data.socialSecurityTax.toFixed(2));
        this.incomeForm.controls.dateRecieved.setValidators([Validators.required]);
        this.incomeForm.controls.dateRecieved.updateValueAndValidity();
    }

    private _updateDateFromMonthToYear(date:string){
        let year = date.substring(0,4);
        let month = date.substring(5,7);
        let day = date.substring(8,10);
        return month+'-'+day+'-'+year;
    }
}