import { Component } from '@angular/core';
import { InputDataService } from '../shared/services/inputData.service';
import { MatDialog } from '@angular/material';
import { LocalAuthService } from '../shared/services/auth.service';
import { LoginDialogComponent } from '../shared/dialogs/loginDialog/loginDialog.component';
import { Router } from '@angular/router';
import { CommonService } from '../shared/services/common.service';

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent{

    constructor(private inputDataService:InputDataService,
        private matDialog:MatDialog,
        private authService:LocalAuthService,
        private router:Router,
        private common:CommonService){}

    loginWithFirebase(userSignUp:boolean,forgotPassword:boolean){
        const data = {switchToSignUp:false,forgotPassword:false,isDarkTheme:this.common.isDarkTheme,isDark:this.common.checkedDarkMode};
        userSignUp ? data.switchToSignUp = true : {};
        forgotPassword ? data.forgotPassword = true : {};
        const dialogRef =  this.inputDataService.openLoginDialog(this.matDialog,LoginDialogComponent,data);
        dialogRef.afterClosed().subscribe( loginFormData =>{
            if(loginFormData != undefined){
                switch(loginFormData[1]){
                    case "firebaseLogin":{
                        return this.loginWithFirebase(false,false);
                    }
                    case "forgotPassword":{
                        return this.loginWithFirebase(false,true);
                    }
                    case "signUpWithFirebase":{
                        return this.loginWithFirebase(true,false);
                    }
                }
            }else{
                this.loginWithFirebase(true,false);
            }
        });
    }

    demoLogin(){
        const userInputData:any = {
             email:'budgettracker92@gmail.com',
             password:'test1234'
        }
        this.authService.awsLogin(userInputData).then(response =>{
            this.authService.isAuthenticated.next(true);
            this.router.navigate(['/newInput']);
            setTimeout(()=>{
                this.authService.userEmail.next('Demo User');
                this.authService.userId = response.attributes.email;
            },0);
        },reject =>{
            console.log(reject);
        });
    }

    logout(){
        localStorage.removeItem('btUserData');
       // this.authService.user.next(null);
        this.router.navigate(['/home']);
    }

}