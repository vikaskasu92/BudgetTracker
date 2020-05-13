import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AlarmDialogComponent } from './shared/dialogs/alarmDialog/alarmDialog.component'
import { AddNewLoansDialogComponent } from './shared/dialogs/addNewLoansDialog/addNewLoansDialog.component'
import { GraphDisplayComponent } from './shared/components/graphDisplay/graphDisplay.component';
import { ConfirmDialogComponent } from './shared/dialogs/confirmDialog/confirmDialog.component'
import { EditRawDataDialogComponent } from './shared/dialogs/editRawDataDialog/editRawDataDialog.component'

import { ExpensesByYearModule } from './expensesByYear/expensesByYear.module';
import { LoansModule } from './loans/loans.module';
import { NewInputModule } from './newInput/newInput.module';
import { RawDataModule } from './rawData/rawData.module';
import { SummaryModule } from './summary/summary.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginDialogComponent } from './shared/dialogs/loginDialog/loginDialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    ExpensesByYearModule,
    LoansModule,
    NewInputModule,
    RawDataModule,
    SummaryModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddNewLoansDialogComponent,
    GraphDisplayComponent,
    ConfirmDialogComponent,
    EditRawDataDialogComponent,
    AlarmDialogComponent,
    LoginDialogComponent
  ]
})
export class AppModule { }
