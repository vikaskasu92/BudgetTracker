import { Component } from '@angular/core';
import { LocalAuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent{

    constructor(private authService:LocalAuthService,
                private router:Router){}
    

    logout(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}