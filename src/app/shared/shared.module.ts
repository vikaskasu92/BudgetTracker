import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RemoveSpacePipe } from './pipes/removeSpace.pipe';
import { DecimalFormatPipe } from './pipes/decimalFormat.pipe';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { InsuranceComponent } from './components/insurance/insurance.component';
import { IncomeComponent } from './components/income/income.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatSelectModule, MatCardModule, MatRadioModule, MatToolbarModule, MatTabsModule, MatNativeDateModule, MatButtonModule, MatDialogModule, MatProgressSpinnerModule, MatExpansionModule, MatSnackBarModule, MatDividerModule } from '@angular/material';
import { AlarmDialogComponent } from './dialogs/alarmDialog/alarmDialog.component';
import { AddNewLoansDialogComponent } from './dialogs/addNewLoansDialog/addNewLoansDialog.component';
import { GraphDisplayComponent } from './components/graphDisplay/graphDisplay.component';
import { ConfirmDialogComponent } from './dialogs/confirmDialog/confirmDialog.component';
import { EditRawDataDialogComponent } from './dialogs/editRawDataDialog/editRawDataDialog.component';
import { PlaceholderDirective } from './directives/placeholder.directive';

@NgModule({
    declarations:[
        RemoveSpacePipe,
        DecimalFormatPipe,
        PurchasesComponent,
        InsuranceComponent,
        IncomeComponent,
        CategoriesComponent,
        AlarmDialogComponent,
        AddNewLoansDialogComponent,
        GraphDisplayComponent,
        ConfirmDialogComponent,
        EditRawDataDialogComponent,
        PlaceholderDirective
    ],
    exports:[
        AlarmDialogComponent,
        AddNewLoansDialogComponent,
        GraphDisplayComponent,
        ConfirmDialogComponent,
        EditRawDataDialogComponent,
        PlaceholderDirective,
        RemoveSpacePipe,
        DecimalFormatPipe,
        PurchasesComponent,
        InsuranceComponent,
        IncomeComponent,
        CategoriesComponent,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatToolbarModule,
        MatTabsModule,
        MatNativeDateModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatDividerModule
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatToolbarModule,
        MatTabsModule,
        MatNativeDateModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatDividerModule
    ]
})
export class SharedModule{

}