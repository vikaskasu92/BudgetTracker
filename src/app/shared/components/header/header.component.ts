import { Component, OnInit } from '@angular/core';
import { LocalAuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit{

    constructor(private authService:LocalAuthService,
                private router:Router){}
    
    userName:string;

    ngOnInit(){
        this.authService.user.subscribe(user =>{
            if(user){
                this.userName = user.email;
            }
        });
    }

    logout(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}