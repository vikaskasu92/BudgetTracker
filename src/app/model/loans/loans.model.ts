export interface ILoans{
    openLoans:{
        loanName:string,
        loanBalance:number,
        principalPaid:number,
        interestPaid:number
    },
    closedLoans?:{
        loanName:string,
        loanBalance:number,
        principalPaid:number,
        interestPaid:number
    }
        
}