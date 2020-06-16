import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
    selector:'app-insurance',
    templateUrl:'./insurance.component.html',
    styleUrls:['./insurance.component.css']
})
export class InsuranceComponent implements OnInit{
    

    @Input() parentInsuranceForm: FormGroup;
    @Input() insurances:string[];
    @Input() cancelEnabled:boolean;
    @Input() buttonName:string;
    @Output() formData = new EventEmitter<FormGroup>();
    @Output() formReset = new EventEmitter<NgForm>();
    @Output() cancelUpdateAction = new EventEmitter<boolean>();
    @ViewChild('insuranceFormToReset', {static:false})insuranceFormToReset:NgForm;
    maxDate:Date;

    constructor(private common:CommonService){}

    ngOnInit(): void {
        this.maxDate = new Date();
    }

    saveOrUpdateInsurance(){
        this.formReset.emit(this.insuranceFormToReset);
        this.formData.emit(this.parentInsuranceForm);
    }

    cancelUpdate(){
        this.cancelUpdateAction.emit(true);
    }

    editNavigate(){
        this.common.editNavigate();
    }

}