import { Component, OnInit } from '@angular/core';
import { ChartMaker } from 'src/app/shared/services/chartMaker.service';
import { TestService } from 'src/app/shared/services/testService.service';
import { DataRetrieval } from 'src/app/shared/services/dataRetrieval.service';

@Component({
    selector:'app-lineByYear',
    templateUrl:'./lineByYear.component.html',
    styleUrls:['./lineByYear.component.css']
})
export class LineByYear implements OnInit{

    constructor(private chartMaker:ChartMaker, 
        private testData:TestService,
        private dataRetrieval:DataRetrieval
        ){}

    chart:Chart;

    ngOnInit(){
        this.getOverallYearlyExpenses();
    }

    getOverallYearlyExpenses(){
        this.dataRetrieval.getOverallYearlyExpenses().subscribe( response => {
            this.chart = this.chartMaker.createYearExpenseLineChart("lineYearExpenses",this.testData.testYearlyExpenses);
        }),failure =>{
            console.log("Error Occured in data Retrieval!");
        }
    }

}