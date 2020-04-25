import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartMaker } from 'src/app/shared/services/chartMaker.service';
import { DataRetrieval } from 'src/app/shared/services/dataRetrieval.service';

@Component({
    selector:'app-barCategory',
    templateUrl:'./barCategory.component.html',
    styleUrls:['./barCategory.component.css']
})
export class BarCategory implements OnInit{

    constructor(private chartMaker:ChartMaker,
        private dataRetrieval:DataRetrieval
        ){}
    
    chart:Chart;
    priceArray:any;
    dateArray:any;

    ngOnInit(){
        
    }

    getOverallCategoriesExpenses(categoriesData:any){
        this.dataRetrieval.getOverallCategoriesExpenses(categoriesData).subscribe( response => {
            this._buildOverallCategories(response);
            this.chart =  this.chartMaker.createCategoryBasedBarChart("categoryBar",this.priceArray,this.dateArray,"Expenses By Categories");  
        }),failure =>{
            console.log("Error Occured in data Retrieval!");
        }
    }

    private _buildOverallCategories(response:any){
        this.priceArray = [];
        this.dateArray = [];
        for(let i=0; i<Object.values(response).length; i++){
            this.priceArray.push(Object.values(response)[i]["price"]);
            this.dateArray.push(Object.values(response)[i]["date"].substring(0,4));
        }
    }

    categoriesMainSelected(mainSelected:boolean){
        this.chart = undefined;
    }

}