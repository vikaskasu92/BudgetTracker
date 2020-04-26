import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ChartMakerService } from 'src/app/shared/services/chartMaker.service';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';
import { GraphDisplayComponent } from 'src/app/shared/components/graphDisplay/graphDisplay.component';

@Component({
    selector:'app-barCategory',
    templateUrl:'./barCategory.component.html',
    styleUrls:['./barCategory.component.css']
})
export class BarCategoryComponent{

    constructor(private chartMaker:ChartMakerService,
        private dataRetrieval:DataRetrievalService,
        private componentFactoryResolver:ComponentFactoryResolver){}
    
    chart:Chart;
    priceArray:any;
    dateArray:any;
    noData = false;
    @ViewChild(PlaceholderDirective ,{static:false})viewComponentRef:PlaceholderDirective;

    getOverallCategoriesExpenses(categoriesData:any){
        this.dataRetrieval.getOverallCategoriesExpenses(categoriesData).subscribe( response => {
            this._createBarGraphComponent();
            setTimeout(()=>{
                if(response.length != 0){
                    this.noData = false;
                    this._buildOverallCategories(response);
                    this.chart =  this.chartMaker.createCategoryBasedBarChart("categoryBar",this.priceArray,this.dateArray,"Expenses By Categories");  
                }else{
                    this.noData = true;
                }
            },0);
        }),failure =>{
            console.log("Error Occured in data Retrieval!");
        }
    }

    categoriesMainSelected(mainSelected:boolean){
        this.chart = undefined;
        this.noData = false;
        this.viewComponentRef.viewContainerRef.clear();
    }

    private _buildOverallCategories(response:any){
        this.priceArray = [];
        this.dateArray = [];
        for(let i=0; i<Object.values(response).length; i++){
            this.priceArray.push(Object.values(response)[i]["price"]);
            this.dateArray.push(Object.values(response)[i]["date"].substring(0,4));
        }
    }

    private _createBarGraphComponent(){
        const factory = this.componentFactoryResolver.resolveComponentFactory(GraphDisplayComponent);
        this.viewComponentRef.viewContainerRef.clear();
        const hostFactoryResolver = this.viewComponentRef.viewContainerRef.createComponent(factory);
        hostFactoryResolver.instance.summaryExpenseByCategory = true;
    }

}