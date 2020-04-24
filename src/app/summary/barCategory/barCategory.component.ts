import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartMaker } from 'src/app/shared/services/chartMaker.service';
import { TestService } from 'src/app/shared/services/testService.service';
import { DataRetrieval } from 'src/app/shared/services/dataRetrieval.service';

@Component({
    selector:'app-barCategory',
    templateUrl:'./barCategory.component.html',
    styleUrls:['./barCategory.component.css']
})
export class BarCategory{

    constructor(private chartMaker:ChartMaker,
        private testData:TestService,
        private dataRetrieval:DataRetrieval
        ){}
    
    chart:Chart;

    getOverallCategoriesExpenses(categoriesData:any){
        this.dataRetrieval.getOverallCategoriesExpenses(categoriesData).subscribe( response => {
            this.chart =  this.chartMaker.createCategoryBasedBarChart("categoryBar",this.testData.testCategoryBasedExpenses);  
        }),failure =>{
            console.log("Error Occured in data Retrieval!");
        }
    }

    categoriesMainSelected(mainSelected:boolean){
        this.chart = undefined;
    }

}