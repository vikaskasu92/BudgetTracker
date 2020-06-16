import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { InputDataService } from '../../services/inputData.service';
import { LocalAuthService } from '../../services/auth.service';
import { FirebaseLoginSignupInput } from '../../model/auth/FirebaseLoginSignupInput.model';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { User } from '../../model/auth/user.model';


@Component({
    selector:'app-loginDialog',
    templateUrl:'./loginDialog.component.html',
    styleUrls:['./loginDialog.component.css']
})
export class LoginDialogComponent implements OnInit, AfterViewInit{

    constructor(private inputDataService:InputDataService,
                private matIconRegistry: MatIconRegistry,
                private localAuthService:LocalAuthService,
                private authService: AuthService,
                private router:Router,
                @Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<LoginDialogComponent>,
                private domSanitizer: DomSanitizer){
                    this.matIconRegistry.addSvgIcon("facebook",this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/icons/facebook-icon.svg'));
                    this.matIconRegistry.addSvgIcon("google",this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/google-icon.svg"));
                    this.matIconRegistry.addSvgIcon("apple",this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/apple-icon.svg"));
                }

    firebaseLoginSignUpForm:FormGroup;
    firebaseSingUpForm:FormGroup;
    switchToSignUp:boolean;
    forgotPassword:boolean;
    dataReturn:any[];
    formType:string;
    loginError:boolean = false;
    passwordResetSuccess:boolean = false;
    passwordResetMessage:string;
    isDarkTheme:boolean;
    isDark:boolean;
    @ViewChild('divValue',{static:false}) divValue:ElementRef;

    ngOnInit(){
        if(this.data.switchToSignUp){
            this.formType = "Sign Up"
            this.forgotPassword = false; 
            this.switchToSignUp = true;    
        }else if(this.data.forgotPassword){
            this.formType = "Forgot Password"
            this.forgotPassword = true;  
        }else{
            this.formType = "Login"
            this.forgotPassword = false; 
            this.switchToSignUp = false;
        }
        this.firebaseLoginSignUpForm = this.inputDataService.createFirebaseSignUpLoginForm(this.firebaseLoginSignUpForm);
        this.isDarkTheme = this.data.isDarkTheme;
        this.isDark = this.data.isDark;
    }

    ngAfterViewInit(): void {
        if(this.isDark){
            this.divValue.nativeElement.parentElement.parentElement.style = 'background-color:#303030;';
        }
    }

    onFirebaseLoginOrSignupOrFP(){
        if(this.formType === "Login"){
            this.loginError = false;
            if(this.firebaseLoginSignUpForm.valid){
                this.localAuthService.firebaseLogin(this._formLoginSignUpData()).subscribe( response=>{
                    this.router.navigate(['/newInput']);
                    this.dialogRef.close(true);
                },failure =>{
                    this.loginError = true;
                }); 
            }
        }else if(this.formType === "Sign Up"){
            if(this.firebaseLoginSignUpForm.valid){
                this.localAuthService.firebaseSignUp(this._formLoginSignUpData()).subscribe( response=>{
                    this.dataReturn = [this.firebaseLoginSignUpForm,"firebaseLogin"];
                    this.dialogRef.close(this.dataReturn);
                }, failure =>{
                    this.loginError = true;
                }); 
            }
        }else{
            if(this.firebaseLoginSignUpForm.controls.email.valid){
                this.localAuthService.firebasePasswordReset(this.firebaseLoginSignUpForm.controls.email.value).subscribe( response=>{
                    this.passwordResetMessage = "Password Reset mail has been sent to your email";
                    this.passwordResetSuccess = true;
                    setTimeout(()=>{
                        this.passwordResetSuccess = false;
                        this.dataReturn = [this.firebaseLoginSignUpForm,"firebaseLogin"];
                        this.dialogRef.close(this.dataReturn);
                    },2000);
                }, failure =>{
                    this.passwordResetSuccess = true;
                    this.passwordResetMessage = "please try again with correct email address!";
                }); 
            }
        }
        
    }

    loginWithFacebook(){
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( response =>{
            this.localAuthService.isDemoUser = false;
            this.localAuthService.userId = response.id;
            this.router.navigate(['/newInput']);
            let expirationDate:Date = new Date();
            expirationDate.setHours(expirationDate.getHours() + 5);
            let facebookUser = new User(
                response.email,
                response.id,
                expirationDate,
                response.authToken);
            this.localAuthService.user.next(facebookUser);
            this.localAuthService.isAuthenticated = true;
            localStorage.removeItem('btUserData');
            localStorage.setItem('btUserData',JSON.stringify(facebookUser));
            this.dialogRef.close(true);
        });
    }
    

    forgotPasswordWithFirebase(event:any){
        event.preventDefault();
        this.dataReturn = [this.firebaseLoginSignUpForm,"forgotPassword"];
        this.dialogRef.close(this.dataReturn);
    }

    switchToSignupWithFirebase(event:any){
        event.preventDefault();
        this.dataReturn = [this.firebaseLoginSignUpForm,"signUpWithFirebase"];
        this.dialogRef.close(this.dataReturn);
    }

    switchToForgotPassword(event:any){
        event.preventDefault();
        this.dataReturn = [this.firebaseLoginSignUpForm,"forgotPassword"];
        this.dialogRef.close(this.dataReturn);
    }

    closeLoginForm(){
        this.forgotPassword = false; 
        this.dialogRef.close(false);
    }

    private _formLoginSignUpData():FirebaseLoginSignupInput{
        const loginData:FirebaseLoginSignupInput = 
            {email:this.firebaseLoginSignUpForm.value.email,
            password:this.firebaseLoginSignUpForm.value.password,
            returnSecureToken:true};
        return loginData;
    }

}