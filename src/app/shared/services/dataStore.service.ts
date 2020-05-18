import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalAuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({providedIn:"root"})
export class DataStoreService{

    constructor(private http:HttpClient,
                private localAuthService:LocalAuthService){}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':'true'
        })
    }

    updatePurchaseDataToDB(inputData:any){
        return this.http.post(environment.updatePurchaseDataStoreURL,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('id',inputData.id)
            .set('item',inputData.item)
            .set('cost',inputData.cost)
            .set('date',inputData.date)
            .set('mainCategory',inputData.mainCategory)
            .set('subCategory',inputData.subCategory)
        });
    }

    storePurchaseDataToDB(inputData:any){
        return this.http.post(environment.purchaseDataStoreURL,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('username',this.localAuthService.userId)
            .set('item',inputData.item)
            .set('cost',inputData.cost)
            .set('date',inputData.date)
            .set('mainCategory',inputData.mainCategory)
            .set('subCategory',inputData.subCategory)
        });
    }

    deletePurchaseDataFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){
            return this.http.post(environment.deletePurchaseDataStoreURL,inputData);
        }else{
            return new Observable<boolean>(observer =>{
                observer.next(false);
            })
        }  
    }

    updateIncomeDataToDB(inputData:any){
        return this.http.post(environment.updateIncomeDataStoreURL,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('id',inputData.id)
            .set('salaryRecieved',inputData.salaryRecieved)
            .set('dateRecieved',inputData.dateRecieved)
            .set('federalTax',inputData.federalTax)
            .set('stateTax',inputData.stateTax)
            .set('medicareTax',inputData.medicareTax)
            .set('socialSecurityTax',inputData.socialSecurityTax)
        });
    }

    storeIncomeDataToDB(inputData:any){
        return this.http.post(environment.incomeDataStoreURL,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('username',this.localAuthService.userId)
            .set('salaryRecieved',inputData.salaryRecieved)
            .set('dateRecieved',inputData.dateRecieved)
            .set('federalTax',inputData.federalTax)
            .set('stateTax',inputData.stateTax)
            .set('medicareTax',inputData.medicareTax)
            .set('socialSecurityTax',inputData.socialSecurityTax)
        });
    }

    deleteIncomeDataFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){
            return this.http.post(environment.deleteIncomeDataStoreURL,inputData);
        }else{
            return new Observable<boolean>(observer =>{
                observer.next(false);
            })
        }    
    }
    
    updateInsuranceDataToDB(inputData:any){
        return this.http.post(environment.updateInsuranceDataStoreURL,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('id',inputData.id)
            .set('insuranceType',inputData.insuranceType)
            .set('insurancePaidDate',inputData.insurancePaidDate)
            .set('insurnacePaidAmount',inputData.insurnacePaidAmount)
        });
    }

    storeInsuranceDataToDB(inputData:any){
        return this.http.post(environment.insuranceDataStoreURL,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('username',this.localAuthService.userId)
            .set('insuranceType',inputData.insuranceType)
            .set('insurancePaidDate',inputData.insurancePaidDate)
            .set('insurnacePaidAmount',inputData.insurnacePaidAmount)
        }); 
    }

    deleteInsuranceDataFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){
            return this.http.post(environment.deleteInsuranceDataStoreURL,inputData); 
        }else{
            return new Observable<boolean>(observer =>{
                observer.next(false);
            })
        }
    }

    storeNewLoansDataToDB(inputData:any){
        return this.http.post(environment.addNewLoansDataStoreURL,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('username',this.localAuthService.userId)
            .set('loanName',inputData.loanName)
            .set('loanType',inputData.loanType)
            .set('loanBalance',inputData.loanBalance)
            .set('loanAPR',inputData.loanAPR)
            .set('loanEMI',inputData.loanEMI)
        }); 
    }

    closeLoanFromDB(inputData:any){
        return this.http.post(environment.closeLoanFromDB,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('id',inputData.id)
        }); 
    }

    reOpenLoanFromDB(inputData:any){
        return this.http.post(environment.reOpenLoanFromDB,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('id',inputData.id)
        });
    }

    deleteLoanFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){
            return this.http.post(environment.deleteLoanFromDB,inputData); 
        }else{
            return new Observable<boolean>(observer =>{
                observer.next(false);
            })
        }
    }

    updateLoansDataToDB(inputData:any){
        return this.http.post(environment.updateLoanInDB,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('username',this.localAuthService.userId)
            .set('loanName',inputData.loanName)
            .set('loanType',inputData.loanType)
            .set('loanBalance',inputData.loanBalance)
            .set('loanAPR',inputData.loanAPR)
            .set('loanEMI',inputData.loanEMI)
            .set('id',inputData.id)
        });
    }

    createNewBudgetAlarm(inputData:any){
        return this.http.post(environment.createNewBudgetAlarmInDB,inputData,{
            headers:this.httpOptions.headers,
            params: new HttpParams()
            .set('username',this.localAuthService.userId)
            .set('alarmBy',inputData.alarmBy)
            .set('budgetAmount',inputData.budgetAmount)
            .set('budgetEmail',inputData.budgetEmail)
        }); 
    }

    deleteBudgetAlarmFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){
            return this.http.post(environment.deleteBudgetAlarmFromDB,inputData);
        }else{
            return new Observable<boolean>(observer =>{
                observer.next(false);
            })
        }
    }

    checkAndIntiateAlarms(){
        return this.http.post(environment.checkAndInitiateAlarms,{},{
            headers: this.httpOptions.headers,
            params: new HttpParams()
            .set('username',this.localAuthService.userId)
        }); 
    }
}