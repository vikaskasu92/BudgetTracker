import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { ExpensesByYearComponent } from './expensesByYear/expensesByYear.component';
import { LoansComponent } from './loans/loans.component';
import { RawDataComponent } from './rawData/rawData.component';
import { NewInputComponent } from './newInput/newInput.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'newInput'},
  {path:'login', component:LoginComponent},
  {path:'newInput',canActivate:[AuthGuard], component:NewInputComponent},
  {path:'summary',canActivate:[AuthGuard],component:SummaryComponent},
  {path:'expensesByYear',canActivate:[AuthGuard],component:ExpensesByYearComponent},
  {path:'loans',canActivate:[AuthGuard],component:LoansComponent},
  {path:'rawData',canActivate:[AuthGuard],component:RawDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
