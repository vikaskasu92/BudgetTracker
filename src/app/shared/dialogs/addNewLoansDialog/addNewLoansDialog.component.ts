import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '../../services/common.service';
import { InputDataService } from '../../services/inputData.service';

@Component({
    selector:'app-addNewLoans',
    templateUrl:'./addNewLoansDialog.component.html',
    styleUrls:['./addNewLoansDialog.component.css']
})
export class AddNewLoansDialogComponent implements OnInit, AfterViewInit{

    constructor(private dialogRef: MatDialogRef<AddNewLoansDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
                private common:CommonService,
                private inputDataService:InputDataService){}
    
    loanForm:FormGroup;
    loanTypes:string[];
    buttonName:string;
    addNewLoanHeader:string;
    isDarkTheme:boolean;
    isDark:boolean
    @ViewChild('divValue',{static:false}) divValue:ElementRef;

    ngOnInit(): void {
        this.addNewLoanHeader = this.data.addNewLoanHeader;
        this._whichTypeOfLoanToCreate();
        this.isDarkTheme = this.data.isDarkTheme;
        this.isDark = this.data.isDark;
    }

    ngAfterViewInit(): void {
        if(this.isDark){
            this.divValue.nativeElement.parentElement.parentElement.style = 'background-color:#303030;';
        }
    }

    createNewLoan(){
        this.loanTypes = this.common.loanTypes;
        this.loanForm = this.inputDataService.createNewLoanForm(this.loanForm);
    }

    editLoan(loanName:string,loanType:string,loanBalance:number,loanAPR:number,loanMonthlyAmount:number){
        this.loanTypes = this.common.loanTypes;
        this.loanForm = this.inputDataService.createEditLoanForm(this.loanForm,loanName,loanType,loanBalance,loanAPR,loanMonthlyAmount);
        
    }

    addOrUpdateLoansToDB(){
        if(this.loanForm.valid){
            this.dialogRef.close(this.loanForm.value);
        }
    }

    cancelDialog(event:any){
        event.preventDefault();
        this.dialogRef.close();
    }

    private _whichTypeOfLoanToCreate(){
        if(this.data.type === "newLoan"){
            this.createNewLoan();
            this.buttonName = this.data.buttonName;
        }else{
            this.editLoan(this.data.loanName,this.data.loanType,this.data.loanBalance.toFixed(2),
                this.data.loanAPR.toFixed(2),this.data.loanMonthlyAmount.toFixed(2));
            this.buttonName = this.data.buttonName;
        } 
    }
}