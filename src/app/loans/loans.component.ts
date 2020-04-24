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

    openLoans:[];
    closedLoans:[];
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
            this.closedLoans = [];
            this.openLoans = [];
        },failure =>{
            this.closedLoans = [];
            this.openLoans = [];
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
            //result.nativeElement[0].value -> use this to get model data in response.
            if(result != undefined){
                this.dataStore.storeNewLoansDataToDB(result).subscribe( response => {
                    //update New Loans Data and call Loans component and update data.
                },failure =>{
                    console.log("Error Retrieving Data from DB.");
                });
            }
        });
    }

}