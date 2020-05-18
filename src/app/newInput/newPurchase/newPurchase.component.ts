import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { MatSnackBarConfig, MatDialog } from '@angular/material';
import { InputDataService } from 'src/app/shared/services/inputData.service';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';
import { ErrorDialogComponent } from 'src/app/shared/dialogs/errorDialog/errorDialog.component';

@Component({
    selector:'app-newPurchase',
    templateUrl:'./newPurchase.component.html',
    styleUrls:['./newPurchase.component.css']
})
export class NewPurchaseComponent implements OnInit{

    constructor(private dataStore:DataStoreService,
        private common:CommonService,
        private inputDataService:InputDataService,
        private dataRetrieval:DataRetrievalService,
        private dialog:MatDialog){}

    purchaseFormToReset:NgForm;
    purchaseForm:FormGroup;
    openPanel:boolean=true;
    currentExpansionPanel:string;
    subCategory:{} = {};
    config:MatSnackBarConfig = new MatSnackBarConfig();
    cancelPurchaseEnabled:boolean = false;

    ngOnInit() {
        this._createAndUpdateForm();
        this._categoriesOnChange();
        this._executeExpansionPanel();
        this.config = this.inputDataService.addConfigForSnackBar(this.config);
    }

    savePurchases(formData:FormGroup){
        this.purchaseForm = formData;
        if(this.purchaseForm.valid){
            this.common.updateDate(this.purchaseForm.value.date,this.purchaseForm);
            this.dataStore.storePurchaseDataToDB(this.purchaseForm.value).subscribe( success =>{
                if(success === null){
                    this.dataRetrieval.getAllAlarms().subscribe( ()=> {
                        this.dataStore.checkAndIntiateAlarms().subscribe( response => {

                        },failure =>{
    
                        });
                    })
                    this.purchaseFormToReset.resetForm();
                    this.common.snackBarOpen("Successfully Saved!",this.config);
                }else{
                    const data = {message:"As a 'Demo User' you cannot create or modify data of Sub Category '"+this.purchaseForm.value.subCategory+"' more than $"+success[1]+" from budget tracker! You can login to your account and add the amount you want!"};
                    this.inputDataService.openDialog(this.dialog,ErrorDialogComponent,data);        
                }
                }, failure =>{
                    this.common.snackBarOpen("Error has Occured While Saving!",this.config);
                }
            );
        }else{
            this.inputDataService.addValidationsClassNames(this.purchaseForm);
        }
    }

    updateFormToReset(formToReset:NgForm){
        this.purchaseFormToReset = formToReset;
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("purchasesAndInvestments");
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

    private _executeExpansionPanel(){
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel =>{
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"purchasesAndInvestments",this.openPanel);
        });
    }

    private _createAndUpdateForm(){
        this.purchaseForm = this.inputDataService.createPurchaseFormGroup(this.purchaseForm,null,null,null,null,null,true);
        this.purchaseForm.controls.date.setValidators([Validators.required]);
        this.purchaseForm.controls.date.updateValueAndValidity();   
    }

}