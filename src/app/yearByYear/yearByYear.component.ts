import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { CommonData } from '../shared/services/commonData.service';
import { DataRetrieval } from '../shared/services/dataRetrieval.service';
import { ChartMaker } from '../shared/services/chartMaker.service';
import { GraphDisplay } from '../shared/components/graphDisplay/graphDisplay.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
    selector:'app-yearByYear',
    templateUrl:'./yearByYear.component.html',
    styleUrls:['./yearByYear.component.css']
})
export class YearByYear implements OnInit{

    constructor(private commonData:CommonData,
        private dataRetrieval:DataRetrieval,
        private chartMaker:ChartMaker,
        private componentFactoryResolver: ComponentFactoryResolver
    ){}
    
    @ViewChild('year',{static:true}) year:any;
    @ViewChild('category',{static:true}) category:any;
    @ViewChild(PlaceholderDirective, {static:false}) containerRef:PlaceholderDirective;
    years:any;
    categories:any;
    yearAndCategory = [];


    ngOnInit(){
        this.dataRetrieval.getAllYearsForCustomers().subscribe(
            response=>{
                this.years = response;
            }
        );
        this.categories = Object.values(this.commonData.category);
    }
    
    yearChanged(){
        this.yearAndCategory[0] = this.year.value;
        if(this._decideToCallGraph()){
            this._dataRetrieval(this.yearAndCategory);
        }
    }

    categoryChanged(){
        //this.yearAndCategory[1] = this.category.value;
        this.yearAndCategory[1] = 'food';
        if(this._decideToCallGraph()){
            this._dataRetrieval(this.yearAndCategory); 
        }
    }

    private createGraphComponent(size:number){
        const graphDisplayFactory = this.componentFactoryResolver.resolveComponentFactory(GraphDisplay);
        const viewContainerRef = this.containerRef.viewContainerRef;
        viewContainerRef.clear();
        const graphDisplayComponent = viewContainerRef.createComponent(graphDisplayFactory);
        let n = 1;
        const chartsLeft = [];
        const chartsRight = [];
        for(let i=0; i<size;i++){
            if(n % 2 != 0){
                chartsLeft.push(n);
            }else{
                chartsRight.push(n);
            }
            n++;
        }
        console.log("chartsLeft ",chartsLeft);
        console.log("chartsRight ",chartsRight);
        graphDisplayComponent.instance.chartsLeft = chartsLeft;
        graphDisplayComponent.instance.chartsRight = chartsRight;

    }
    _dataRetrieval(yearAndCategory:any){
        this.dataRetrieval.getYearByYearExpensesOnCategory(yearAndCategory).subscribe( response =>{
            let n = 1;
            const subCategoryArray = this._buildSubCategoryInputs(response);
            this.createGraphComponent(subCategoryArray.length);
            setTimeout(()=>{
                for(let i=0; i<subCategoryArray.length; i++){    
                    if(n % 2 != 0){
                        console.log("YearByYearExpensesLeft"+i);
                        this.chartMaker.createYearByYearCategoryLineChart("YearByYearExpensesLeft"+n,subCategoryArray[i]["priceArray"],subCategoryArray[i]["dateArray"],subCategoryArray[i]["subCategory"]);
                    }else{
                        console.log("YearByYearExpensesRight"+i);
                        this.chartMaker.createYearByYearCategoryLineChart("YearByYearExpensesRight"+n,subCategoryArray[i]["priceArray"],subCategoryArray[i]["dateArray"],subCategoryArray[i]["subCategory"]); 
                    }
                    n++;
                }
            },0);     
        },failure =>{
            console.log("error retrieving data!");
        });
    }

    _buildSubCategoryInputs(response:any){
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
            if(!added){
                subCategoryArray.push(this._buildObject(response,i));
            }
            added = false;
            firstTime = false;
        }
        return subCategoryArray;
    }

    _checkIfExist(subCategoryArray:any,responseValue:string){
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

    _buildObject(response:any,index:number){
        var tempObject = {
            subCategory:response[index]["subCategory"],
            priceArray:[response[index]["price"]],
            dateArray:[response[index]["date"]]
        }
        return tempObject;
    }

    _decideToCallGraph(){
        if(this.year.value !=undefined && this.category.value != undefined ){
            return true;
        }
        return false;
    }

}