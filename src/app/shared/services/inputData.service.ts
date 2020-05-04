import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from './common.service';

@Injectable({providedIn:'root'})
export class InputDataService{

    constructor(private common:CommonService){}

    createPurchaseFormGroup(purchaseForm:FormGroup,item:string,cost:number,mainCategory:string,subCategory:string,date:any,disable:boolean){
        if(cost === -1){
            cost = null;
        }
        purchaseForm = new FormGroup({
            'item': new FormControl(item,Validators.required),
            'cost': new FormControl(cost,[Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'),Validators.required]),
            'date': new FormControl(date),
            'mainCategory': new FormControl(mainCategory,Validators.required),
            'subCategory': new FormControl({value: subCategory, disabled: disable},Validators.required),
         });
        return purchaseForm;
    }

    createInsuranceFormGroup(insuranceForm:FormGroup,insuranceType:string,insurnacePaidAmount:number,insurancePaidDate:string){
        if(insurnacePaidAmount === -1){
            insurnacePaidAmount = null;
        }
        insuranceForm = new FormGroup({
            'insuranceType': new FormControl(insuranceType,Validators.required),
            'insurnacePaidAmount': new FormControl(insurnacePaidAmount,[Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'),Validators.required]),
            'insurancePaidDate': new FormControl(insurancePaidDate),
        });
        return insuranceForm;
    }

    addValidationsClassNames(purchaseForm:FormGroup){
        purchaseForm.controls.mainCategory.invalid ? document.getElementById('mainCategory').className += ' mat-form-field-invalid' : '';
        if(purchaseForm.controls.subCategory.enabled){
            purchaseForm.controls.subCategory.invalid ? document.getElementById('subCategory').className += ' mat-form-field-invalid' : '';
        }
    }

    


}