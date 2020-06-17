import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { InputDataService } from '../../services/inputData.service';
import { LocalAuthService } from '../../services/auth.service';

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { User } from '../../model/auth/user.model';
import { AWSCognitoLoginInput } from '../../model/auth/AWSCognitoLoginInput.model';
import { AWSCognitoSignup } from '../../model/auth/AWSCognitoSignup.model';


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

    awsLoginSignUpForm:FormGroup;
    switchToSignUp:boolean;
    forgotPassword:boolean;
    waitingForAuthCode:boolean = false;
    dataReturn:any[];
    formType:string;
    loginError:boolean = false;
    passwordResetSuccess:boolean = false;
    passwordResetMessage:string;
    isDarkTheme:boolean;
    isDark:boolean;
    errorMessage:string;
    confirmPassword:boolean = false;
    passwordResetWithCode:boolean = false;
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
        this.awsLoginSignUpForm = this.inputDataService.createAWSSignUpLoginForm(this.awsLoginSignUpForm);
        this.isDarkTheme = this.data.isDarkTheme;
        this.isDark = this.data.isDark;
    }

    ngAfterViewInit(): void {
        if(this.isDark){
            this.divValue.nativeElement.parentElement.parentElement.style = 'background-color:#303030;';
        }
    }

    onFirebaseLoginOrSignupOrFP(){
        this.loginError = false;
        if(this.formType === "Login"){
            if(this.awsLoginSignUpForm.valid){
                this.errorMessage = '';
                this.localAuthService.awsLogin(this._formLoginData()).then(response =>{
                    this.localAuthService.isAuthenticated.next(true);
                    this.router.navigate(['/newInput']);
                    this.dialogRef.close(true);
                    setTimeout(()=>{
                        if(response.attributes.email === 'budgettracker92@gmail.com'){
                            this.localAuthService.userEmail.next('Demo User');
                        }else{
                            this.localAuthService.userEmail.next(response.attributes.email);
                        }
                        this.localAuthService.userId = response.attributes.email;
                    },0);
                    console.log(response);
                },reject =>{
                    this.loginError = true;
                    this.errorMessage = reject.message;
                    console.log(reject);
                });
            }
        }else if(this.formType === "Sign Up"){
            if(this.awsLoginSignUpForm.valid){
                this.errorMessage = '';
                this.localAuthService.awsSignUp(this._formSignUpData()).then(response =>{
                    this.waitingForAuthCode = true;
                    console.log(response);
                },reject =>{
                    this.loginError = true;
                    this.errorMessage = reject.message;
                    console.log(reject);
                });
                
            }
        }else{
            if(this.awsLoginSignUpForm.controls.email.valid){
                this.errorMessage = '';
                let email = this.awsLoginSignUpForm.value.email;
                    this.localAuthService.awsForgotPassword(email).then(data => {
                        console.log(data)
                        this.passwordResetWithCode = true;
                        this.waitingForAuthCode = true;
                        this.confirmPassword = true;
                    },reject =>{
                        this.loginError = true;
                        this.errorMessage = reject.message;
                        console.log(reject);
                    });
            }
        }
        
    }

    submitNewPasswordForReset(){
        let email = this.awsLoginSignUpForm.value.email;
        let confirmationCode = this.awsLoginSignUpForm.value.confirmationCode;
        let newPassword = this.awsLoginSignUpForm.value.newPassword;
        this.localAuthService.awsForgotPasswordSubmit(email,confirmationCode,newPassword).then(response =>{
            this.waitingForAuthCode = false;
            this.confirmPassword = false;
            this.dataReturn = [this.awsLoginSignUpForm,"firebaseLogin"];
            this.dialogRef.close(this.dataReturn);
            console.log(response);
        },reject =>{
            this.loginError = true;
            this.errorMessage = reject.message;
            console.log(reject);
        });    
    }

    checkAuthCode(){
        this.loginError = false;
        let confirmationCode = this.awsLoginSignUpForm.value.confirmationCode;
        let email = this.awsLoginSignUpForm.value.email;
        this.localAuthService.awsUserConfirm(email,confirmationCode).then(response =>{
            this.dataReturn = [this.awsLoginSignUpForm,"firebaseLogin"];
            this.dialogRef.close(this.dataReturn);
            console.log(response);
        },reject =>{
            this.loginError = true;
            this.errorMessage = reject.message;
            console.log(reject);
        });
    }

    resendAuthCode(){
        this.loginError = false;
        let email = this.awsLoginSignUpForm.value.email;
        this.localAuthService.awsUserReConfirm(email).then(response =>{
            console.log(response);
        },reject =>{
            this.loginError = true;
            this.errorMessage = reject.message;
            console.log(reject);
        });
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
            //this.localAuthService.user.next(facebookUser);
            //this.localAuthService.isAuthenticated = true;
            localStorage.removeItem('btUserData');
            localStorage.setItem('btUserData',JSON.stringify(facebookUser));
            this.dialogRef.close(true);
        });
    }
    

    forgotPasswordWithFirebase(event:any){
        event.preventDefault();
        this.dataReturn = [this.awsLoginSignUpForm,"forgotPassword"];
        this.dialogRef.close(this.dataReturn);
    }

    switchToSignupWithFirebase(event:any){
        event.preventDefault();
        this.dataReturn = [this.awsLoginSignUpForm,"signUpWithFirebase"];
        this.dialogRef.close(this.dataReturn);
    }

    switchToForgotPassword(event:any){
        event.preventDefault();
        this.dataReturn = [this.awsLoginSignUpForm,"forgotPassword"];
        this.dialogRef.close(this.dataReturn);
    }

    closeLoginForm(){
        this.forgotPassword = false; 
        this.dialogRef.close(false);
    }

    private _formLoginData():AWSCognitoLoginInput{
        const loginData:AWSCognitoLoginInput = 
            {email:this.awsLoginSignUpForm.value.email,
            password:this.awsLoginSignUpForm.value.password};
        return loginData;
    }

    private _formSignUpData():AWSCognitoSignup{
        const singUpData:AWSCognitoSignup = 
            {username:this.awsLoginSignUpForm.value.username,
            email:this.awsLoginSignUpForm.value.email,
            password:this.awsLoginSignUpForm.value.password};
        return singUpData;
    }
}