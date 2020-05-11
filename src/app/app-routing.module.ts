import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { ExpensesByYearComponent } from './expensesByYear/expensesByYear.component';
import { LoansComponent } from './loans/loans.component';
import { RawDataComponent } from './rawData/rawData.component';
import { NewInputComponent } from './newInput/newInput.component';


const routes: Routes = [
  {path:'',component:NewInputComponent},
  {path:'summary',component:SummaryComponent},
  {path:'expensesByYear',component:ExpensesByYearComponent},
  {path:'loans',component:LoansComponent},
  {path:'rawData',component:RawDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
