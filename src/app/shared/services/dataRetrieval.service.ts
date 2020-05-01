import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators'  

import { IExpenseIncomeSummary } from 'src/app/model/summary/expenseIncomeSummary.model';
import { environment } from '../../../environments/environment'
import { IYearlyExpenseSummary } from 'src/app/model/summary/yearlyExpenseSummary.model';
import { IPendingLoansSummary } from 'src/app/model/summary/pendingLoansSummary.model';
import { ILoans } from 'src/app/model/loans/loans.model';
import { IInvestments } from 'src/app/model/investments/investments.model';


@Injectable({providedIn:"root"})
export class DataRetrievalService{

    constructor(private http:HttpClient){}

    params:any;
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin':'*'
        })
    }
    allYears=[];

    getOverallIncomeAndExpenses(){
        return this.http.get<IExpenseIncomeSummary>(environment.incomeExpenseSummary,{
            headers: this.httpOptions.headers,
            params: new HttpParams()
            .set('fromDate', this.allYears[0]+'-01-01')
            .set('toDate', this.allYears[this.allYears.length - 1]+'-12-31')
        });
    }

    getOverallYearlyExpenses(yearsData:any){
        return this.http.get<IYearlyExpenseSummary>(environment.yearlyExpenseSummary,{
            headers: this.httpOptions.headers,
            params: new HttpParams()
            .set('fromDate', yearsData[0])
            .set('toDate', yearsData[1])
        });
    }

    getOverallPendingLoans(){
        return this.http.get<IPendingLoansSummary>(environment.pendingLoansSummary,this.httpOptions);
    }

    getOverallCategoriesExpenses(categoriesData:any){
        return this.http.get<any>(environment.categoriesExpensesSummary,{
            headers: this.httpOptions.headers,
            params: new HttpParams()
            .set('category', categoriesData[0])
            .set('subCategory', categoriesData[1])
        });
    }

    getYearByYearExpensesOnCategory(yearAndCategory:any){
        return this.http.get<any>(environment.yearByYearCategoryExpense,{
            headers: this.httpOptions.headers,
            params: new HttpParams()
            .set('fromDate', yearAndCategory[0]+'-01-01')
            .set('toDate', yearAndCategory[0]+'-12-31')
            .set('category',yearAndCategory[1])
        });
    }

    getOpenClosedLoans(){
        return this.http.get<ILoans>(environment.openClosedLoans,this.httpOptions);
    }

    getInvestments(){
        return this.http.get<IInvestments>(environment.getAllInvestments,this.httpOptions);
    }

    getAllYearsForCustomers(){
        return this.http.get<any>(environment.getAllYearsForCustomers,this.httpOptions).pipe(
            map(response =>{
                this.allYears = [];
                for(let i=0; i<response.length; i++){
                    this.allYears.push(response[i]["year"].substring(0,4));
                }
                return this.allYears;
            })
        );
    }

    getRawDataByDate(inputData:any){
        return this.http.get<any>(environment.getRawDataByDate,{
            headers: this.httpOptions.headers,
            params: new HttpParams()
            .set('fromDate', inputData[1])
            .set('toDate', inputData[2])
        });
    }

    getRawDataByInput(inputData:any){
        return this.http.get<any>(environment.getRawDataByInput,{
            headers: this.httpOptions.headers,
            params: new HttpParams()
            .set('inputType', inputData[0])
        });
    }

    getRawDataByInputAndDate(inputData:any){
        return this.http.get<any>(environment.getRawDataByInputAndDate,{
            headers: this.httpOptions.headers,
            params: new HttpParams()
            .set('inputType', inputData[0])
            .set('fromDate', inputData[1])
            .set('toDate', inputData[2])
        });
    }

}