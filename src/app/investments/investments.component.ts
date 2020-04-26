import { Component, OnInit } from '@angular/core';
import { DataRetrievalService } from '../shared/services/dataRetrieval.service';

@Component({
    selector:'app-investments',
    templateUrl:'./investments.component.html',
    styleUrls:['./investments.component.css']
})
export class InvestmentsComponent implements OnInit{

    constructor(private dataRetrieval:DataRetrievalService){}

    investmentShares = [];
    investmentGolds = [];
    investmentOthers = [];
    spinnerOtherCommodities = true;
    spinnerGold = true;
    spinnerShares = true;

    ngOnInit(){
        this.fetchInvestments();
    }

    fetchInvestments(){
        this.dataRetrieval.getInvestments().subscribe( response =>{
           for(let i=0; i<Object.values(response).length; i++){
                if(Object.values(response)[i].shares != null){
                    this.investmentShares.push(response[i].shares);
                }else{
                    if(Object.values(response)[i].commodities.investmentType == "Gold"){
                       this.investmentGolds.push(response[i].commodities);
                    }else{
                        this.investmentOthers.push(response[i].commodities);
                    }
                }
            }
            this.spinnerOtherCommodities = false;
            this.spinnerGold = false;
            this.spinnerShares = false;
        },failure =>{
            this.spinnerOtherCommodities = false;
            this.spinnerGold = false;
            this.spinnerShares = false;
            console.log('Error Retrieving Data!');
        });
    }
    

}