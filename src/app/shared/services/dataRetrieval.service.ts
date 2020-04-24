import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IExpenseIncomeSummary } from 'src/app/model/summary/expenseIncomeSummary.model';
import { environment } from '../../../environments/environment'
import { IYearlyExpenseSummary } from 'src/app/model/summary/yearlyExpenseSummary.model';
import { IPendingLoansSummary } from 'src/app/model/summary/pendingLoansSummary.model';
import { ICategoriesExpensesSummary } from 'src/app/model/summary/categoriesExpensesSummary.model';
import { IYearByYearExpense } from 'src/app/model/yearByYear/yearByYear.model';
import { ILoans } from 'src/app/model/loans/loans.model';
import { IInvestments } from 'src/app/model/investments/investments.model';

@Injectable({providedIn:"root"})
export class DataRetrieval{

    constructor(private http:HttpClient){}

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    }

    getOverallIncomeAndExpenses(){
        return this.http.get<IExpenseIncomeSummary>(environment.incomeExpenseSummary,this.httpOptions);
    }

    getOverallYearlyExpenses(){
        return this.http.get<IYearlyExpenseSummary>(environment.yearlyExpenseSummary,this.httpOptions);
    }

    getOverallPendingLoans(){
        return this.http.get<IPendingLoansSummary>(environment.pendingLoansSummary,this.httpOptions);
    }

    getOverallCategoriesExpenses(categoriesData:any){
        return this.http.get<ICategoriesExpensesSummary>(environment.categoriesExpensesSummary,this.httpOptions);
    }

    getYearByYearExpensesOnCategory(yearAndCategory:any){
        return this.http.get<IYearByYearExpense>(environment.yearByYearCategoryExpense,this.httpOptions);
    }

    getOpenClosedLoans(){
        return this.http.get<ILoans>(environment.openClosedLoans,this.httpOptions);
    }

    getInvestments(){
        return this.http.get<IInvestments>(environment.getAllInvestments,this.httpOptions);
    }

}