import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalAuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({providedIn:"root"})
export class DataStoreService{

    constructor(private http:HttpClient,
                private localAuthService:LocalAuthService,
                private common:CommonService){}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials':'true'
        }),
        params: new HttpParams()
    }

    createOrModifyPurchases:boolean = false;

    updatePurchaseDataToDB(inputData:any){
        let response = this._checkDemoUserAndLimit(inputData,"purchase");
        if(response[2] && !response[3]){
           return this._returnFalseObservableWithLimit(response[1]);
        }
        if((response[2] && response[3]) || !response[3]){
            this.httpOptions.params = new HttpParams().set('id',inputData.id).set('item',inputData.item)
            .set('cost',inputData.cost).set('date',inputData.date).set('mainCategory',inputData.mainCategory).set('subCategory',inputData.subCategory)
            return this._callPost(environment.updatePurchaseDataStoreURL,inputData,this.httpOptions.headers,this.httpOptions.params);
        }
    }

    storePurchaseDataToDB(inputData:any){
        let response = this._checkDemoUserAndLimit(inputData,"purchase");
        if(response[2] && !response[3]){
           return this._returnFalseObservableWithLimit(response[1]);
        }
        if((response[2] && response[3]) || !response[3]){
            this.createOrModifyPurchases = false;
            this.httpOptions.params = new HttpParams().set('username',this.localAuthService.userId)
                .set('item',inputData.item).set('cost',inputData.cost)
                .set('date',inputData.date).set('mainCategory',inputData.mainCategory) .set('subCategory',inputData.subCategory)
            return this._callPost(environment.purchaseDataStoreURL,inputData,this.httpOptions.headers,this.httpOptions.params);
        }
    }

    deletePurchaseDataFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){
            return this._callPost(environment.deletePurchaseDataStoreURL,inputData,this.httpOptions.headers,null)
        }else{
            return this._returnFalseObservable();
        }  
    }

    updateIncomeDataToDB(inputData:any){
        this.httpOptions.params = new HttpParams().set('id',inputData.id).set('salaryRecieved',inputData.salaryRecieved)
            .set('dateRecieved',inputData.dateRecieved).set('federalTax',inputData.federalTax)
            .set('stateTax',inputData.stateTax).set('medicareTax',inputData.medicareTax).set('socialSecurityTax',inputData.socialSecurityTax)
        return this._callPost(environment.updateIncomeDataStoreURL,inputData,this.httpOptions.headers,this.httpOptions.params);
    }

    storeIncomeDataToDB(inputData:any){
        this.httpOptions.params = new HttpParams().set('username',this.localAuthService.userId)
            .set('salaryRecieved',inputData.salaryRecieved).set('dateRecieved',inputData.dateRecieved)
            .set('federalTax',inputData.federalTax).set('stateTax',inputData.stateTax)
            .set('medicareTax',inputData.medicareTax).set('socialSecurityTax',inputData.socialSecurityTax)
        return this._callPost(environment.incomeDataStoreURL,inputData,this.httpOptions.headers,this.httpOptions.params);
    }

    deleteIncomeDataFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){
            return this._callPost(environment.deleteIncomeDataStoreURL,inputData,this.httpOptions.headers,null);
        }else{
            this._returnFalseObservable();
        }    
    }
    
    updateInsuranceDataToDB(inputData:any){
        let response = this._checkDemoUserAndLimit(inputData,"insurance");
        if(response[2] && !response[3]){
           return this._returnFalseObservableWithLimit(response[1]);
        }
        if((response[2] && response[3]) || !response[3]){
            this.httpOptions.params =  new HttpParams().set('id',inputData.id)
                .set('insuranceType',inputData.insuranceType).set('insurancePaidDate',inputData.insurancePaidDate)
                .set('insurnacePaidAmount',inputData.insurnacePaidAmount)
            return this._callPost(environment.updateInsuranceDataStoreURL,inputData,this.httpOptions.headers,this.httpOptions.params);
        }
    }

    storeInsuranceDataToDB(inputData:any){
        let response = this._checkDemoUserAndLimit(inputData,"insurance");
        if(response[2] && !response[3]){
           return this._returnFalseObservableWithLimit(response[1]);
        }
        if((response[2] && response[3]) || !response[3]){
            this.httpOptions.params = new HttpParams().set('username',this.localAuthService.userId)
                .set('insuranceType',inputData.insuranceType).set('insurancePaidDate',inputData.insurancePaidDate)
                .set('insurnacePaidAmount',inputData.insurnacePaidAmount)
            return this._callPost(environment.insuranceDataStoreURL,inputData,this.httpOptions.headers,this.httpOptions.params);
        }
    }

    deleteInsuranceDataFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){ 
            return this._callPost(environment.deleteInsuranceDataStoreURL,inputData,this.httpOptions.headers,null);
        }else{
            return this._returnFalseObservable();
        }
    }

    storeNewLoansDataToDB(inputData:any){
            this.httpOptions.params =  new HttpParams().set('username',this.localAuthService.userId)
            .set('loanName',inputData.loanName).set('loanType',inputData.loanType)
            .set('loanBalance',inputData.loanBalance).set('loanAPR',inputData.loanAPR).set('loanEMI',inputData.loanEMI)
        return this._callPost(environment.addNewLoansDataStoreURL,inputData,this.httpOptions.headers,this.httpOptions.params);
    }

    closeLoanFromDB(inputData:any){
        this.httpOptions.params =  new HttpParams().set('id',inputData.id)
        return this._callPost(environment.closeLoanFromDB,inputData,this.httpOptions.headers,this.httpOptions.params);
    }

    reOpenLoanFromDB(inputData:any){
        this.httpOptions.params = new HttpParams().set('id',inputData.id)
        return this._callPost(environment.reOpenLoanFromDB,inputData,this.httpOptions.headers,this.httpOptions.params);
    }

    deleteLoanFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){
            return this._callPost(environment.deleteLoanFromDB,inputData,this.httpOptions.headers,null);
        }else{
            return this._returnFalseObservable();
        }
    }

    updateLoansDataToDB(inputData:any){
        this.httpOptions.params = new HttpParams().set('username',this.localAuthService.userId)
            .set('loanName',inputData.loanName).set('loanType',inputData.loanType)
            .set('loanBalance',inputData.loanBalance).set('loanAPR',inputData.loanAPR)
            .set('loanEMI',inputData.loanEMI).set('id',inputData.id)
        return this._callPost(environment.updateLoanInDB,inputData,this.httpOptions.headers,this.httpOptions.params);
    }

    createNewBudgetAlarm(inputData:any){
        this.httpOptions.params = new HttpParams().set('username',this.localAuthService.userId)
            .set('alarmBy',inputData.alarmBy).set('budgetAmount',inputData.budgetAmount)
            .set('budgetEmail',inputData.budgetEmail)
        return this._callPost(environment.createNewBudgetAlarmInDB,inputData,this.httpOptions.headers,this.httpOptions.params);
    }

    deleteBudgetAlarmFromDB(inputData:any){
        if(!this.localAuthService.isDemoUser){
            return this._callPost(environment.deleteBudgetAlarmFromDB,inputData,this.httpOptions.headers,null);
        }else{
            return this._returnFalseObservable();
        }
    }

    checkAndIntiateAlarms(){
        this.httpOptions.params =  new HttpParams().set('username',this.localAuthService.userId)
        return this._callPost(environment.checkAndInitiateAlarms,{},this.httpOptions.headers,this.httpOptions.params);
    }

    private _checkDemoUserAndLimit(inputData:any,inputType:string):any[]{
        let responseArray:any[] = [];
        if(this.localAuthService.isDemoUser){
            if(inputType === "purchase"){
                responseArray = this._calculatePurchaseAllowedValues(inputData.subCategory,inputData.cost);
            }else if(inputType === "insurance"){
                responseArray = this._calculateInsuranceAllowedValues(inputData.insurnacePaidAmount);
            }else if(inputType === "income"){
                //responseArray = this._calculateIncomeAllowedValues(inputData.insurnacePaidAmount);
            }
            responseArray.push(true);
            if(responseArray[0]){
                this.createOrModifyPurchases = true;
            }else{
                this.createOrModifyPurchases = false;
            }   
        }else{
            responseArray.push(false);
            this.createOrModifyPurchases = true;
        }
        responseArray.push(this.createOrModifyPurchases);
        return responseArray;
    }

    private _callPost(url:string,inputData:any,headers:HttpHeaders,params:HttpParams){
        return this.http.post(url,inputData,{
            headers:headers,
            params: params});
    }

    private _calculatePurchaseAllowedValues(category:string,value:number):any[]{
        const responseArray = [];
        for(let i=0; i<Object.keys(this.common.purchasesAllowedValues).length; i++){
            if(Object.keys(this.common.purchasesAllowedValues)[i] === category){
                if(Object.values(this.common.purchasesAllowedValues)[i] >= value){
                    responseArray.push(true);
                    responseArray.push(Object.values(this.common.purchasesAllowedValues)[i])
                    return responseArray;
                }
                responseArray.push(false);
                responseArray.push(Object.values(this.common.purchasesAllowedValues)[i])
                break;
            }
        }
        return responseArray;
    }

    private _calculateInsuranceAllowedValues(value:number):any[]{
        const responseArray = [];
            if(100 >= value){
                responseArray.push(true);
                responseArray.push(value);
                return responseArray;
            }
            responseArray.push(false);
            responseArray.push(100);
        return responseArray;
    }

    private _returnFalseObservable(){
        return new Observable<boolean>(observer =>{
            observer.next(false);
        })
    }

    private _returnFalseObservableWithLimit(limit:number){
        return new Observable<any>(observer =>{
            let response = [false,limit];
            observer.next(response);
        })
    }
}