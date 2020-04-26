import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStoreService } from 'src/app/shared/services/dataStore.service';
import { InternalCommunicationService } from 'src/app/shared/services/internalCommunication.service';

@Component({
    selector:'app-newPurchase',
    templateUrl:'./newPurchase.component.html',
    styleUrls:['./newPurchase.component.css']
})
export class NewPurchaseComponent implements OnInit{

    constructor(private dataStore:DataStoreService,
        private intComm:InternalCommunicationService){}

    @ViewChild('purchaseForm',{static:true}) purchaseForm:NgForm;
    maxDate:Date;
    creditInfo:boolean = false;
    checked:boolean=false;
    dateErrorMessage:string = "Date is a Required Field!";
    openPanel=true;
    currentExpansionPanel:string;

    ngOnInit(): void {
        this.maxDate = new Date();
       this.intComm.currentExpansionPanel.subscribe(currentExpansionPanel =>{
            this.currentExpansionPanel = currentExpansionPanel;
            this.openPanel = this.intComm.expansionPanelDecision(this.currentExpansionPanel,"purchasesAndInvestments",this.openPanel);
        } )
    }

    datePickerCalled(){
        this.intComm.datePickerCalled(this.purchaseForm,this.dateErrorMessage);
    }

    toggleSelected(){
        this.creditInfo = ! this.creditInfo
    }

    savePurchases(){
        if(this.purchaseForm.valid){
            this.dataStore.storePurchaseDataToDB(this.purchaseForm.form.value).subscribe(
                success =>{
                    this.purchaseForm.resetForm();
                    this.intComm.snackBarOpen("Successfully Saved!");
                }, failure =>{
                    this.intComm.snackBarOpen("Error has Occured While Saving!");
                }
            );
        }
    }

    expansionPanelClicked(){
        this.intComm.onExpansionPanelClick("purchasesAndInvestments");
    }

}