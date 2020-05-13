import { Component } from '@angular/core';
import { InputDataService } from '../shared/services/inputData.service';
import { MatDialog } from '@angular/material';
import { AuthService } from '../shared/services/auth.service';
import { LoginDialogComponent } from '../shared/dialogs/loginDialog/loginDialog.component';
import { Router } from '@angular/router';

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})
export class LoginComponent{

    constructor(private inputDataService:InputDataService,
        private matDialog:MatDialog,
        private authService:AuthService,
        private router:Router){}

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