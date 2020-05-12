import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BudgetTracker';
  navLinks = [];
  activeLink:string;
  isAuthenticated:boolean;

  constructor(){
    this.navLinks = [{path:'/',label:'Home'},
    {path:'summary',label:'Summary'},
    {path:'expensesByYear',label:'Expenses By Year'},
    {path:'loans',label:'Loans'},
    {path:'rawData',label:'Data'}];
    this.activeLink = this.navLinks[0].path;
  }

  ngOnInit(){
    this.isAuthenticated = false;
  }

}
