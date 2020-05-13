import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FirebaseAuthSuccess } from '../model/auth/firebaseAuthSuccess.model'
import { FirebaseLoginSignupInput } from '../model/auth/FirebaseLoginSignupInput.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/auth/user.model';

@Injectable({providedIn:'root'})
export class AuthService{
    
    constructor(private http:HttpClient){}

    isAuthenticated:boolean;
    user = new BehaviorSubject<User>(null);
    userFirebaseLogin = {}

    firebaseSignUp(userInputData:FirebaseLoginSignupInput){
        return this.http.post<FirebaseAuthSuccess>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWfYRyaAfJUwnF7lyqcIMHln_0VW0AG1M",userInputData); 
    }

    firebaseLogin(userInputData:FirebaseLoginSignupInput){
       return this.http.post<FirebaseAuthSuccess>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWfYRyaAfJUwnF7lyqcIMHln_0VW0AG1M",userInputData).pipe(
           tap( response => {
                const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
                const user = new User(
                    response.email,response.localId,
                    expirationDate,response.idToken);
                localStorage.setItem('btUserData',JSON.stringify(user));
                this.isAuthenticated = true;
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
            this.user.next(loadedUser);
            return true;
        }
    }

    logout(){
        localStorage.removeItem('btUserData');
        this.user.next(null);
    }

}