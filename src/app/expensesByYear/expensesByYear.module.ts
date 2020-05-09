import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ExpensesByYearComponent } from './expensesByYear.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ExpensesByYearComponent
    ],
    exports:[
        ExpensesByYearComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ExpensesByYearModule{

}