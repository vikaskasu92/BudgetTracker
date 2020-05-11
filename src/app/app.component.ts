import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BudgetTracker';
  navLinks = [];
  activeLink:string;

  constructor(){
    this.navLinks = [{path:'/',label:'Home'},
    {path:'summary',label:'Summary'},
    {path:'expensesByYear',label:'Expenses By Year'},
    {path:'loans',label:'Loans'},
    {path:'rawData',label:'Data'}];
    this.activeLink = this.navLinks[0].path;
  }
  
}
