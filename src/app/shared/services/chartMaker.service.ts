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
      backgroundColor:"rgba(168, 233, 196, 0.733)"
    }]
    const labels = dateArray;
    return this._generateChartWithTicks(canvasName,'line',datasets,labels,false,true,chartTitle);
  }

  createCategoryBasedBarChart(canvasName:string,priceArray:any,dateArray:any,chartTitle:string){
    const datasets =  [{ 
      backgroundColor:"rgba(168, 233, 196, 0.733)",
      barPercentage: 0.9,
      barThickness: 16,
      maxBarThickness: 18,
      minBarLength: 2,
      data: priceArray
  }]
  const labels = dateArray;
  return this._generateChartWithTicks(canvasName,'bar',datasets,labels,false,true,chartTitle);
  }
    
  createYearExpenseLineChart(canvasName:string,yearsArray:any,expenseArray:any,chartTitle:string){
    const datasets =  [{ 
        data: expenseArray,
        fill: true,
        borderColor:"#76DFDA",
        pointHoverBorderColor:"#fff",
        pointRotation:6,
        backgroundColor:"rgba(168, 233, 196, 0.733)"
    }]
    const labels = yearsArray;
    return this._generateChartWithTicks(canvasName,'line',datasets,labels,false,true,chartTitle);
  }

  createTotalDoughnutChart(canvasName:string, inputData:any,chartTitle:string){
    const datasets =  [{ 
        data: inputData,
        backgroundColor: ['#FF6384','#36A2EC','#FFCB9A'],
        fill: true
    }]
    const labels = ['Net Salary','Expenses','Taxes'];
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
            display: legendDisplay,
            labels: {
              fontColor: '#009788'
            }
          },
          tooltips:{
            enabled:toolTips
          },
          title: {
            display: true,
            fontColor: "#009788",
            fontSize: 15,
            text: chartTitle
          }
        }
    });
  }

  private _generateChartWithTicks(canvasName:string,chartType:string,dataSets:any,labels:any,legendDisplay:boolean,toolTips:boolean,chartTitle:string){
    return new Chart(canvasName, {
      type: chartType,
      data: {
          labels: labels,
          datasets: dataSets
        },
        options: {
          responsive: true,
          legend: {
            display: legendDisplay,
            labels: {
              fontColor: '#009788'
            }
          },
          scales: {
            xAxes: [
              { 
                gridLines: {
                  display: true,
              },
                ticks: {
                  fontColor: "#009788"
                }
            }],
            yAxes: [
              {
                gridLines: {
                  display: true,
              },
              ticks: {
                fontColor: "#009788"
              }
          }]
          },
          tooltips:{
            enabled:toolTips
          },
          title: {
            display: true,
            fontColor: "#009788",
            fontSize: 15,
            text: chartTitle
          }
        }
    });
  }
}