import { Component } from '@angular/core';
import { InputDataService } from '../shared/services/inputData.service';
import { MatDialog } from '@angular/material';
import { LocalAuthService } from '../shared/services/auth.service';
import { LoginDialogComponent } from '../shared/dialogs/loginDialog/loginDialog.component';
import { Router } from '@angular/router';
import { FirebaseLoginSignupInput } from '../shared/model/auth/FirebaseLoginSignupInput.model';

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent{

    constructor(private inputDataService:InputDataService,
        private matDialog:MatDialog,
        private authService:LocalAuthService,
        private router:Router){}

    loginWithFirebase(userSignUp:boolean,forgotPassword:boolean){
        const data = {switchToSignUp:false,forgotPassword:false};
        userSignUp ? data.switchToSignUp = true : {};
        forgotPassword ? data.forgotPassword = true : {};
        const dialogRef =  this.inputDataService.openDialog(this.matDialog,LoginDialogComponent,data);
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
        const userInputData:FirebaseLoginSignupInput = {
             email:'test@test.com',
             password:'test123',
             returnSecureToken:true
        }
        this.authService.firebaseLogin(userInputData).subscribe( response =>{
            this.router.navigate(['/newInput']);
        });
    }

    logout(){
        localStorage.removeItem('btUserData');
        this.authService.user.next(null);
        this.router.navigate(['/home']);
    }

}