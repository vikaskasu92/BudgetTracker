import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalAuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit{

    constructor(private authService:LocalAuthService,
                private router:Router,
                private route:ActivatedRoute,
                private common:CommonService){}
    
    userEmail:any;
    checkedDarkMode:boolean = this.common.checkedDarkMode;
    isDarkTheme = this.common.isDarkTheme;
    @Output()tabIndex = new EventEmitter<number>();

    ngOnInit(){
        this.checkUserPrefernces();
    }

    checkUserPrefernces(){
        if(JSON.parse(localStorage.getItem('darkMode')) != null && JSON.parse(localStorage.getItem('darkMode'))){
            this.checkedDarkMode = true;
            this.common.checkedDarkMode = true;
            this.common.darkTheme.next(true);
        }else if(JSON.parse(localStorage.getItem('darkMode')) != null && !JSON.parse(localStorage.getItem('darkMode'))){
            this.checkedDarkMode = false;
            this.common.checkedDarkMode = false;
            this.common.darkTheme.next(false);
        }
        if(JSON.parse(localStorage.getItem('darkMode')) === null){
            this.isDarkTheme = this.common.isDarkTheme;
        }
        this.authService.userEmail.subscribe(value =>{
            if(value === 'budgettracker92@gmail.com'){
                this.userEmail = 'Demo User'
            }else{
                this.userEmail = value;
            }
        });
    }

    tabClick(tabName:any){
        let index:number = 0;
        for(let i=0; i<5; i++){
            if(Object.keys(this.common.tabs)[i] === tabName.substring(1)){
                index = Object.values(this.common.tabs)[i];
            }
        }
        this.tabIndex.emit(index);
        this.router.navigate([tabName]);
    }

    toggleDarkTheme(checked : boolean){
        this.checkedDarkMode = checked;
        this.common.checkedDarkMode = checked;
        this.common.setDarkTheme(checked);
        localStorage.setItem('darkMode',JSON.stringify(checked));
    }

    logout(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}