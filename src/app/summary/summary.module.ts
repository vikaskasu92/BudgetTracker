import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatRadioModule, MatDialogModule, MatDividerModule } from '@angular/material';

import { SummaryComponent } from './summary.component';
import { PieTotalComponent } from './pieTotal/pieTotal.component';
import { LineByYearComponent } from './lineByYear/lineByYear.component';
import { TablePendingLoansComponent } from './tablePendingLoans/tablePendingLoans.component';
import { BarCategoryComponent } from './barCategory/barCategory.component';
import { AlarmsComponent } from './alarms/alarms.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations:[
        SummaryComponent,
        PieTotalComponent,
        LineByYearComponent,
        TablePendingLoansComponent,
        BarCategoryComponent,
        AlarmsComponent,
    ],
    exports:[
        SummaryComponent,
        PieTotalComponent,
        LineByYearComponent,
        TablePendingLoansComponent,
        BarCategoryComponent,
        AlarmsComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class SummaryModule{

}