import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '../../services/common.service';

@Component({
    selector:'app-addNewLoans',
    templateUrl:'./addNewLoansDialog.component.html',
    styleUrls:['./addNewLoansDialog.component.css']
})
export class AddNewLoansDialogComponent implements OnInit{

    constructor(private dialogRef: MatDialogRef<AddNewLoansDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
                private common:CommonService){}
    
    loanForm:FormGroup;
    loanTypes:string[];
    buttonName:string;

    ngOnInit(): void {
        if(this.data.type === "newLoan"){
            this.createNewLoan();
            this.buttonName = this.data.buttonName;
        }else{
            this.editLoan(this.data.loanName,this.data.loanType,this.data.loanBalance.toFixed(2),
                this.data.loanAPR.toFixed(2),this.data.loanMonthlyAmount.toFixed(2));
            this.buttonName = this.data.buttonName;
        }
        
    }

    createNewLoan(){
        this.loanTypes = this.common.loanTypes;
        this.loanForm = new FormGroup({
            'loanName' : new FormControl(null,Validators.required),
            'loanType' : new FormControl(null,Validators.required),
            'loanBalance' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanAPR' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanEMI' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')])
        });
    }

    editLoan(loanName:string,loanType:string,loanBalance:number,loanAPR:number,loanMonthlyAmount:number){
        this.loanTypes = this.common.loanTypes;
        this.loanForm = new FormGroup({
            'loanName' : new FormControl(loanName,Validators.required),
            'loanType' : new FormControl(loanType,Validators.required),
            'loanBalance' : new FormControl(loanBalance,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanAPR' : new FormControl(loanAPR,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanEMI' : new FormControl(loanMonthlyAmount,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')])
        });
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

}