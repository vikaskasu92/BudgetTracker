import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { InputDataService } from '../../services/inputData.service';
import { DataStoreService } from '../../services/dataStore.service';

@Component({
    selector:'app-editRawData',
    templateUrl:'./editRawData.component.html',
    styleUrls:['./editRawData.component.css']
})
export class EditRawDataComponent implements OnInit{

    constructor(public dialogRef: MatDialogRef<EditRawDataComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private common:CommonService,
        private inputDataService:InputDataService,
        private dataStore:DataStoreService){}

    purchaseForm:FormGroup;
    category:any;
    subCategory:any;
    cancelPurchaseEnabled = true;

    ngOnInit(): void {
        this.category = Object.values(this.common.category);
        this.purchaseForm = this.inputDataService.createFormGroup(
            this.purchaseForm,this.data.item,this.data.cost.toFixed(2),
            this.data.mainCategory,this.data.subCategory,this.data.date,false);
        this.purchaseForm.controls.mainCategory.valueChanges.subscribe( value =>{
            this.subCategory = this.common.generateSubCategories(value);
        });
        this.subCategory = this.common.generateSubCategories(this.data.mainCategory);
    }

    cancelUpdate(event:any){
        this.dialogRef.close(true);
    }
    
    updatePurchases(formData:any){
        if(formData.valid){
            this.dialogRef.close(formData);
        }
    }

}