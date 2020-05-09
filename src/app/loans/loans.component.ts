import { Component, OnInit } from '@angular/core';
import { DataRetrievalService } from '../shared/services/dataRetrieval.service';
import { MatDialog } from '@angular/material';
import { AddNewLoansDialogComponent } from '../shared/dialogs/addNewLoansDialog/addNewLoansDialog.component';
import { DataStoreService } from '../shared/services/dataStore.service';
import { ConfirmDialogComponent } from '../shared/dialogs/confirmDialog/confirmDialog.component';
import { InputDataService } from '../shared/services/inputData.service';

@Component({
    selector:'app-loans',
    templateUrl:'./loans.component.html',
    styleUrls:['./loans.component.css']
})
export class LoansComponent implements OnInit{

    constructor(private dataRetrieval:DataRetrievalService,
                private dialog: MatDialog,
                private dataStore:DataStoreService,
                private inputData:InputDataService){}

    openLoans:any;
    closedLoans:any;
    spinnerOpenLoans:boolean = true;
    spinnerClosedLoans:boolean = true;
    noOpenLoans:boolean = false;
    noClosedLoans:boolean = false;

    ngOnInit(){
        this.retrieveOpenClosedLoans(); 
    }

    retrieveOpenClosedLoans(){
        this.dataRetrieval.getOpenClosedLoans().subscribe( response =>{
            this.closedLoans = response["closedLoans"];
            this.openLoans = response["openLoans"];
            this.spinnerOpenLoans = false;
            this.spinnerClosedLoans = false;
        },failure =>{
            this.spinnerOpenLoans = false;
            this.spinnerClosedLoans = false;
            this.noOpenLoans = true;
            this.noClosedLoans = true;
            console.log('Error Retrieving Data');
        });
    }

    addNewLoans(){
        const data = {type:'newLoan',buttonName:'Save',addNewLoanHeader:'Add New Loan'};
        const dialogRef =  this.inputData.openDialog(this.dialog,ConfirmDialogComponent,data);
        
        dialogRef.afterClosed().subscribe(result => {  
            if(result != undefined){
                this.dataStore.storeNewLoansDataToDB(result).subscribe( () => {
                    this.retrieveOpenClosedLoans(); 
                },failure =>{
                    console.log("Error Retrieving Data from DB.");
                });
            }
        });
    }

    closeLoan(id:number){
        const responseObject ={}
        let displayMessage = "Are you sure you want to close the loan ?";
        const data = {message: displayMessage};
        const dialogRef =  this.inputData.openDialog(this.dialog,ConfirmDialogComponent,data);
        
        dialogRef.afterClosed().subscribe( result => {  
            if(result){
                this.dataStore.closeLoanFromDB(this._updateObjectId(responseObject,id)).subscribe( response => {
                    this.retrieveOpenClosedLoans(); 
                },failure =>{
                    console.log("Error Retrieving Data from DB.");
                });
            }
        });
    }

    reOpenLoan(id:number){
        const responseObject ={}
        let displayMessage = "Are you sure this loan is not closed ?";
        const data = {message: displayMessage};
        const dialogRef =  this.inputData.openDialog(this.dialog,ConfirmDialogComponent,data);
       
        dialogRef.afterClosed().subscribe( result => {  
            if(result){
                this.dataStore.reOpenLoanFromDB(this._updateObjectId(responseObject,id)).subscribe( response => {
                    this.retrieveOpenClosedLoans(); 
                },failure =>{
                    console.log("Error Retrieving Data from DB.");
                });
            }
        });
    }

    deleteLoan(id:number){
        const responseObject ={}
        let displayMessage = "You are going to remove this loan completely from Budget Tracker, Are you sure?";
        const data = {message: displayMessage};
        const dialogRef =  this.inputData.openDialog(this.dialog,ConfirmDialogComponent,data);
    
        dialogRef.afterClosed().subscribe( result => {  
            if(result){
                this.dataStore.deleteLoanFromDB(this._updateObjectId(responseObject,id)).subscribe( response => {
                    this.retrieveOpenClosedLoans(); 
                },failure =>{
                    console.log("Error Retrieving Data from DB.");
                });
            }
        });
    }

    editLoan(loanName:string,loanType:string,loanBalance:number,loanAPR:number,loanMonthlyAmount:number,id:number){
        const data ={loanName:loanName, loanType:loanType,loanBalance:loanBalance,loanAPR:loanAPR,
            loanMonthlyAmount:loanMonthlyAmount,type:"editLoan",buttonName:'Update',addNewLoanHeader:'Edit Loan'}
        const dialogRef =  this.inputData.openDialog(this.dialog,AddNewLoansDialogComponent,data);
    
        dialogRef.afterClosed().subscribe(result => {  
            if(result != undefined){
                this.dataStore.updateLoansDataToDB(this._updateObjectId(result,id)).subscribe( response => {
                    this.retrieveOpenClosedLoans(); 
                },failure =>{
                    console.log("Error Retrieving Data from DB.");
                });
            }
        });
    }

    private _updateObjectId(formDataObject:any,id:number){
        formDataObject['id'] = id;
        return formDataObject;
      }
}