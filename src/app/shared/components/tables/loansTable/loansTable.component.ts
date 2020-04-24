import { Component, Input } from '@angular/core';
import { ILoans } from 'src/app/model/loans/loans.model';
import { IPendingLoansSummary } from 'src/app/model/summary/pendingLoansSummary.model';

@Component({
    selector:'app-loansTable',
    templateUrl:'./loansTable.component.html',
    styleUrls:['./loansTable.component.css']
})
export class LoansTable{

    @Input() openLoans:ILoans;
    @Input() closedLoans:ILoans;

}