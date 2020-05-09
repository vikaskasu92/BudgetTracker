import { Component, OnInit, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { DataRetrievalService } from '../shared/services/dataRetrieval.service';
import { ChartMakerService } from '../shared/services/chartMaker.service';
import { GraphDisplayComponent } from '../shared/components/graphDisplay/graphDisplay.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';
import { FormGroup} from '@angular/forms';
import { InputDataService } from '../shared/services/inputData.service';

@Component({
    selector:'app-expensesByYear',
    templateUrl:'./expensesByYear.component.html',
    styleUrls:['./expensesByYear.component.css']
})
export class ExpensesByYearComponent implements OnInit{

    constructor(private common:CommonService,
        private dataRetrieval:DataRetrievalService,
        private chartMaker:ChartMakerService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private inputDataService:InputDataService
    ){}
    
    @ViewChild(PlaceholderDirective, {static:false}) containerRef:PlaceholderDirective;
    years = [];
    categories:any;
    yearAndCategory = [];
    noData:boolean;
    yearByYearForm:FormGroup;


    ngOnInit(){
        this._retrieveAllYearsData();
        this.categories = Object.values(this.common.category);
        this._createYearByYearForm();
    }

    private _retrieveAllYearsData(){
        this.dataRetrieval.getAllYearsForCustomers().subscribe(response=>{
            this.years = [];
            this.years = response;
        });
    }

    private _createYearByYearForm(){
        this.yearByYearForm = this.inputDataService.createYearByYearForm(this.yearByYearForm);
        this.yearByYearForm.controls.year.valueChanges.subscribe( value =>{
            this.yearAndCategory[0] = value;
            if(this._decideToCallGraph()){
                this._dataRetrieval(this.yearAndCategory);
            }
        });
        this.yearByYearForm.controls.category.valueChanges.subscribe( value =>{
            this.yearAndCategory[1] = value;
            if(this._decideToCallGraph()){
                this._dataRetrieval(this.yearAndCategory); 
            }
        });
    }

    private createGraphComponent(size:number){
        const graphDisplayFactory = this.componentFactoryResolver.resolveComponentFactory(GraphDisplayComponent);
        const viewContainerRef = this.containerRef.viewContainerRef;
        viewContainerRef.clear();
        const graphDisplayComponent = viewContainerRef.createComponent(graphDisplayFactory);
        let n = 1;
        const chartsLeft = [];
        const chartsRight = [];
        for(let i=0; i<size;i++){
            n % 2 != 0 ? chartsLeft.push(n) : chartsRight.push(n);
            n++;
        }
        graphDisplayComponent.instance.chartsLeft = chartsLeft;
        graphDisplayComponent.instance.chartsRight = chartsRight;
        graphDisplayComponent.instance.yearOverYear = true;
    }

    private _dataRetrieval(yearAndCategory:any){
        this.dataRetrieval.getYearByYearExpensesOnCategory(yearAndCategory).subscribe( response =>{
            response.length === 0 ? this.noData = true : this.noData = false;
            let n = 1;
            const subCategoryArray = this._buildSubCategoryInputs(response);
            this.createGraphComponent(subCategoryArray.length);
            setTimeout(()=>{
                for(let i=0; i<subCategoryArray.length; i++){    
                    if(n % 2 != 0){
                        this.chartMaker.createYearByYearCategoryLineChart("YearByYearExpensesLeft"+n,subCategoryArray[i]["priceArray"],subCategoryArray[i]["dateArray"],subCategoryArray[i]["subCategory"]);
                    }else{
                        this.chartMaker.createYearByYearCategoryLineChart("YearByYearExpensesRight"+n,subCategoryArray[i]["priceArray"],subCategoryArray[i]["dateArray"],subCategoryArray[i]["subCategory"]); 
                    }
                    n++;
                }
            },0);     
        },failure =>{
            console.log("error retrieving data!");
        });
    }

    private _buildSubCategoryInputs(response:any){
        let firstTime=true;
        let added = false;
        const subCategoryArray=[];
        for(let i=0; i<response.length;i++){
            const returnArray = this._checkIfExist(subCategoryArray,response[i]["subCategory"]);
            if(!firstTime && returnArray[0]){
                added = true;
                subCategoryArray[returnArray[1]]["priceArray"].push(response[i]["price"]);
                subCategoryArray[returnArray[1]]["dateArray"].push(response[i]["date"]);
            }
            !added ? subCategoryArray.push(this._buildObject(response,i)): null ;
            added = false;
            firstTime = false;
        }
        return subCategoryArray;
    }

    private _checkIfExist(subCategoryArray:any,responseValue:string){
        const returnArray=[];
        for(let i=0; i<subCategoryArray.length; i++){
            if(subCategoryArray[i]["subCategory"] === responseValue){
                returnArray.push(true);
                returnArray.push(i);
                return returnArray;
            }
        }
        returnArray.push(false);
        returnArray.push(-1);
        return returnArray;
    }

    private _buildObject(response:any,index:number){
        var tempObject = {
            subCategory:response[index]["subCategory"],
            priceArray:[response[index]["price"]],
            dateArray:[response[index]["date"]]
        }
        return tempObject;
    }

    private _decideToCallGraph(){
       return this.yearAndCategory[0] !=undefined && this.yearAndCategory[1] != undefined ? true : false;
    }

}