import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputDataService } from '../../services/inputData.service';
import { MatIconRegistry, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { FirebaseLoginSignupInput } from '../../model/auth/FirebaseLoginSignupInput.model';
import { Router } from '@angular/router';

@Component({
    selector:'app-loginDialog',
    templateUrl:'./loginDialog.component.html',
    styleUrls:['./loginDialog.component.css']
})
export class LoginDialogComponent implements OnInit{

    constructor(private inputDataService:InputDataService,
                private matIconRegistry: MatIconRegistry,
                private authService:AuthService,
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
    dataReturn:any[];
    formType:string;

    ngOnInit(){
        if(!this.data.switchToSignUp){
            this.formType = "Login"
            this.switchToSignUp = false;
        }else{
            this.formType = "Sign Up"
            this.switchToSignUp = true;  
        }
        this.firebaseLoginSignUpForm = this.inputDataService.createFirebaseSignUpLoginForm(this.firebaseLoginSignUpForm);
    }

    onFirebaseLoginOrSignup(){
        if(this.formType === "Login"){
            if(this.firebaseLoginSignUpForm.valid){
                this.authService.firebaseLogin(this._formLoginSignUpData()).subscribe( response=>{
                   this.router.navigate(['/newInput']);
                    this.dialogRef.close(true);
                }); 
            }
        }else{
            if(this.firebaseLoginSignUpForm.valid){
                this.authService.firebaseSignUp(this._formLoginSignUpData()).subscribe( response=>{
                    this.dataReturn = [this.firebaseLoginSignUpForm,"firebaseLogin"];
                    this.dialogRef.close(this.dataReturn);
                }); 
            }
        }
        
    }

    private _formLoginSignUpData():FirebaseLoginSignupInput{
        const loginData:FirebaseLoginSignupInput = 
            {email:this.firebaseLoginSignUpForm.value.email,
            password:this.firebaseLoginSignUpForm.value.password,
            returnSecureToken:true};
        return loginData;
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

    closeLoginForm(){
        this.dialogRef.close(false);
    }

}