import { OpenLoansModel } from './openLoan.model';
import { ClosedLoansModel } from './closedLoan.model';

export interface ILoans extends Array<OpenLoansModel>, Array<ClosedLoansModel>{
    
}