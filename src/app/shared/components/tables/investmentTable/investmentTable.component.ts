import { Component, Input, OnInit } from '@angular/core';
import { IInvestments } from 'src/app/model/investments/investments.model';

@Component({
    selector:'app-investmentTables',
    templateUrl:'./investmentTable.component.html',
    styleUrls:['./investmentTable.component.css']
})
export class InvestmentTable{

    @Input('investments') investments:IInvestments;
    @Input('investmentType') investmentType:string;

}