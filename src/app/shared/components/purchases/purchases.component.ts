import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
    selector:'app-purchases',
    templateUrl:'./purchases.component.html',
    styleUrls:['./purchases.component.css']
})
export class PurchasesComponent implements OnInit{

    @Input() parentPurchaseForm: FormGroup;
    @Input() subCategory:any;
    @Input() buttonName:string;
    @Input() cancelPurchaseEnabled:boolean;
    @Output() formData = new EventEmitter<FormGroup>();
    @Output() formToReset = new EventEmitter<NgForm>();
    @Output() cancelUpdateAction = new EventEmitter<boolean>();
    @ViewChild('purchaseFormToReset',{static:false})purchaseFormToReset:NgForm;
    maxDate:Date;

    ngOnInit(){
        this.maxDate = new Date();
    }
    
    saveOrUpdatePurchases(){
        this.formToReset.emit(this.purchaseFormToReset);
        this.formData.emit(this.parentPurchaseForm);
    }

    cancelUpdate(){
        this.cancelUpdateAction.emit(true);
    }
}