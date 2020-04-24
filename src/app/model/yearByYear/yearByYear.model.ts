export interface IYearByYearExpense{
    subCategoryData:{
        subCategoryNumber:number,
        subCategoryName:string,
        monthOverMonthExpense:{
            month:number
            expense:number
        }
    }
}