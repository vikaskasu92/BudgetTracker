import { Component, Input } from '@angular/core';

@Component({
    selector:'app-graphDisplay',
    templateUrl:'./graphDisplay.component.html',
    styleUrls:['./graphDisplay.component.css']
})
export class GraphDisplay{

    @Input()chartsRight:any;
    @Input()chartsLeft:any;

}