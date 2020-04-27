import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
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

import { AppComponent } from './app.component';
import { SummaryComponent } from "./summary/summary.component"
import { NewPurchaseComponent } from "./newInput/newPurchase/newPurchase.component"
import { NewIncomeComponent } from "./newInput/newIncome/newIncome.component"
import { NewInsuranceComponent } from "./newInput/newInsurance/newInsurance.component"
import { NewInputComponent } from "./newInput/newInput.component"
import { PieTotalComponent } from './summary/pieTotal/pieTotal.component'
import { LineByYearComponent } from './summary/lineByYear/lineByYear.component'
import { CategoriesComponent } from './shared/components/categories/categories.component'
import { TablePendingLoansComponent } from './summary/tablePendingLoans/tablePendingLoans.component'
import { BarCategoryComponent } from './summary/barCategory/barCategory.component'
import { YearByYearComponent } from './yearByYear/yearByYear.component'
import { LoansComponent } from './loans/loans.component'
import { AddNewLoansComponent } from './shared/dialogs/addNewLoans/addNewLoans.component'
import { InvestmentsComponent } from './investments/investments.component'
import { GraphDisplayComponent } from './shared/components/graphDisplay/graphDisplay.component';
import { PlaceholderDirective } from './shared/directives/placeholder.directive';
import { DecimalFormatPipe } from './shared/pipes/decimalFormat.pipe';
import { RemoveSpacePipe } from './shared/pipes/removeSpace.pipe'

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    NewInputComponent,
    NewPurchaseComponent,
    NewIncomeComponent,
    NewInsuranceComponent,
    SummaryComponent,
    PieTotalComponent,
    LineByYearComponent,
    TablePendingLoansComponent,
    BarCategoryComponent,
    YearByYearComponent,
    LoansComponent,
    AddNewLoansComponent,
    InvestmentsComponent,
    GraphDisplayComponent,
    PlaceholderDirective,
    DecimalFormatPipe,
    RemoveSpacePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
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
    AddNewLoansComponent,
    GraphDisplayComponent
  ]
})
export class AppModule { }
