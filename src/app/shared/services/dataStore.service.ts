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
        return this.http.put(environment.updatePurchaseDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    storePurchaseDataToDB(inputData:any){
        return this.http.post(environment.purchaseDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    deletePurchaseDataFromDB(inputData:any){
        return this.http.delete(environment.deletePurchaseDataStoreURL,inputData);
    }

    updateIncomeDataToDB(inputData:any){
        return this.http.put(environment.updateIncomeDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    storeIncomeDataToDB(inputData:any){
        return this.http.post(environment.incomeDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    deleteIncomeDataFromDB(inputData:any){
        return this.http.delete(environment.deleteIncomeDataStoreURL,inputData);
    }
    
    updateInsuranceDataToDB(inputData:any){
        return this.http.put(environment.updateInsuranceDataStoreURL,inputData,{headers:this.httpOptions.headers});
    }

    storeInsuranceDataToDB(inputData:any){
        return this.http.post(environment.insuranceDataStoreURL,inputData,{headers:this.httpOptions.headers}); 
    }

    deleteInsuranceDataFromDB(inputData:any){
        return this.http.delete(environment.deleteInsuranceDataStoreURL,inputData); 
    }

    storeNewLoansDataToDB(inputData:any){
        return this.http.post(environment.addNewLoansDataStoreURL,inputData,{headers:this.httpOptions.headers}); 
    }

    closeLoanFromDB(inputData:any){
        return this.http.patch(environment.closeLoanFromDB,inputData,{headers:this.httpOptions.headers}); 
    }

    reOpenLoanFromDB(inputData:any){
        return this.http.patch(environment.reOpenLoanFromDB,inputData,{headers:this.httpOptions.headers}); 
    }

    deleteLoanFromDB(inputData:any){
        return this.http.delete(environment.deleteLoanFromDB,inputData); 
    }

    updateLoansDataToDB(inputData:any){
        return this.http.put(environment.updateLoanInDB,inputData,{headers:this.httpOptions.headers}); 
    }

    createNewPeriodicAlarm(inputData:any){
        return this.http.post(environment.createNewPeriodicAlarmInDB,inputData,{headers:this.httpOptions.headers}); 
    }

    createNewBudgetAlarm(inputData:any){
        return this.http.post(environment.createNewBudgetAlarmInDB,inputData,{headers:this.httpOptions.headers}); 
    }
}