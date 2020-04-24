import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/shared/services/testService.service';
import { ChartMaker } from 'src/app/shared/services/chartMaker.service';
import * as Chart from 'chart.js';
import { DataRetrieval } from 'src/app/shared/services/dataRetrieval.service';

@Component({
    selector:'app-pieTotal',
    templateUrl:'./pieTotal.component.html',
    styleUrls:['./pieTotal.component.css']
})
export class PieTotal implements OnInit{

    constructor(private testData:TestService, 
        private chartMaker:ChartMaker,
        private dataRetrieval:DataRetrieval
        ){}

    chart:Chart;

    ngOnInit(){
      this.getOverallIncomeAndExpenses();
    }

    getOverallIncomeAndExpenses(){
        this.dataRetrieval.getOverallIncomeAndExpenses().subscribe( response => {
            this.chart = this.chartMaker.createTotalDoughnutChart("pieTotal",this.testData.testPieSalaryTotal);
        }),failure =>{
            console.log("Error Occured in data Retrieval!");
        }
    }

}