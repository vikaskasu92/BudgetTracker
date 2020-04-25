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
            this.chartsLeft = [1,3];
            this.chartsRight = [2,4];
        }
    }

    categoryChanged(){
        //this.yearAndCategory[1] = this.category.value;
        this.yearAndCategory[1] = 'food';
        if(this._decideToCallGraph()){
            this._dataRetrieval(this.yearAndCategory);
            this.chartsLeft = [1,3];
            this.chartsRight = [2,4];
        }
    }

    _dataRetrieval(yearAndCategory:any){
        this.dataRetrieval.getYearByYearExpensesOnCategory(yearAndCategory).subscribe( response =>{
            let n = 1;
            const subCategoryArray = this._buildSubCategoryInputs(response);
            for(let i=0; i<subCategoryArray.length; i++){    
                if(n % 2 != 0){
                    this.chartMaker.createYearByYearCategoryLineChart("YearByYearExpensesLeft"+i,subCategoryArray[i]["priceArray"],subCategoryArray[i]["dateArray"]);
                }else{
                    this.chartMaker.createYearByYearCategoryLineChart("YearByYearExpensesRight"+i,subCategoryArray[i]["priceArray"],subCategoryArray[i]["dateArray"]); 
                }
                n++;
            }        
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