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
    @Output() formData = new EventEmitter<FormGroup>();
    @Output() formToReset = new EventEmitter<NgForm>();
    @ViewChild('purchaseFormToReset',{static:false})purchaseFormToReset:NgForm;
    maxDate:Date;

    ngOnInit(){
        this.maxDate = new Date();
    }
    
    savePurchases(){
        this.formToReset.emit(this.purchaseFormToReset);
        this.formData.emit(this.parentPurchaseForm);
    }
}