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
  searchTypes:string[];
  inputTypes:string[];
  rawDataForm:FormGroup;
  byDate:boolean = false;
  byInput:boolean = false;
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
    this.searchTypes = this.common.searchTypes;
    this.inputTypes = this.common.inputTypes;
    this._createForm();
    this.toDateLimit = new Date();
    this.rawDataForm.controls.searchType.valueChanges.subscribe( value => {
      this._setOrRemoveValidations(value);
    });
  }

  searchRawData(minPage:number,caseValue:string){
    if(this.rawDataForm.valid){
      if(minPage === 1){
        this._resetOriginalPaginationValues();
      }
      if(caseValue === undefined){
        caseValue = this.rawDataForm.value.searchType;
      }
      if(caseValue === "ByInput"){
        this.inputType = this.rawDataForm.value.inputType;
        this._buildinputData(this.inputType,undefined,undefined,false);
        this.dataRetrieval.getRawDataByInput(this.inputData,minPage).subscribe( response => {
          this._paintTableWithResponse(this.inputType,response.rawData);
          this._setTotalResultsValue(this.inputType,response.count[0].count);
        },failure => {
          console.log("error");
        });
      }else{
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
        this.searchRawData(this.minPagePurchases,this.rawDataForm.value.searchType);
    }else if(type === "income"){
        this.minPageIncome = minPage - 10;
        this.maxPageIncome = this.minPageIncome + 10;
        if(this.minPageIncome === 1 || this.maxPageIncome < this.totalResultsIncome){
          this.incomeRightDisabled = false;
          this.incomeLeftDisabled = true;
        }else{
          this.incomeRightDisabled = true;
        }
        this.searchRawData(this.minPageIncome,this.rawDataForm.value.searchType);
    }else if(type === "insurance"){
        this.minPageInsurance = minPage - 10;
        this.maxPageInsurance = this.minPageInsurance + 10;
        if(this.minPageInsurance === 1){
          this.insuranceRightDisabled = false;
        }else{
          this.insuranceRightDisabled = true;
        }
        this.searchRawData(this.minPageInsurance,this.rawDataForm.value.searchType);
        this.insuranceRightDisabled = false;
    }else{
        this.minPageLoans = minPage - 10;
        this.maxPageInsurance = this.minPageLoans + 10;
        if(this.minPageLoans=== 1){
          this.loansRightDisabled = false;
        }else{
          this.loansRightDisabled = true;
        }
        this.searchRawData(this.minPageLoans,this.rawDataForm.value.searchType);
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
          this.searchRawData(this.minPagePurchases,this.rawDataForm.value.searchType);
          this.purchaseLeftDisabled = false;
      }else if(type === "income"){
          this.minPageIncome = minPage + 10;
          if( maxPage + 10 <= this.totalResultsIncome){
            this.maxPageIncome = maxPage + 10;
          }else{
            this.maxPageIncome = this.totalResultsIncome;
            this.incomeRightDisabled = true;
          }
          this.searchRawData(this.minPageIncome,this.rawDataForm.value.searchType);
          this.incomeLeftDisabled = false;
      }else if(type === "insurance"){
          this.minPageInsurance = minPage + 10;
          if( maxPage + 10 <= this.totalResultsInsurance){
            this.maxPageInsurance = maxPage + 10;
          }else{
            this.maxPageInsurance = this.totalResultsInsurance;
            this.insuranceRightDisabled = true;
          }
          this.searchRawData(this.minPageInsurance,this.rawDataForm.value.searchType);
          this.insuranceLeftDisabled = false;
      }else if(type === "loans"){
          this.minPageLoans = minPage + 10;
          if( maxPage + 10 <= this.totalResultsLoans){
            this.maxPageLoans = maxPage + 10;
          }else{
            this.maxPageLoans = this.totalResultsLoans;
            this.loansRightDisabled = true;
          }
          this.searchRawData(this.minPageLoans,this.rawDataForm.value.searchType);
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
      'searchType' : new FormControl(null,Validators.required),
      'inputType' : new FormControl(null),
      'fromDateSearch' : new FormControl(null),
      'toDateSearch' : new FormControl(null)
    });
  }

  private _setOrRemoveValidations(value:string){
    switch(value) {
      case "ByInput":
        this._setValidations(this.rawDataForm,'inputType');
        this._clearValidations(this.rawDataForm,'fromDateSearch');
        this._clearValidations(this.rawDataForm,'toDateSearch');
        this.byInput = true;
        this.byDate = false;
        break;
      default:
        this._setValidations(this.rawDataForm,'inputType');
        this._setValidations(this.rawDataForm,'fromDateSearch');
        this._setValidations(this.rawDataForm,'toDateSearch');
        this.byInput = true;
        this.byDate = true;
    }
  }
  
  private _setValidations(form:FormGroup,formFieldName:string){
    form.get(formFieldName).setValidators([Validators.required]);
    form.get(formFieldName).updateValueAndValidity();
  }
  
  private _clearValidations(form:FormGroup,formFieldName:string){
    form.get(formFieldName).clearValidators();
    form.get(formFieldName).updateValueAndValidity();
    form.get(formFieldName).setValue(null);
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
