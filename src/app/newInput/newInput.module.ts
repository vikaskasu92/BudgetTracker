import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NewInputComponent } from './newInput.component';
import { NewPurchaseComponent } from './newPurchase/newPurchase.component';
import { NewIncomeComponent } from './newIncome/newIncome.component';
import { NewInsuranceComponent } from './newInsurance/newInsurance.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        NewInputComponent,
        NewPurchaseComponent,
        NewIncomeComponent,
        NewInsuranceComponent
    ],
    exports:[
        NewInputComponent,
        NewPurchaseComponent,
        NewIncomeComponent,
        NewInsuranceComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ]
})
export class NewInputModule{

}