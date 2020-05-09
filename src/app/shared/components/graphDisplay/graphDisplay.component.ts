import { Component, Input } from '@angular/core';

@Component({
    selector:'app-graphDisplay',
    templateUrl:'./graphDisplay.component.html',
    styleUrls:['./graphDisplay.component.css']
})
export class GraphDisplayComponent{

    @Input()chartsRight:number[];
    @Input()chartsLeft:number[];
    @Input()yearOverYear:boolean;
    @Input()summaryExpenseByCategory:boolean;

}