import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class TestService{

    testPieSalaryTotal = [211784.66, 51809.56,256920.59, 10000.00];
    testYearlyExpenses = [9384.73,33852.58,18383.70,37708.94,41736.36,62463.66,55575.62,10350.68];
    testCategoryBasedExpenses = [9384.73,33852.58,18383.70,37708.94,41736.36,62463.66,55575.62,10350.68];
    years = [2013,2014,2015,2016,2017,2018,2019,2020];
    investmentShares = [
        {investmentType:'Shares',
        ticker:'TQQQ',
        shares:20,
        avgPrice:45,
        investedPrice:40,
        currentValue:50,
        gainLoss:1000}
    ]
    investmentGold = [
        {investmentType:'Gold',
        weight: 2,
        avgPrice:45,
        investedPrice:40,
        currentValue:50,
        gainLoss:1000}
    ]
    investmentOthers = [
        {investmentType:'Silver',
        weight: 2,
        avgPrice:45,
        investedPrice:40,
        currentValue:50,
        gainLoss:1000}
    ]


}