import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.searchTypes = this.common.searchTypes;
    this.inputTypes = this.common.inputTypes;
    this._createForm();
    this.toDateLimit = new Date();
    this.rawDataForm.controls.searchType.valueChanges.subscribe( value => {
      this._setOrRemoveValidations(value);
    });
  }

  searchRawData(){
    if(this.rawDataForm.valid){
      switch(this.rawDataForm.value.searchType) {
        case "ByInput":
          this.inputType = this.rawDataForm.value.inputType;
          this._buildinputData(this.inputType,undefined,undefined,false);
          this.dataRetrieval.getRawDataByInput(this.inputData).subscribe( response => {
            console.log("success");
          },failure => {
            console.log("error");
          });
          break;
        case "ByDate":
          this._updateFromDate(this.rawDataForm.value.fromDateSearch,this.rawDataForm);
          this._updateToDate(this.rawDataForm.value.toDateSearch,this.rawDataForm);
          this.fromDate = this.rawDataForm.value.fromDateSearch;
          this.toDate = this.rawDataForm.value.toDateSearch;
          this._buildinputData(undefined,this.fromDate,this.toDate,true);
          this.dataRetrieval.getRawDataByDate(this.inputData).subscribe( response => {
            console.log("success");
          },failure => {
            console.log("error");
          });
          break;
        default:
          this._updateFromDate(this.rawDataForm.value.fromDateSearch,this.rawDataForm);
          this._updateToDate(this.rawDataForm.value.toDateSearch,this.rawDataForm);
          this.fromDate = this.rawDataForm.value.fromDateSearch;
          this.toDate = this.rawDataForm.value.toDateSearch;
          this.inputType = this.rawDataForm.value.inputType;
          this._buildinputData(this.inputType,this.fromDate ,this.toDate,true);
          this.dataRetrieval.getRawDataByInputAndDate(this.inputData).subscribe( response => {
            console.log("success");
          },failure => {
            console.log("error");
          });
        }
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
      case "ByDate":
        this._setValidations(this.rawDataForm,'fromDateSearch');
        this._setValidations(this.rawDataForm,'toDateSearch');
        this._clearValidations(this.rawDataForm,'inputType');
        this.byDate = true;
        this.byInput = false;
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
