import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';

@Injectable({providedIn:'root'})
export class ChartMakerService{

  createYearByYearCategoryLineChart(canvasName:string, priceArray:any,dateArray:any,chartTitle:string){
    const datasets =  [{ 
      data: priceArray,
      fill: true,
      borderColor:"#59BFFF",
      pointHoverBorderColor:"#fff",
      pointRotation:6,
      backgroundColor:"#5CDB95"
    }]
    const labels = dateArray;
    return this._generateChart(canvasName,'line',datasets,labels,false,true,chartTitle);
  }

  createCategoryBasedBarChart(canvasName:string,priceArray:any,dateArray:any,chartTitle:string){
    const datasets =  [{ 
      backgroundColor:"#7395AE",
      barPercentage: 0.9,
      barThickness: 16,
      maxBarThickness: 18,
      minBarLength: 2,
      data: priceArray
  }]
  const labels = dateArray;
  return this._generateChart(canvasName,'bar',datasets,labels,false,true,chartTitle);
  }
    
  createYearExpenseLineChart(canvasName:string,yearsArray:any,expenseArray:any,chartTitle:string){
    const datasets =  [{ 
        data: expenseArray,
        fill: true,
        borderColor:"#59BFFF",
        pointHoverBorderColor:"#fff",
        pointRotation:6,
        backgroundColor:"#5CDB95"
    }]
    const labels = yearsArray;
    return this._generateChart(canvasName,'line',datasets,labels,false,true,chartTitle);
  }

  createTotalDoughnutChart(canvasName:string, inputData:any,chartTitle:string){
    const datasets =  [{ 
        data: inputData,
        backgroundColor: ['#FF6384','#36A2EC','#FFCB9A','#B1A296'],
        fill: true
    }]
    const labels = ['Net Salary','Taxes','Expenses','Investments'];
    return this._generateChart(canvasName,'doughnut',datasets,labels,true,true,chartTitle);
  }

  private _generateChart(canvasName:string,chartType:string,dataSets:any,labels:any,legendDisplay:boolean,toolTips:boolean,chartTitle:string){
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
            fontColor: "#2C3531",
            text: chartTitle
          }
        }
    });
  }
}