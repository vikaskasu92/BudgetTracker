import { Component, OnInit } from '@angular/core';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';
import { IPendingLoansSummary } from 'src/app/shared/model/summary/pendingLoansSummary.model';

@Component({
    selector:'app-tablePendingLoans',
    templateUrl:'./tablePendingLoans.component.html',
    styleUrls:['./tablePendingLoans.component.css']
})
export class TablePendingLoansComponent implements OnInit{

    constructor(private dataRetrieval:DataRetrievalService){}

    allPendingloans:IPendingLoansSummary;
    spinnerOn:boolean = true;
    dataUnavilable:boolean = false;

    ngOnInit(){
        this.getOverallPendingLoans();
    }
    
    getOverallPendingLoans(){
        this.dataRetrieval.getOverallPendingLoans().subscribe( response => {
           this.allPendingloans =  response;
           this.spinnerOn = false;
        },failure =>{
            if(this.allPendingloans != undefined){
                this.spinnerOn = false;
            }
            console.log("Error Occured in data Retrieval!");
        });
    }

}