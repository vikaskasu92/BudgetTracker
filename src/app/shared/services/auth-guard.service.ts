import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalAuthService } from './auth.service';
import { Auth } from 'aws-amplify';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authService:LocalAuthService,
                private router:Router){}

    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean> | Promise<boolean> {
        if(localStorage.getItem('btUserData')){
            let userdata = JSON.parse(localStorage.getItem('btUserData'));
            if(new Date() > userdata._tokenExpirationDate){
                return false;
            }else{
                return true;
            }
        }else{
            return this.authService.autoLoginAWS().then(() => { 
                return true; 
            }).catch(() => {
              this.router.navigate(['/login']);
              return false;
            });
        }
    }


}