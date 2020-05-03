import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../shared/services/common.service';
import { DataRetrievalService } from '../shared/services/dataRetrieval.service';

@Component({
  selector: 'app-rawData',
  templateUrl: './rawData.component.html',
  styleUrls: ['./rawData.component.css']
})
export class RawDataComponent implements OnInit {

  constructor(private common:CommonService,
            private dataRetrieval:DataRetrievalService){}
  inputTypes:string[];
  rawDataForm:FormGroup;
  toDateLimit:any;
  inputData=[];
  fromDate:string;
  toDate:string;
  inputType:string;
  purchasesItems:any;
  incomeItems:any;
  insuranceItems:any;
  loanItems:any;
  purchasesItemsAvailable:boolean = false;
  incomeItemsAvailable:boolean = false;
  insuranceItemsAvailable:boolean = false;
  loanItemsAvailable:boolean = false;
  totalResultsPurchases:number;
  totalResultsIncome:number;
  totalResultsInsurance:number;
  totalResultsLoans:number;
  minPagePurchases:number;
  maxPagePurchases:number;
  minPageIncome:number;
  maxPageIncome:number;
  minPageInsurance:number;
  maxPageInsurance:number;
  minPageLoans:number;
  maxPageLoans:number;
  purchaseLeftDisabled = true;
  purchaseRightDisabled = false;
  incomeLeftDisabled = true;
  incomeRightDisabled = false;
  insuranceLeftDisabled = true;
  insuranceRightDisabled = false;
  loansLeftDisabled = true;
  loansRightDisabled = false;

  ngOnInit() {
    this.inputTypes = this.common.inputTypes;
    this._createForm();
    this.toDateLimit = new Date();
  }

  searchRawData(minPage:number){
    if(this.rawDataForm.valid){
      if(minPage === 1){
        this._resetOriginalPaginationValues();
      }
        this._updateFromDate(this.rawDataForm.value.fromDateSearch,this.rawDataForm);
        this._updateToDate(this.rawDataForm.value.toDateSearch,this.rawDataForm);
        this.fromDate = this.rawDataForm.value.fromDateSearch;
        this.toDate = this.rawDataForm.value.toDateSearch;
        this.inputType = this.rawDataForm.value.inputType;
        this._buildinputData(this.inputType,this.fromDate ,this.toDate,true);
        this.dataRetrieval.getRawDataByInputAndDate(this.inputData,minPage).subscribe( response => {
          this._paintTableWithResponse(this.inputType,response.rawData);
          this._setTotalResultsValue(this.inputType,response.count[0].count);
        },failure => {
          console.log("error");
        });
    }
  }

  goLeft(minPage:number,type:string){
    if(type === "purchases"){
        this.minPagePurchases = minPage - 10;
        this.maxPagePurchases = this.minPagePurchases + 10;
        if(this.minPagePurchases === 1 || this.maxPagePurchases < this.totalResultsPurchases){
          this.purchaseRightDisabled = false;
        }else{
          this.purchaseRightDisabled = true;
        }
        this.searchRawData(this.minPagePurchases);
    }else if(type === "income"){
        this.minPageIncome = minPage - 10;
        this.maxPageIncome = this.minPageIncome + 10;
        if(this.minPageIncome === 1 || this.maxPageIncome < this.totalResultsIncome){
          this.incomeRightDisabled = false;
          this.incomeLeftDisabled = true;
        }else{
          this.incomeRightDisabled = true;
        }
        this.searchRawData(this.minPageIncome);
    }else if(type === "insurance"){
        this.minPageInsurance = minPage - 10;
        this.maxPageInsurance = this.minPageInsurance + 10;
        if(this.minPageInsurance === 1){
          this.insuranceRightDisabled = false;
        }else{
          this.insuranceRightDisabled = true;
        }
        this.searchRawData(this.minPageInsurance);
        this.insuranceRightDisabled = false;
    }else{
        this.minPageLoans = minPage - 10;
        this.maxPageInsurance = this.minPageLoans + 10;
        if(this.minPageLoans=== 1){
          this.loansRightDisabled = false;
        }else{
          this.loansRightDisabled = true;
        }
        this.searchRawData(this.minPageLoans);
        this.loansRightDisabled = false;
    } 
  }

