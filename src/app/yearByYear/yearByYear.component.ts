import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from '../shared/services/testService.service';
import { CommonData } from '../shared/services/commonData.service';
import { DataRetrieval } from '../shared/services/dataRetrieval.service';
import { ChartMaker } from '../shared/services/chartMaker.service';

@Component({
    selector:'app-yearByYear',
    templateUrl:'./yearByYear.component.html',
    styleUrls:['./yearByYear.component.css']
})
export class YearByYear implements OnInit{

    constructor(private testData:TestService, 
        private commonData:CommonData,
        private dataRetrieval:DataRetrieval,
        private chartMaker:ChartMaker
    ){}
    
    @ViewChild('year',{static:true}) year:any;
    @ViewChild('category',{static:true}) category:any;
    years:any;
    categories:any;
    yearAndCategory = [];
    chartsLeft = [];
    chartsRight = [];

    ngOnInit(){
        this.years = this.testData.years;
        this.categories = Object.values(this.commonData.category);
    }

    yearChanged(){
        if(this._decideToCallGraph()){
            this._dataRetrieval();
            this.chartsLeft = [1,3];
            this.chartsRight = [2,4];
        }
    }

    categoryChanged(){
        if(this._decideToCallGraph()){
            this._dataRetrieval();
            this.chartsLeft = [1,3];
            this.chartsRight = [2];
        }
    }

    _dataRetrieval(){
        this.dataRetrieval.getYearByYearExpensesOnCategory(this.yearAndCategory).subscribe( response =>{
            //For Loop for number of graphs based on data and divide graphs to charts Left and charts Right
            console.log(" response ",response);
            this.chartMaker.createYearByYearCategoryLineChart("YearByYearExpenses",response);
        },failure =>{
            console.log("error retrieving data!");
        });
    }

    _decideToCallGraph(){
        if(this.year.value !=undefined && this.category.value != undefined ){
            this.yearAndCategory.push(this.year.value);
            this.yearAndCategory.push(this.category.value);
            return true;
        }
        return false;
    }

}