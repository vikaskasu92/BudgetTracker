import { Component, OnInit } from '@angular/core';
import { ChartMakerService } from 'src/app/shared/services/chartMaker.service';
import * as Chart from 'chart.js';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';

@Component({
    selector:'app-pieTotal',
    templateUrl:'./pieTotal.component.html',
    styleUrls:['./pieTotal.component.css']
})
export class PieTotalComponent implements OnInit{

    constructor(private chartMaker:ChartMakerService,
        private dataRetrieval:DataRetrievalService){}

    chart:Chart;
    spinner:boolean = true;
    noDataForCustomer:boolean = false;
    showTitle:boolean = true;

    ngOnInit(){
        this.getOverallIncomeAndExpenses();
    }

    getOverallIncomeAndExpenses(){
        if(this.dataRetrieval.allYears.length != 0){
            this.dataRetrieval.getOverallIncomeAndExpenses().subscribe( response => {
                this.spinner = false;
                setTimeout(()=>{
                    this.showTitle = false;
                    this.chart = this.chartMaker.createTotalDoughnutChart("pieTotal",this._buildOverallIncomeAndExpensesInput(Object.values(response)),"Income And Expenses");
                },0)
            }),failure =>{
                console.log("Error Occured in data Retrieval!");
            }
        }else{
            this.noDataForCustomer = true;
            this.spinner = false;
        }
        
    }

    private _buildOverallIncomeAndExpensesInput(response:any[]){
        const responseArray = [];
        for(let i=0; i<response.length;i++){
            response[i] === null ? response[i] = 0 : "";
            responseArray.push(response[i].toFixed(2));
        }
        return responseArray;
    }

}