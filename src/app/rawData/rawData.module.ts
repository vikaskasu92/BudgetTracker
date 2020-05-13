import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RawDataComponent } from './rawData.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations:[
        RawDataComponent
    ],
    exports:[
        RawDataComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class RawDataModule{

}