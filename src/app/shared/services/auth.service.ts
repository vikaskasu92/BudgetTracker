import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FirebaseAuthSuccess } from '../model/auth/firebaseAuthSuccess.model'
import { FirebaseLoginSignupInput } from '../model/auth/FirebaseLoginSignupInput.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthService{
    
    constructor(private http:HttpClient){}

    isAuthenticated = new BehaviorSubject<boolean>(null);
    userAuthenitcated:boolean = false;
    userFirebaseLogin = {}

    userInputData = {email:'test',password:'test',returnSecureToken:true};

    firebaseSignUp(userInputData:FirebaseLoginSignupInput){
        return this.http.post<FirebaseAuthSuccess>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWfYRyaAfJUwnF7lyqcIMHln_0VW0AG1M",userInputData); 
    }

    firebaseLogin(userInputData:FirebaseLoginSignupInput){
       return this.http.post<FirebaseAuthSuccess>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWfYRyaAfJUwnF7lyqcIMHln_0VW0AG1M",userInputData).pipe(
           tap( response => {
            this.userAuthenitcated = true;   
            this.isAuthenticated.next(true)})
       );
    }

}