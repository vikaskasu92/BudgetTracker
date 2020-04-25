import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';

@Injectable({providedIn:'root'})
export class ChartMaker{

  createYearByYearCategoryLineChart(canvasName:string, priceArray:any,dateArray:any,chartTitle:string){
    const datasets =  [{ 
      data: priceArray,
      fill: true,
      borderColor:"blue",
      pointHoverBorderColor:"green",
      pointRotation:6,
      backgroundColor:"greenyellow"
    }]
    const labels = dateArray;
    return this._generateChart(canvasName,priceArray,'line',datasets,labels,false,true,chartTitle);
  }

  createCategoryBasedBarChart(canvasName:string,priceArray:any,dateArray:any,chartTitle:string){
    const datasets =  [{ 
      barPercentage: 0.5,
      barThickness: 6,
      maxBarThickness: 8,
      minBarLength: 2,
      data: priceArray
  }]
  const labels = dateArray;
  return this._generateChart(canvasName,priceArray,'bar',datasets,labels,false,true,chartTitle);
  }
    
  createYearExpenseLineChart(canvasName:string,yearsArray:any,expenseArray:any,chartTitle:string){
    const datasets =  [{ 
        data: expenseArray,
        fill: true,
        borderColor:"blue",
        pointHoverBorderColor:"green",
        pointRotation:6,
        backgroundColor:"greenyellow"
    }]
    const labels = yearsArray;
    return this._generateChart(canvasName,expenseArray,'line',datasets,labels,false,true,chartTitle);
  }

  createTotalDoughnutChart(canvasName:string, inputData:any,chartTitle:string){
    const datasets =  [{ 
        data: inputData,
        backgroundColor: ['green','blue','yellow','orange'],
        fill: true
    }]
    const labels = ['Net Salary','Taxes','Expenses','Investments'];
    return this._generateChart(canvasName,inputData,'doughnut',datasets,labels,true,true,chartTitle);
  }

  private _generateChart(canvasName:string,inputData:any,chartType:string,dataSets:any,labels:any,legendDisplay:boolean,toolTips:boolean,chartTitle:string){
    return new Chart(canvasName, {
      type: chartType,
      data: {
          labels: labels,
          datasets: dataSets
        },
        options: {
          responsive: true,
          legend: {
            display: legendDisplay
          },
          tooltips:{
            enabled:toolTips
          },
          title: {
            display: true,
            text: chartTitle
          }
        }
    });
  }
}