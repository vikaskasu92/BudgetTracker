import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  AWSCognitoLoginInput } from '../model/auth/AWSCognitoLoginInput.model';
import { BehaviorSubject, Subject } from 'rxjs';

import { Auth } from 'aws-amplify';
import { AWSCognitoSignup } from '../model/auth/AWSCognitoSignup.model';

@Injectable({providedIn:'root'})
export class LocalAuthService{
    
    constructor(private http:HttpClient){}

    userId:string;
    userEmail = new Subject<string>();
    isAuthenticated = new BehaviorSubject<boolean>(null);
    userFirebaseLogin = {}
    isDemoUser:boolean;

    awsLogin(userInputData:AWSCognitoLoginInput){
        try {
            return Auth.signIn(userInputData.email, userInputData.password);
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    awsSignUp(userInputData:AWSCognitoSignup) {
        try {
            return Auth.signUp({username:userInputData.email,
                password:userInputData.password,
            attributes: {
                email:userInputData.email
            }
        });
    } catch (error) {
        console.log('error signing up:', error);
    }
}

    awsUserConfirm(username:string,code:string){
        try {
            return Auth.confirmSignUp(username, code);
          } catch (error) {
              console.log('error confirming sign up', error);
          }
    }

    awsUserReConfirm(username:string){
        try {
            return Auth.resendSignUp(username);
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    awsFacebookLogin(){
        //return Auth.federatedSignIn({provider: 'Facebook'});
        //return Auth.federatedSignIn({provider: 'Facebook'}).
    }
    
    awsForgotPassword(username:string){
        return Auth.forgotPassword(username);
    }

    awsForgotPasswordSubmit(username:string,code:string,newPassword:string){
        return Auth.forgotPasswordSubmit(username, code, newPassword);
    }


    autoLoginAWS(){
        this.isAuthenticated.next(true);
        return Auth.currentAuthenticatedUser();
    }

    logout(){
        this.userEmail.next("");
        this.isAuthenticated.next(false);
        localStorage.removeItem('btUserData');
        try {
             Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

}