  goRight(minPage:number,maxPage:number,type:string){
      if(type === "purchases"){
          this.minPagePurchases = minPage + 10;
          if( maxPage + 10 <= this.totalResultsPurchases){
            this.maxPagePurchases = maxPage + 10;
          }else{
            this.maxPagePurchases = this.totalResultsPurchases;
            this.purchaseRightDisabled = true;
          }
          this.searchRawData(this.minPagePurchases);
          this.purchaseLeftDisabled = false;
      }else if(type === "income"){
          this.minPageIncome = minPage + 10;
          if( maxPage + 10 <= this.totalResultsIncome){
            this.maxPageIncome = maxPage + 10;
          }else{
            this.maxPageIncome = this.totalResultsIncome;
            this.incomeRightDisabled = true;
          }
          this.searchRawData(this.minPageIncome);
          this.incomeLeftDisabled = false;
      }else if(type === "insurance"){
          this.minPageInsurance = minPage + 10;
          if( maxPage + 10 <= this.totalResultsInsurance){
            this.maxPageInsurance = maxPage + 10;
          }else{
            this.maxPageInsurance = this.totalResultsInsurance;
            this.insuranceRightDisabled = true;
          }
          this.searchRawData(this.minPageInsurance);
          this.insuranceLeftDisabled = false;
      }else if(type === "loans"){
          this.minPageLoans = minPage + 10;
          if( maxPage + 10 <= this.totalResultsLoans){
            this.maxPageLoans = maxPage + 10;
          }else{
            this.maxPageLoans = this.totalResultsLoans;
            this.loansRightDisabled = true;
          }
          this.searchRawData(this.minPageLoans);
          this.loansLeftDisabled = false;
      }
  }

  private _resetOriginalPaginationValues(){
    this.minPagePurchases = 1;
    this.maxPagePurchases = 10;
    this.minPageIncome = 1;
    this.maxPageIncome = 10;
    this.minPageInsurance = 1;
    this.maxPageInsurance = 10;
    this.minPageLoans = 1;
    this.maxPageLoans = 10;
    this.purchaseLeftDisabled = true;
    this.purchaseLeftDisabled = true;
    this.insuranceLeftDisabled = true;
    this.loansLeftDisabled = true;
  }

  private _setTotalResultsValue(inputType:string,count:any){
    if(inputType === "purchases"){
      this.totalResultsPurchases = count;
      if(count <= 10){
        this.maxPagePurchases = count;
        this.purchaseLeftDisabled = true;
        this.purchaseRightDisabled = true;
      }
    }else if(inputType === "income"){
      this.totalResultsIncome = count;
      if(count <= 10){
        this.maxPageIncome = count;
        this.incomeLeftDisabled = true;
        this.incomeRightDisabled = true;
      }
    }else if(inputType === "insurance"){
      this.totalResultsInsurance = count;
      if(count <= 10){
        this.maxPageInsurance = count;
        this.insuranceLeftDisabled = true;
        this.insuranceRightDisabled = true;
      }
    }else{
      this.totalResultsLoans = count;
      if(count <= 10){
        this.maxPageLoans = count;
        this.loansLeftDisabled = true;
        this.loansRightDisabled = true;
      }
    }
  }

  private _paintTableWithResponse(inputType:string,response:any){
    switch(inputType) {
      case "purchases":
        this.purchasesItems = response;
        this.purchasesItemsAvailable = true;
        this.incomeItemsAvailable = false;
        this.insuranceItemsAvailable = false;
        this.loanItemsAvailable = false;
        break;
      case "income":
        this.incomeItems = response;
        this.purchasesItemsAvailable = false;
        this.incomeItemsAvailable = true;
        this.insuranceItemsAvailable = false;
        this.loanItemsAvailable = false;
        break;
      case "insurance":
        this.insuranceItems = response;
        this.purchasesItemsAvailable = false;
        this.incomeItemsAvailable = false;
        this.insuranceItemsAvailable = true;
        this.loanItemsAvailable = false;
        break;
      case "loans":
          this.loanItems = response;
          this.purchasesItemsAvailable = false;
          this.incomeItemsAvailable = false;
          this.insuranceItemsAvailable = false;
          this.loanItemsAvailable = true;
          break;
    }
  }

  private _buildinputData(inputType:string,fromDate:string,toDate:string, dateCheck:boolean){
    this.inputData=[];
    if(dateCheck){
      if(fromDate > toDate){
        this.inputData.push(inputType);
        this.inputData.push(toDate);
        this.inputData.push(fromDate);
      }else{
        this.inputData.push(inputType);
        this.inputData.push(fromDate);
        this.inputData.push(toDate);
      }
    }else{
      this.inputData.push(inputType);
    }
  }

  private _createForm(){
    this.rawDataForm = new FormGroup({
      'inputType' : new FormControl(null,Validators.required),
      'fromDateSearch' : new FormControl(null,Validators.required),
      'toDateSearch' : new FormControl(null,Validators.required)
    });
  }
  
  private _updateFromDate(date:any,form:FormGroup){
    if(typeof date != "string"){
        let day = this._adjustDigits(date.getDate().toString());
        let month = this._adjustDigits((date.getMonth()+1).toString());
        let year = date.getFullYear().toString();
        form.value.fromDateSearch = year+'-'+month+'-'+day;
    }
  }
  
  private _updateToDate(date:any,form:any){
    if(typeof date != "string"){
        let day = this._adjustDigits(date.getDate().toString());
        let month = this._adjustDigits((date.getMonth()+1).toString());
        let year = date.getFullYear().toString();
        form.value.toDateSearch = year+'-'+month+'-'+day;
    }
  }
  
  private _adjustDigits(number:string){
      if(number.length == 1){
          return number = "0"+number;
      }
      return number;
  }

}
