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

    firebaseSignUp(userInputData:FirebaseLoginSignupInput){
        return this.http.post<FirebaseAuthSuccess>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgYHOtRUnryp7MUCPVKU17FKzNVLNnHKs",userInputData); 
    }

    firebaseLogin(userInputData:FirebaseLoginSignupInput){
       return this.http.post<FirebaseAuthSuccess>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgYHOtRUnryp7MUCPVKU17FKzNVLNnHKs",userInputData).pipe(
           tap( response => {
                const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
                const user = new User(
                    response.email,response.localId,
                    expirationDate,response.idToken);
                localStorage.setItem('btUserData',JSON.stringify(user));
                this.isAuthenticated = true;
                this.userId = response.localId;
                if(user.email === 'test@test.com'){
                    user.email = 'Demo User'
                }
                this.user.next(user);
            })
       );
    }

      autoLogin(){
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
            this.isAuthenticated = true;
            this.userId = loadedUser.userId ;
            if(loadedUser.email === 'test@test.com'){
                loadedUser.email = 'Demo User'
            }
            this.user.next(loadedUser);
            return true;
        }
    }

    logout(){
        localStorage.removeItem('btUserData');
        this.userId = "";
        this.user.next(null);
    }

}