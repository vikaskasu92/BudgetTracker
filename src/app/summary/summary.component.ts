import { Component, OnInit } from '@angular/core';
import { DataRetrievalService } from '../shared/services/dataRetrieval.service';

@Component({
    selector:'app-summary',
    templateUrl:'./summary.component.html',
    styleUrls:['./summary.component.css']
})
export class SummaryComponent implements OnInit{

    constructor(private dataRetrieval:DataRetrievalService){}

    startYear:string;
    endYear:string;
    yearsDataRecieved= false;

    ngOnInit() {
        this.dataRetrieval.getAllYearsForCustomers().subscribe(response=>{
            this.yearsDataRecieved = true;
            this.startYear = response[0];
            this.endYear = response[response["length"]-1];
        });
    }

}