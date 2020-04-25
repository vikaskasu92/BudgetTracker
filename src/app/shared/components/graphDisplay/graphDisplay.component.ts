import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector:'app-graphDisplay',
    templateUrl:'./graphDisplay.component.html',
    styleUrls:['./graphDisplay.component.css']
})
export class GraphDisplay implements OnInit{

    @Input()chartsRight:any;
    @Input()chartsLeft:any;

    ngOnInit(): void {
        console.log("chartsRight ",this.chartsRight);
        console.log("chartsLeft ",this.chartsLeft);
    }

}