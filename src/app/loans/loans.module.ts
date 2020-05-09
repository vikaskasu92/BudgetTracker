import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoansComponent } from './loans.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations:[
        LoansComponent
    ],
    exports:[
        LoansComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class LoansModule{

}