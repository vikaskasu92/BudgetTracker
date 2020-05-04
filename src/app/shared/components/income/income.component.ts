import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
    selector:'app-income',
    templateUrl:'./income.component.html',
    styleUrls:['./income.component.css']
})
export class IncomeComponent implements OnInit{
   
   
    maxDate:Date;
    @Input() cancelEnabled:boolean;

    @Input() parentIncomeForm: FormGroup;
    @Input() buttonName:string;
    @Output() formData = new EventEmitter<FormGroup>();
    @Output() formReset = new EventEmitter<NgForm>();
    @Output() cancelUpdateAction = new EventEmitter<boolean>();
    @ViewChild('incomeFormToReset', {static:false})incomeFormToReset:NgForm;
   
    ngOnInit(): void {
        this.maxDate = new Date();
    }

    saveOrUpdateIncome(){
        this.formReset.emit(this.incomeFormToReset);
        this.formData.emit(this.parentIncomeForm);
    }

    cancelUpdate(){
        this.cancelUpdateAction.emit(true);
    }



}