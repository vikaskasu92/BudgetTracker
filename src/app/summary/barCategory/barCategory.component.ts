import { Component, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ChartMakerService } from 'src/app/shared/services/chartMaker.service';
import { DataRetrievalService } from 'src/app/shared/services/dataRetrieval.service';
import { PlaceholderDirective } from 'src/app/shared/directives/placeholder.directive';
import { GraphDisplayComponent } from 'src/app/shared/components/graphDisplay/graphDisplay.component';
import { FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { InputDataService } from 'src/app/shared/services/inputData.service';

@Component({
    selector:'app-barCategory',
    templateUrl:'./barCategory.component.html',
    styleUrls:['./barCategory.component.css']
})
export class BarCategoryComponent implements OnInit{

    constructor(private chartMaker:ChartMakerService,
        private dataRetrieval:DataRetrievalService,
        private common:CommonService,
        private componentFactoryResolver:ComponentFactoryResolver,
        private inputDataService:InputDataService){}
    
    categoriesForm:FormGroup;
    chart:Chart;
    priceArray:number[];
    dateArray:string[];
    subCategory:string[] = [];
    onLoad:boolean = true;
    noData:boolean = false;
    @ViewChild(PlaceholderDirective ,{static:false})viewComponentRef:PlaceholderDirective;

    ngOnInit(): void {
        this._createAndUpdateCategoriesForm();
    }

    getOverallCategoriesExpenses(categoriesData:string[]){
        this.dataRetrieval.getOverallCategoriesExpenses(categoriesData).subscribe( response => {
            this._createBarGraphComponent();
            setTimeout(()=>{
                this.onLoad = false;
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

    mainCategorySelected(mainSelected:boolean){
        this.chart = undefined;
        this.noData = false;
        this.viewComponentRef.viewContainerRef.clear();
    }

    private _createAndUpdateCategoriesForm(){
        this.categoriesForm = this.inputDataService.createBarCategoryForm(this.categoriesForm);
         this.categoriesForm.controls.mainCategory.valueChanges.subscribe(value =>{
            this.categoriesForm.controls.subCategory.enable();
            this.subCategory = this.common.generateSubCategories(value);
        });
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