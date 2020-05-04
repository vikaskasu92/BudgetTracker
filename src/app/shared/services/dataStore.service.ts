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

    updatePurchaseDataToDB(inputData:any){
        return this.http.post(environment.updatePurchaseDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    storePurchaseDataToDB(inputData:any){
        return this.http.post(environment.purchaseDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    deletePurchaseDataFromDB(inputData:any){
        return this.http.post(environment.deletePurchaseDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    updateIncomeDataToDB(inputData:any){
        return this.http.post(environment.updateIncomeDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    storeIncomeDataToDB(inputData:any){
        return this.http.post(environment.incomeDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    deleteIncomeDataFromDB(inputData:any){
        return this.http.post(environment.deleteIncomeDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }
    
    updateInsuranceDataToDB(inputData:any){
        return this.http.post(environment.updateInsuranceDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    storeInsuranceDataToDB(inputData:any){
        return this.http.post(environment.insuranceDataStoreURL,inputData,{headers:this.httpOptions.headers}); 
    }

    deleteInsuranceDataFromDB(inputData:any){
        return this.http.post(environment.deleteInsuranceDataStoreURL,inputData,{headers:this.httpOptions.headers}); 
    }

    storeNewLoansDataToDB(inputData:any){
        return this.http.post(environment.addNewLoansDataStoreURL,inputData,{headers:this.httpOptions.headers}); 
    }

    closeLoanFromDB(inputData:any){
        return this.http.post(environment.closeLoanFromDB,inputData,{headers:this.httpOptions.headers}); 
    }

    reOpenLoanFromDB(inputData:any){
        return this.http.post(environment.reOpenLoanFromDB,inputData,{headers:this.httpOptions.headers}); 
    }

    deleteLoanFromDB(inputData:any){
        return this.http.post(environment.deleteLoanFromDB,inputData,{headers:this.httpOptions.headers}); 
    }

    updateLoansDataToDB(inputData:any){
        return this.http.post(environment.updateLoanInDB,inputData,{headers:this.httpOptions.headers}); 
    }
}