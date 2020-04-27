import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { CategoriesComponent } from 'src/app/shared/components/categories/categories.component';

@Component({
    selector:'app-newPurchase',
    templateUrl:'./newPurchase.component.html',
    styleUrls:['./newPurchase.component.css']
})
export class NewPurchaseComponent implements OnInit{

    constructor(private dataStore:DataStoreService,
        private common:CommonService){}

    purchaseForm:FormGroup;
    maxDate:Date;
    creditInfo:boolean = false;
    checked:boolean=false;
    openPanel=true;
    currentExpansionPanel:string;
    @ViewChild(CategoriesComponent,{static:false}) childComponent: CategoriesComponent;

    ngOnInit(): void {
        this._createFormGroup();
        this._applyConditionalValidationToCreditCard();
        this.maxDate = new Date();
        this.common.currentExpansionPanel.subscribe(currentExpansionPanel =>{
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.common.expansionPanelDecision(this.currentExpansionPanel,"purchasesAndInvestments",this.openPanel);
        });
    }

    toggleSelected(){
        this.creditInfo = ! this.creditInfo
    }

    savePurchases(){
        if(this.purchaseForm.valid){
            this._updateDate(this.purchaseForm.value.date,this.purchaseForm);
            this.dataStore.storePurchaseDataToDB(this.purchaseForm.value).subscribe(
                success =>{
                    this.purchaseForm.reset();
                    this.common.snackBarOpen("Successfully Saved!");
                }, failure =>{
                    this.common.snackBarOpen("Error has Occured While Saving!");
                }
            );
        }
    }

    expansionPanelClicked(){
        this.common.onExpansionPanelClick("purchasesAndInvestments");
    }

    private _createFormGroup(){
        this.purchaseForm = new FormGroup({
            'item': new FormControl(null,Validators.required),
            'cost': new FormControl(null,[Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$'),Validators.required]),
            'date': new FormControl(null,Validators.required),
            'toggle': new FormControl(null),
            'creditCardName': new FormControl(null)
         });
    }

    private _applyConditionalValidationToCreditCard(){
        this.purchaseForm.get('toggle').valueChanges.subscribe(value => {
            if(value) {
              this.purchaseForm.get('creditCardName').setValidators([Validators.required]);
              this.purchaseForm.get('creditCardName').updateValueAndValidity();
            } else {
              this.purchaseForm.get('creditCardName').clearValidators();
              this.purchaseForm.get('creditCardName').updateValueAndValidity();
            }
      });
    }

    private _updateDate(date:any,form:FormGroup){
        let day = this._adjustDigits(date.getDate().toString());
        let month = this._adjustDigits((date.getMonth()+1).toString());
        let year = date.getFullYear().toString();
        form.value.date = year+'-'+month+'-'+day;
    }

    private _adjustDigits(number:string){
        if(number.length == 1){
            return number = "0"+number;
        }
        return number;
    }

}