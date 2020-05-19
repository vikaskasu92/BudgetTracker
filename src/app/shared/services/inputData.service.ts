import { Injectable, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from './common.service';
import { MatDialog, MatSnackBarConfig } from '@angular/material';

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
            'alarmBy' : new FormControl(null,Validators.required),
            'budgetAmount' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'budgetEmail' : new FormControl(null,[Validators.required,Validators.email])
        });
        return newAlarmForm;
    }

    createRawDataForm(rawDataForm:FormGroup){
        rawDataForm = new FormGroup({
          'inputType' : new FormControl(null,Validators.required),
          'fromDateSearch' : new FormControl(null,Validators.required),
          'toDateSearch' : new FormControl(null,Validators.required)
        });
        return rawDataForm;
      }

    createYearByYearForm(yearByYearForm:FormGroup){
        yearByYearForm = new FormGroup({
            'year': new FormControl({value: null, disabled: true},Validators.required),
            'category': new FormControl({value: null, disabled: true},Validators.required)
        });
        return yearByYearForm;
    }

    createNewLoanForm(loanForm:FormGroup){
        loanForm = new FormGroup({
            'loanName' : new FormControl(null,Validators.required),
            'loanType' : new FormControl(null,Validators.required),
            'loanBalance' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanAPR' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanEMI' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')])
        });
        return loanForm;
    }

    createEditLoanForm(loanForm:FormGroup,loanName:string,loanType:string,loanBalance:number,loanAPR:number,loanMonthlyAmount:number){
        loanForm = new FormGroup({
            'loanName' : new FormControl(loanName,Validators.required),
            'loanType' : new FormControl(loanType,Validators.required),
            'loanBalance' : new FormControl(loanBalance,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanAPR' : new FormControl(loanAPR,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanEMI' : new FormControl(loanMonthlyAmount,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')])
        });
        return loanForm;
    }

    createBarCategoryForm(categoriesForm:FormGroup){
        categoriesForm = new FormGroup({
            'mainCategory': new FormControl(null,Validators.required),
            'subCategory': new FormControl({value: null, disabled: true},Validators.required)
         });
        return categoriesForm;
    }

    createFirebaseSignUpLoginForm(firebaseLoginForm:FormGroup){
        firebaseLoginForm = new FormGroup({
            'email': new FormControl(null,[Validators.required,Validators.email]),
            'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
         });
        return firebaseLoginForm;
    }
    

    addValidationsClassNames(purchaseForm:FormGroup){
        purchaseForm.controls.mainCategory.invalid ? document.getElementById('mainCategory').className += ' mat-form-field-invalid' : '';
        if(purchaseForm.controls.subCategory.enabled){
            purchaseForm.controls.subCategory.invalid ? document.getElementById('subCategory').className += ' mat-form-field-invalid' : '';
        }
    }

    openDialog(dialog:MatDialog,component:any,data:any){
        const dialogRef = dialog.open(component, {
            disableClose: true,
            data:data,
             maxWidth: '100vw',
              maxHeight: '100vh'
        });
        return dialogRef;
    }

    addConfigForSnackBar(config:MatSnackBarConfig){
        config.panelClass = ['custom-class'];
        config.duration = 3000;
        return config;
    }
    

}