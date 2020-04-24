import { Component, OnInit } from '@angular/core';
import { DataRetrieval } from 'src/app/shared/services/dataRetrieval.service';
import { IPendingLoansSummary } from 'src/app/model/summary/pendingLoansSummary.model';

@Component({
    selector:'app-tablePendingLoans',
    templateUrl:'./tablePendingLoans.component.html',
    styleUrls:['./tablePendingLoans.component.css']
})
export class TablePendingLoans implements OnInit{

    constructor(private dataRetrieval:DataRetrieval){}

    allPendingloans:IPendingLoansSummary;
    spinnerOn:boolean = true;
    dataUnavilable = false;

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
            console.log("allPendingLoans",this.allPendingloans);
            console.log("Error Occured in data Retrieval!");
        });
    }

}