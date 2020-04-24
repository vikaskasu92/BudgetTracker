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
    yearsArray = [];
    expenseArray = [];

    ngOnInit(){
        this.getOverallYearlyExpenses();
    }

    getOverallYearlyExpenses(){
        this.dataRetrieval.getOverallYearlyExpenses().subscribe( response => {
            this._buildOverallYearlyExpensesInputData(response);
            this.chart = this.chartMaker.createYearExpenseLineChart("lineYearExpenses",this.yearsArray,this.expenseArray);
        }),failure =>{
            console.log("Error Occured in data Retrieval!");
        }
    }

    _buildOverallYearlyExpensesInputData(response:any){
        for(let i=0; i<Object.values(response.yearlyExpenseSummary).length; i++){
            this.yearsArray.push(Object.values(response.yearlyExpenseSummary)[i]["yearlyExpenseSummaryDate"].substring(0,4));
            this.expenseArray.push(Object.values(response.yearlyExpenseSummary)[i]["yearlyExpenseSummaryPrice"]);
        }
    }

}