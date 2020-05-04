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
    cancelPurchaseEnabled = true;

    ngOnInit(): void {
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

    cancelUpdate(event:any){
        this.dialogRef.close(true);
    }
    
    updatePurchases(formData:any){
        if(formData.valid){
            this.dialogRef.close(formData);
        }
    }

    private _updateDateFromMonthToYear(date:string){
        let year = date.substring(0,4);
        let month = date.substring(5,7);
        let day = date.substring(8,10);
        return month+'-'+day+'-'+year;
    }
}