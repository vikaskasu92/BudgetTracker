import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from './common.service';

@Injectable({providedIn:'root'})
export class InputDataService{

    constructor(private common:CommonService){}

    createPurchaseFormGroup(purchaseForm:FormGroup,item:string,cost:number,mainCategory:string,subCategory:string,date:any,disable:boolean){
        purchaseForm = new FormGroup({
            'item': new FormControl(item,Validators.required),
            'cost': new FormControl(cost,[Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'),Validators.required]),
            'date': new FormControl(date),
            'mainCategory': new FormControl(mainCategory,Validators.required),
            'subCategory': new FormControl({value: subCategory, disabled: disable},Validators.required),
         });
        return purchaseForm;
    }

    createInsuranceFormGroup(insuranceForm:FormGroup,insuranceType:string,insurnacePaidAmount:number,insurancePaidDate:any){
        insuranceForm = new FormGroup({
            'insuranceType': new FormControl(insuranceType,Validators.required),
            'insurnacePaidAmount': new FormControl(insurnacePaidAmount,[Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'),Validators.required]),
            'insurancePaidDate': new FormControl(insurancePaidDate),
        });
        return insuranceForm;
    }

    createIncomeFormGroup(incomeForm:FormGroup,salaryRecieved:number,dateRecieved:Date,federalTax:number,stateTax:number,medicareTax:number,socialSecurityTax:number){
        incomeForm = new FormGroup({
            'salaryRecieved': new FormControl(salaryRecieved,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'dateRecieved': new FormControl(dateRecieved),
            'federalTax': new FormControl(federalTax,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'stateTax': new FormControl(stateTax,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'medicareTax': new FormControl(medicareTax,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'socialSecurityTax': new FormControl(socialSecurityTax,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')])
        })
        return incomeForm;
    }

    createNewAlarmForm(newAlarmForm:FormGroup){
            newAlarmForm = new FormGroup({
            'alarmTypes' : new FormControl(null,Validators.required),
            'frequency' : new FormControl(null),
            'periodicEmail' : new FormControl(null),
            'alarmBy' : new FormControl(null),
            'budgetAmount' : new FormControl(null),
            'budgetEmail' : new FormControl(null,)
        });
        return newAlarmForm;
    }

    addValidationsClassNames(purchaseForm:FormGroup){
        purchaseForm.controls.mainCategory.invalid ? document.getElementById('mainCategory').className += ' mat-form-field-invalid' : '';
        if(purchaseForm.controls.subCategory.enabled){
            purchaseForm.controls.subCategory.invalid ? document.getElementById('subCategory').className += ' mat-form-field-invalid' : '';
        }
    }

    


}