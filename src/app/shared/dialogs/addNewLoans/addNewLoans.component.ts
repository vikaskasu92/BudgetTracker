import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
    selector:'app-addNewLoans',
    templateUrl:'./addNewLoans.component.html',
    styleUrls:['./addNewLoans.component.css']
})
export class AddNewLoansComponent{

    constructor(private dialogRef: MatDialogRef<AddNewLoansComponent>){}
    
    @ViewChild('addNewLoan',{static:true}) newLoansToDB:NgForm;
    

    addNewLoansToDB(){
        if(this.newLoansToDB.valid){
            this.dialogRef.close(this.newLoansToDB);
        }
    }

    saveDialog(){

    }

    cancelDialog(event:any){
        event.preventDefault();
        this.dialogRef.close();
    }

}