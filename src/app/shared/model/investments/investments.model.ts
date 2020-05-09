export interface IInvestments{
    investments:{
        investmentType:string,
        ticker?:string,
        shares?:number,
        weight?:number,
        avgPrice:number,
        investedPrice:number,
        currentValue:number,
        gainLoss:number
    }
}