import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FirebaseAuthSuccess } from '../model/auth/firebaseAuthSuccess.model'
import { FirebaseLoginSignupInput } from '../model/auth/FirebaseLoginSignupInput.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/auth/user.model';

@Injectable({providedIn:'root'})
export class LocalAuthService{
    
    constructor(private http:HttpClient){}

    isAuthenticated:boolean;
    userId:string;
    user = new BehaviorSubject<User>(null);
    userFirebaseLogin = {}
    isDemoUser:boolean;

    firebaseSignUp(userInputData:FirebaseLoginSignupInput){
        return this.http.post<FirebaseAuthSuccess>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgYHOtRUnryp7MUCPVKU17FKzNVLNnHKs",userInputData); 
    }

    firebaseLogin(userInputData:FirebaseLoginSignupInput){
        this.isDemoUser = false;
       return this.http.post<FirebaseAuthSuccess>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgYHOtRUnryp7MUCPVKU17FKzNVLNnHKs",userInputData).pipe(
           tap( response => {
                const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
                const user = new User(
                    response.email,response.localId,
                    expirationDate,response.idToken);
                localStorage.setItem('btUserData',JSON.stringify(user));
                this._triggerUserAfterAuthentication(user);
            })
       );
    }

    autoLogin(){
        this.isDemoUser = false;
        const userData = JSON.parse(localStorage.getItem('btUserData'));
        if(!userData){
            this.user.next(null);
            return false;
        }
        const loadedUser = new User(
            userData.email,
            userData.userId,
            new Date(userData._tokenExpirationDate),
            userData._idToken);
        if(loadedUser.idToken){
            this._triggerUserAfterAuthentication(loadedUser);
            return true;
        }
    }

    firebasePasswordReset(email:string){
        const inputData = {
            requestType:"PASSWORD_RESET",
            email:email
        }
        return this.http.post<any>("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCgYHOtRUnryp7MUCPVKU17FKzNVLNnHKs",inputData);
    }

    logout(){
        localStorage.removeItem('btUserData');
        this.userId = "";
        this.user.next(null);
    }

    private _checkForDemoEmail(user:any){
        if(user.email === "test@test.com"){
            this.isDemoUser = true;
            user.email = "Demo User";
        }
    }

    private _triggerUserAfterAuthentication(user:any){
        this.isAuthenticated = true;
        this.userId = user.userId;
        this._checkForDemoEmail(user);
        this.user.next(user);
    }

}