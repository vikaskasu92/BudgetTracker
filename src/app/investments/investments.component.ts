import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/services/testService.service';
import { DataRetrieval } from '../shared/services/dataRetrieval.service';

@Component({
    selector:'app-investments',
    templateUrl:'./investments.component.html',
    styleUrls:['./investments.component.css']
})
export class Investments implements OnInit{

    constructor(private dataRetrieval:DataRetrieval){}

    investmentShares = [];
    investmentGolds = [];
    investmentOthers = [];
    investmentType = "";
    spinnerOtherCommodities = true;
    spinnerGold = true;
    spinnerShares = true;

    ngOnInit(){
        this.fetchInvestments();
    }

    fetchInvestments(){
        this.dataRetrieval.getInvestments().subscribe( response =>{
            // get the response and then map the response to the above arrays. Also Declare the investmentType.
            //this.spinnerOtherCommodities = false;
            //this.spinnerGold = false;
            //this.spinnerShares = false;
        },failure =>{
            this.spinnerOtherCommodities = false;
            this.spinnerGold = false;
            this.spinnerShares = false;
            console.log('Error Retrieving Data!');
        });
    }
    

}