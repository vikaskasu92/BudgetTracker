import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { DataRetrieval } from '../shared/services/dataRetrieval.service';
import { MatDialog } from '@angular/material';
import { AddNewLoans } from '../shared/dialogs/addNewLoans/addNewLoans.component';
import { DataStore } from '../shared/services/dataStore.service';

@Component({
    selector:'app-loans',
    templateUrl:'./loans.component.html',
    styleUrls:['./loans.component.css']
})
export class Loans implements OnInit{

    constructor(private dataRetrieval:DataRetrieval,
        private dialog: MatDialog,
        private dataStore:DataStore
        ){}

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
            // update open and closed loans arrays, if no loans update it to be empty;
            console.log(response);
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
        const dialogRef = this.dialog.open(AddNewLoans, {
            disableClose: true
        });
      
        dialogRef.afterClosed().subscribe(result => {  
            console.log(result);
            //Form Data and send to Rest Service.
            if(result != undefined){
                this.dataStore.storeNewLoansDataToDB(result).subscribe( response => {
                    this.retrieveOpenClosedLoans(); 
                },failure =>{
                    console.log("Error Retrieving Data from DB.");
                });
            }
        });
    }

}