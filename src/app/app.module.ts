import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { ChartsModule } from 'ng2-charts';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/';
import {MatSelectModule} from '@angular/material/';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

import { RemoveSpace } from './shared/pipes/removeSpace.pipe'

import { Categories } from './shared/components/categories/categories.component'

import { AppComponent } from './app.component';
import { Summary } from "./summary/summary.component"
import { NewPurchase } from "./newInput/newPurchase/newPurchase.component"
import { NewIncome } from "./newInput/newIncome/newIncome.component"
import { NewInsurance } from "./newInput/newInsurance/newInsurance.component"
import { NewInput } from "./newInput/newInput.component"
import { PieTotal } from './summary/pieTotal/pieTotal.component'
import { LineByYear } from './summary/lineByYear/lineByYear.component'
import { TablePendingLoans } from './summary/tablePendingLoans/tablePendingLoans.component'
import { BarCategory } from './summary/barCategory/barCategory.component'
import { YearByYear } from './yearByYear/yearByYear.component'
import { Loans } from './loans/loans.component'
import { AddNewLoans } from './shared/dialogs/addNewLoans/addNewLoans.component'
import { Investments } from './investments/investments.component'
import { InvestmentTable } from './shared/components/tables/investmentTable/investmentTable.component'
import { GraphDisplay } from './shared/components/graphDisplay/graphDisplay.component';
import { PlaceholderDirective } from './shared/directives/placeholder.directive';
import { DecimalFormatPipe } from './shared/pipes/decimalFormat.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RemoveSpace,
    Categories,
    NewInput,
    NewPurchase,
    NewIncome,
    NewInsurance,
    Summary,
    PieTotal,
    LineByYear,
    TablePendingLoans,
    BarCategory,
    YearByYear,
    Loans,
    AddNewLoans,
    Investments,
    InvestmentTable,
    GraphDisplay,
    PlaceholderDirective,
    DecimalFormatPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    MatGridListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddNewLoans,
    GraphDisplay
  ]
})
export class AppModule { }
