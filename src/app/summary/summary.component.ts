import { Component, OnInit } from '@angular/core';
import { DataRetrieval } from '../shared/services/dataRetrieval.service';

@Component({
    selector:'app-summary',
    templateUrl:'./summary.component.html',
    styleUrls:['./summary.component.css']
})
export class Summary implements OnInit{

    constructor(private dataRetrieval:DataRetrieval){}

    startYear:string;
    endYear:string;

    ngOnInit() {
        this.dataRetrieval.getAllYearsForCustomers().subscribe(response=>{
            this.startYear = response[0];
            this.endYear = response[response["length"]-1];
        });
    }

}