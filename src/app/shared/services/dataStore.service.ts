import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({providedIn:"root"})
export class DataStoreService{

    constructor(private http:HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    }

    storePurchaseDataToDB(inputData:any){
        return this.http.post(environment.purchaseDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    storeIncomeDataToDB(inputData:any){
        return this.http.post(environment.incomeDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    storeInsuranceDataToDB(inputData:any){
        return this.http.post(environment.insuranceDataStoreURL,inputData,{headers:this.httpOptions.headers}); 
    }

    storeNewLoansDataToDB(inputData:any){
        return this.http.post(environment.addNewLoansDataStoreURL,inputData,{headers:this.httpOptions.headers}); 
    }

    closeLoanFromDB(inputData:any){
        return this.http.post(environment.closeLoanFromDB,inputData,{headers:this.httpOptions.headers}); 
    }

    deleteLoanFromDB(inputData:any){
        return this.http.post(environment.deleteLoanFromDB,inputData,{headers:this.httpOptions.headers}); 
    }
}