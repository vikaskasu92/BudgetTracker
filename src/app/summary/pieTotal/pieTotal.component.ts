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

    ngOnInit(){
      this.getOverallIncomeAndExpenses();
    }

    getOverallIncomeAndExpenses(){
        setTimeout(()=>{
            this.dataRetrieval.getOverallIncomeAndExpenses().subscribe( response => {
                this.chart = this.chartMaker.createTotalDoughnutChart("pieTotal",this._buildOverallIncomeAndExpensesInput(Object.values(response)),"Income And Expenses");
            }),failure =>{
                console.log("Error Occured in data Retrieval!");
            }
        },0);
    }

    private _buildOverallIncomeAndExpensesInput(response:any){
        const responseArray = [];
        for(let i=0; i<response.length;i++){
            responseArray.push(response[i].toFixed(2));
        }
        return responseArray;
    }

}