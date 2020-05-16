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
    dataUnavilable:boolean = false;
    spinner:boolean = true;

    ngOnInit(){
        this.getOverallPendingLoans();
    }
    
    getOverallPendingLoans(){
        this.dataRetrieval.getOverallPendingLoans().subscribe( response => {
            if(response.length === 0){
                this.spinner = false;
                this.dataUnavilable = true;
            }else{
                this.dataUnavilable = false;
                this.spinner = false;
                this.allPendingloans =  response;
            }   
        },failure =>{
            console.log("Error Occured in data Retrieval!");
        });
    }

}