import { Component, OnInit } from '@angular/core';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';
import { IPendingLoansSummary } from 'src/app/shared/model/summary/pendingLoansSummary.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { Observable } from 'rxjs';

@Component({
    selector:'app-tablePendingLoans',
    templateUrl:'./tablePendingLoans.component.html',
    styleUrls:['./tablePendingLoans.component.css']
})
export class TablePendingLoansComponent implements OnInit{

    constructor(private dataRetrieval:DataRetrievalService,
                private common:CommonService){}

    allPendingloans:IPendingLoansSummary;
    dataUnavilable:boolean = false;
    spinner:boolean = true;
    isDark:Observable<boolean>;

    ngOnInit(){
        this.getOverallPendingLoans();
        this.isDark = this.common.isDarkTheme;
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