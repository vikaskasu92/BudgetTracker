import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { MatSnackBarConfig } from '@angular/material';
import { InputDataService } from 'src/app/shared/services/inputData.service';

@Component({
    selector:'app-newPurchase',
    templateUrl:'./newPurchase.component.html',
    styleUrls:['./newPurchase.component.css']
})
export class NewPurchaseComponent implements OnInit{

    constructor(private dataStore:DataStoreService,
        private common:CommonService,
        private inputDataService:InputDataService){}

    purchaseFormToReset:NgForm;
    purchaseForm:FormGroup;
    openPanel=true;
    currentExpansionPanel:string;
    subCategory = {};
    config = new MatSnackBarConfig();
    cancelPurchaseEnabled = false;

    ngOnInit(): void {
        this.purchaseForm = this.inputDataService.createPurchaseFormGroup(this.purchaseForm,null,null,null,null,null,true);
        this.purchaseForm.controls.date.setValidators([Validators.required]);
        this.purchaseForm.controls.date.updateValueAndValidity();
        this._categoriesOnChange();
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel =>{
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"purchasesAndInvestments",this.openPanel);
        });
        this.config.panelClass = ['custom-class'];
        this.config.duration = 3000;
    }

    savePurchases(formData:any){
        this.purchaseForm = formData;
        if(this.purchaseForm.valid){
            this.common.updateDate(this.purchaseForm.value.date,this.purchaseForm);
            this.dataStore.storePurchaseDataToDB(this.purchaseForm.value).subscribe(
                success =>{
                    this.purchaseFormToReset.resetForm();
                    this.common.snackBarOpen("Successfully Saved!",this.config);
                }, failure =>{
                    this.common.snackBarOpen("Error has Occured While Saving!",this.config);
                }
            );
        }else{
            this.inputDataService.addValidationsClassNames(this.purchaseForm);
        }
    }

    private _categoriesOnChange(){
        this.purchaseForm.controls.mainCategory.valueChanges.subscribe( value =>{
            document.getElementById('mainCategory').classList.remove("mat-form-field-invalid");
            this.purchaseForm.controls.subCategory.enable();
            this.subCategory = this.common.generateSubCategories(value);
        });
        this.purchaseForm.controls.subCategory.valueChanges.subscribe( () =>{
            document.getElementById('subCategory').classList.remove("mat-form-field-invalid");
        });
    }

    updateFormToReset(formToReset:any){
        this.purchaseFormToReset = formToReset;
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("purchasesAndInvestments");
    }

    

}