import { Component, OnInit } from '@angular/core';
import { DataRetrievalService } from '../shared/services/dataRetrieval.service';
import { MatDialog } from '@angular/material';
import { AddNewLoansComponent } from '../shared/dialogs/addNewLoans/addNewLoans.component';
import { DataStoreService } from '../shared/services/dataStore.service';
import { ConfirmCloseLoanComponent } from '../shared/dialogs/confirmCloseLoan/confirmCloseLoan.component';

@Component({
    selector:'app-loans',
    templateUrl:'./loans.component.html',
    styleUrls:['./loans.component.css']
})
export class LoansComponent implements OnInit{

    constructor(private dataRetrieval:DataRetrievalService,
                private dialog1: MatDialog,
                private dialog2: MatDialog,
                private dataStore:DataStoreService){}

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
        const dialogRef1 = this.dialog1.open(AddNewLoansComponent, {
            disableClose: true
        });
      
        dialogRef1.afterClosed().subscribe(result => {  
            if(result != undefined){
                this.dataStore.storeNewLoansDataToDB(result).subscribe( response => {
                    this.retrieveOpenClosedLoans(); 
                },failure =>{
                    console.log("Error Retrieving Data from DB.");
                });
            }
        });
    }

    closeLoan(loanName:string){
        const responseObject ={
            'loanName':loanName
        }
        const dialogRef2 = this.dialog2.open(ConfirmCloseLoanComponent, {
            disableClose: true
        });
        dialogRef2.afterClosed().subscribe( result => {  
            if(result){
                this.dataStore.closeLoanFromDB(responseObject).subscribe( response => {
                    this.retrieveOpenClosedLoans(); 
                },failure =>{
                    console.log("Error Retrieving Data from DB.");
                });
            }
        });
    }

}