import { Component, OnInit, OnDestroy } from '@angular/core';
import { InputDataService } from '../shared/services/inputData.service';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../shared/dialogs/loginDialog/loginDialog.component';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../shared/model/auth/user.model';

@Component({
    selector:'app-home',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit{ 
      
    constructor(private inputDataService:InputDataService,
        private matDialog:MatDialog,
        private authService:AuthService,
        private router:Router, 
        private route:ActivatedRoute){
            this.navLinks = [{path:'newInput',label:'New Input'},
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
        this.authenticationSubscription = this.authService.user.subscribe( userData =>{
            this.isAuthenticated = !!userData;
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
        localStorage.removeItem('btUserData');
        this.authService.user.next(null);
        this.router.navigate(['/home']);
    }

}