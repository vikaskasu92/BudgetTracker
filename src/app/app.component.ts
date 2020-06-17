import { Component, OnInit, Output } from '@angular/core';
import { LocalAuthService } from './shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService:LocalAuthService,
            private router:Router,private route:ActivatedRoute,
            private common:CommonService){
    this.navLinks = [
      {path:'/newInput',label:'New Input'},
      {path:'/summary',label:'Summary'},
      {path:'/expensesByYear',label:'Expenses By Year'},
      {path:'/loans',label:'Loans'},
      {path:'/rawData',label:'Data'}
    ];
    this.activeLink = this.navLinks[0].path;
  }    
  
  navLinks = [];
  activeLink:string;
  isDarkTheme = this.common.isDarkTheme;
  isAuthenticated:boolean = false;

  ngOnInit(){
    this.checkForAuthentication();
    this.checkAutoLogin();
  }

  tabIndexChanged(tabNumber:number){
    this.activeLink = this.navLinks[tabNumber].path;
  }

  editTabIndexChanged(){
    this.common.tabIndexChangedOnEdit.subscribe( value =>{
      this.activeLink = this.navLinks[value].path;
    });
  }

  checkForAuthentication(){
    this.authService.isAuthenticated.subscribe( value =>{
      this.isAuthenticated = value;
    })
  }

  checkAutoLogin(){
    if(localStorage.getItem('btUserData')){
      let userdata = JSON.parse(localStorage.getItem('btUserData'));
      if(new Date() > userdata._tokenExpirationDate){
          this._addUnAuthoriedData();
      }else{
        this._addAuthenticationData(userdata.email);
          
      }
    }else{
      this.authService.autoLoginAWS().then(response => { 
        if(response.attributes.email === 'budgettracker92@gmail.com'){
         this.authService.userEmail.next('Demo User');
        }
        this._addAuthenticationData(response.attributes.email);
     },reject =>{
      this._addUnAuthoriedData();
     });
    }
  }

  private _addAuthenticationData(email:string){
    setTimeout(()=>{
      this.authService.userEmail.next(email);
    })
      this.authService.userId = email;
       this.isAuthenticated = true; 
       this.activeLink = this.navLinks[0].path;
       this.router.navigate(['/newInput']);
       this.editTabIndexChanged();
  }

  private _addUnAuthoriedData(){
    this.isAuthenticated = false; 
    this.activeLink = this.navLinks[0].path;
    this.router.navigate(['/login']);
  }

}
