import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { CommonService } from '../../services/common.service';

@Component({
    selector:'app-addNewLoans',
    templateUrl:'./addNewLoans.component.html',
    styleUrls:['./addNewLoans.component.css']
})
export class AddNewLoansComponent implements OnInit{

    constructor(private dialogRef: MatDialogRef<AddNewLoansComponent>,
                private common:CommonService){}
    
    addNewLoan:FormGroup;
    loanTypes:string[];

    ngOnInit(): void {
        this.loanTypes = this.common.loanTypes;
        this.addNewLoan = new FormGroup({
            'loanName' : new FormControl(null,Validators.required),
            'loanType' : new FormControl(null,Validators.required),
            'loanBalance' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanDuration' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanAPR' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')]),
            'loanEMI' : new FormControl(null,[Validators.required,Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$')])
        })
    }

    addNewLoansToDB(){
        if(this.addNewLoan.valid){
            this.dialogRef.close(this.addNewLoan.value);
        }
    }

    cancelDialog(event:any){
        event.preventDefault();
        this.dialogRef.close();
    }

}