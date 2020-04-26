import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector:'app-graphDisplay',
    templateUrl:'./graphDisplay.component.html',
    styleUrls:['./graphDisplay.component.css']
})
export class GraphDisplay{

    @Input()chartsRight:any;
    @Input()chartsLeft:any;
    @Input()yearOverYear:boolean;
    @Input()summaryExpenseByCategory:boolean;

}