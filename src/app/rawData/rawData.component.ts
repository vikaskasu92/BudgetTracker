import { Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../shared/services/common.service';
import { DataRetrievalService } from '../shared/services/dataRetrieval.service';
import { MatDialog } from '@angular/material';
import { EditRawDataDialogComponent } from '../shared/dialogs/editRawDataDialog/editRawDataDialog.component';
import { DataStoreService } from '../shared/services/dataStore.service';
import { InputDataService } from '../shared/services/inputData.service';
import { ConfirmDialogComponent } from '../shared/dialogs/confirmDialog/confirmDialog.component';
import { ErrorDialogComponent } from '../shared/dialogs/errorDialog/errorDialog.component';

@Component({
  selector: 'app-rawData',
  templateUrl: './rawData.component.html',
  styleUrls: ['./rawData.component.css']
})
export class RawDataComponent implements OnInit {

  constructor(private common:CommonService,
            private dataRetrieval:DataRetrievalService,
            private matDialog:MatDialog,
            private dataStore:DataStoreService,
            private inputDataService:InputDataService){}

  inputTypes:string[];
  rawDataForm:FormGroup;
  toDateLimit:any;
  inputData=[];
  fromDate:string;
  toDate:string;
  purchasesItems:any;
  incomeItems:any;
  insuranceItems:any;
  loanItems:any;
  purchasesItemsAvailable:boolean = false;
  incomeItemsAvailable:boolean = false;
  insuranceItemsAvailable:boolean = false;
  totalResultsPurchases:number;
  totalResultsIncome:number;
  totalResultsInsurance:number;
  minPagePurchases:number;
  maxPagePurchases:number;
  minPageIncome:number;
  maxPageIncome:number;
  minPageInsurance:number;
  maxPageInsurance:number;
  purchaseLeftDisabled:boolean = true;
  purchaseRightDisabled:boolean = false;
  incomeLeftDisabled:boolean = true;
  incomeRightDisabled:boolean = false;
  insuranceLeftDisabled:boolean = true;
  insuranceRightDisabled:boolean = false;
  dataAvailable:boolean = true;
  purchaseForm:FormGroup;

  ngOnInit() {
    this.inputTypes = this.common.inputTypes;
    this.rawDataForm = this.inputDataService.createRawDataForm(this.rawDataForm);
    this.toDateLimit = new Date();
  }

  searchRawData(minPage:number){
    if(this.rawDataForm.valid){
      minPage === 1 ? this._resetOriginalPaginationValues():'';
      this._updateFromDate(this.rawDataForm.value.fromDateSearch,this.rawDataForm);
      this._updateToDate(this.rawDataForm.value.toDateSearch,this.rawDataForm);
      this.fromDate = this.rawDataForm.value.fromDateSearch;
      this.toDate = this.rawDataForm.value.toDateSearch;
      let inputType = this.rawDataForm.value.inputType;
      this._buildinputData(inputType,this.fromDate ,this.toDate,true);
      this.dataRetrieval.getRawDataByInputAndDate(this.inputData,minPage).subscribe( response => {
        response.rawData.length === 0 ? this.dataAvailable = false : this.dataAvailable = true;
        this._setTotalResultsValue(inputType,response.count[0].count);
        this._paintTableWithResponse(inputType,response.rawData);
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
        this.minPageIncome === 1 || this.maxPageIncome < this.totalResultsIncome ?
          this.incomeRightDisabled = false : this.incomeRightDisabled = true;
        this.searchRawData(this.minPageIncome);
    }else if(type === "insurance"){
        this.minPageInsurance = minPage - 10;
        this.maxPageInsurance = this.minPageInsurance + 10;
        this.minPageInsurance === 1 || this.maxPageInsurance < this.totalResultsInsurance ?
          this.insuranceRightDisabled = false : this.insuranceRightDisabled = true;
        this.searchRawData(this.minPageInsurance);
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
      }
  }

  editPurchaseItem(item:string,cost:number,date:string,mainCategory:string,subCategory:string,id:number){
    const data = {item: item, cost: cost, date: date, mainCategory: mainCategory, subCategory: subCategory,type:"purchases"};
    const dialogRef =  this.inputDataService.openDialog(this.matDialog,EditRawDataDialogComponent,data);
   
    dialogRef.afterClosed().subscribe( formData =>{
      if(formData != true){
          this.common.updateDate(formData.value.date,formData);
          this.dataStore.updatePurchaseDataToDB(this._updateObjectId(formData.value,id)).subscribe( success =>{
              this.searchRawData(1);
              }, failure =>{

              }
          );
      }
    });
  }

  editInsuranceItem(insuranceType:string,insurnacePaidAmount:string,insurancePaidDate:string,id:number){
    const data = {insuranceType: insuranceType, insurancePaidAmount: insurnacePaidAmount, insurancePaidDate: insurancePaidDate,type:'insurance'};
    const dialogRef =  this.inputDataService.openDialog(this.matDialog,EditRawDataDialogComponent,data);
   
    dialogRef.afterClosed().subscribe( formData =>{
      if(formData != true){
          this.common.updateInsuranceDate(formData.value.insurancePaidDate,formData);
          this.dataStore.updateInsuranceDataToDB(this._updateObjectId(formData.value,id)).subscribe( success =>{
              this.searchRawData(1);
              }, failure =>{

              }
          );
      }
    });
  }

  editIncomeItem(salaryRecieved:number,dateRecieved:string,federalTax:number,stateTax:number,medicareTax:number,socialSecurityTax:number,id:number){
    const data = {salaryRecieved: salaryRecieved, dateRecieved: dateRecieved, federalTax: federalTax,stateTax: stateTax,medicareTax: medicareTax,socialSecurityTax: socialSecurityTax,type:'income'};
    const dialogRef =  this.inputDataService.openDialog(this.matDialog,EditRawDataDialogComponent,data);
   
    dialogRef.afterClosed().subscribe( formData =>{
      if(formData != true){
          this.common.updateIncomeDate(formData.value.dateRecieved,formData);
          this.dataStore.updateIncomeDataToDB(this._updateObjectId(formData.value,id)).subscribe( success =>{
              this.searchRawData(1);
              }, failure =>{

              }
          );
      }
    });
  }

  deletePurchaseItem(id:number){
    const data = {message:"This purchase item will be deleted. Are you Sure?"};
    const dialogRef =  this.inputDataService.openDialog(this.matDialog,ConfirmDialogComponent,data);
   
    dialogRef.afterClosed().subscribe( deleteIt =>{
      const deleteObj = {deleteById:id};
      if(deleteIt){
        this.dataStore.deletePurchaseDataFromDB(deleteObj).subscribe( response =>{
          if(response != null){
            const data = {message:"As a 'Demo User' you cannot delete data from budget tracker!"};
            this.inputDataService.openDialog(this.matDialog,ErrorDialogComponent,data);        
          }else{
            this.searchRawData(1);
          } 
        },failure =>{
          console.log("Problem with deleting");
        });
      }
    });
  }

  deleteInsuranceItem(id:number){
    const data = {message:"This Insurance item will be deleted. Are you Sure?"};
    const dialogRef =  this.inputDataService.openDialog(this.matDialog,ConfirmDialogComponent,data);
  
    dialogRef.afterClosed().subscribe( deleteIt =>{
      const deleteObj = {deleteById:id};
      if(deleteIt){
        this.dataStore.deleteInsuranceDataFromDB(deleteObj).subscribe( response =>{
          if(response != null){
            const data = {message:"As a 'Demo User' you cannot delete data from budget tracker!"};
            this.inputDataService.openDialog(this.matDialog,ErrorDialogComponent,data);        
          }else{
            this.searchRawData(1);
          }
        },failure =>{
          console.log("Problem with deleting");
        });
      }
    });
  }

  deleteIncomeItem(id:number){
    const data = {message:"This Income data will be deleted. Are you Sure?"};
    const dialogRef =  this.inputDataService.openDialog(this.matDialog,ConfirmDialogComponent,data);
  
    dialogRef.afterClosed().subscribe( deleteIt =>{
      const deleteObj = {deleteById:id};
      if(deleteIt){
        this.dataStore.deleteIncomeDataFromDB(deleteObj).subscribe( response =>{
          if(response != null){
            const data = {message:"As a 'Demo User' you cannot delete data from budget tracker!"};
            this.inputDataService.openDialog(this.matDialog,ErrorDialogComponent,data);        
          }else{
            this.searchRawData(1);
          }
        },failure =>{
          console.log("Problem with deleting");
        });
      }
    });
  }

  private _updateObjectId(formDataObject:FormGroup,id:number){
    formDataObject['id'] = id;
    return formDataObject;
  }

  private _resetOriginalPaginationValues(){
    this.minPagePurchases = 1;
    this.maxPagePurchases = 10;
    this.minPageIncome = 1;
    this.maxPageIncome = 10;
    this.minPageInsurance = 1;
    this.maxPageInsurance = 10;
    this.purchaseLeftDisabled = true;
    this.incomeLeftDisabled = true;
    this.insuranceLeftDisabled = true;
  }

  private _setTotalResultsValue(inputType:string,count:number){
    if(inputType === "purchases"){
      this.totalResultsPurchases = count;
      if(count <= 10){
        this.maxPagePurchases = count;
        this.purchaseLeftDisabled = true;
        this.purchaseRightDisabled = true;
      }else{
        this.maxPagePurchases === count ? this.purchaseRightDisabled = true :  this.purchaseRightDisabled = false;
      }
    }else if(inputType === "income"){
      this.totalResultsIncome = count;
      if(count <= 10){
        this.maxPageIncome = count;
        this.incomeLeftDisabled = true;
        this.incomeRightDisabled = true;
      }else{
        this.maxPageIncome === count ? this.incomeRightDisabled = true :  this.incomeRightDisabled = false;
      }
    }else if(inputType === "insurance"){
      this.totalResultsInsurance = count;
      if(count <= 10){
        this.maxPageInsurance = count;
        this.insuranceLeftDisabled = true;
        this.insuranceRightDisabled = true;
      }else{
        this.maxPageInsurance === count ? this.insuranceRightDisabled = true :  this.insuranceRightDisabled = false;
      }
    }
  }

  private _paintTableWithResponse(inputType:string,response:any){
    this.purchasesItemsAvailable = false;
    this.incomeItemsAvailable = false;
    this.insuranceItemsAvailable = false;
    switch(inputType) {
      case "purchases":
        this.purchasesItems = response;
        this.purchasesItemsAvailable = true;
        break;
      case "income":
        this.incomeItems = response;
        this.incomeItemsAvailable = true;
        break;
      case "insurance":
        this.insuranceItems = response;
        this.insuranceItemsAvailable = true;
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

  
  
  private _updateFromDate(date:Date,form:FormGroup){
    if(typeof date != "string"){
        let day = this._adjustDigits(date.getDate().toString());
        let month = this._adjustDigits((date.getMonth()+1).toString());
        let year = date.getFullYear().toString();
        form.value.fromDateSearch = year+'-'+month+'-'+day;
    }
  }
  
  private _updateToDate(date:Date,form:FormGroup){
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
