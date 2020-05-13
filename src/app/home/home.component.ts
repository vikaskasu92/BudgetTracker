import { Component, OnInit, OnDestroy } from '@angular/core';
import { InputDataService } from '../shared/services/inputData.service';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../shared/dialogs/loginDialog/loginDialog.component';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector:'app-home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit{ 
      
    constructor(private inputDataService:InputDataService,
        private matDialog:MatDialog,
        private authService:AuthService,
        private router:Router){
            this.navLinks = [{path:'/newInput',label:'Home'},
            {path:'summary',label:'Summary'},
            {path:'expensesByYear',label:'Expenses By Year'},
            {path:'loans',label:'Loans'},
            {path:'rawData',label:'Data'}];
            this.activeLink = this.navLinks[0].path;
    }    

    navLinks = [];
    activeLink:string;
    isAuthenticated:boolean;
    authenticationSubscription:Subscription;

    ngOnInit(){
        this.checkOnAuthenticatedUser();
    }

    checkOnAuthenticatedUser(){
        this.authenticationSubscription = this.authService.isAuthenticated.subscribe( authenticated =>{
            this.isAuthenticated = authenticated;
        });
    }

    loginWithFirebase(userSignUp:boolean){
        const data = {switchToSignUp:false};
        userSignUp ? data.switchToSignUp = true : {};
        const dialogRef =  this.inputDataService.openDialog(this.matDialog,LoginDialogComponent,data);
        dialogRef.afterClosed().subscribe( loginFormData =>{
            if(loginFormData != undefined){
                switch(loginFormData[1]){
                    case "firebaseLogin":{
                        return this.loginWithFirebase(false);
                    }
                    case "forgotPassword":{
                        console.log("Forgot Password with Firebase");
                        break;
                    }
                    case "signUpWithFirebase":{
                        return this.loginWithFirebase(true);
                    }
                }
            }else{
                this.loginWithFirebase(true);
            }
        });
    }

    logout(){
        this.authService.userAuthenitcated = false;
        localStorage.removeItem('btUserData');
        this.authService.isAuthenticated.next(false);
        this.router.navigate(['/home'])
    }

}