import { Component, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { DataStore } from '../../services/dataStore.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector:'app-addNewLoans',
    templateUrl:'./addNewLoans.component.html',
    styleUrls:['./addNewLoans.component.css']
})
export class AddNewLoans{

    constructor(private dialogRef: MatDialogRef<AddNewLoans>){}
    
    @ViewChild('newLoansToDB',{static:true}) newLoansToDB:NgForm;
    

    addNewLoansToDB(){
        if(this.newLoansToDB.valid){
            this.dialogRef.close(this.newLoansToDB);
        }
    }

    cancelDialog(event:any){
        event.preventDefault();
        this.dialogRef.close();
    }

}