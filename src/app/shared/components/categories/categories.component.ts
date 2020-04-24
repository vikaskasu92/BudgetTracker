import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonData } from '../../services/commonData.service';
import { InternalCommunicationService } from '../../services/internalCommunication.service';

@Component({
    selector:'app-categories',
    templateUrl:'./categories.component.html',
    styleUrls:['./categories.component.css']
})
export class Categories{
    
    isDisabled:boolean = true;
    category:{};
    subCategory:{};
    @ViewChild('purchaseMainCategory',{static:true}) purchaseMainCategory:any;
    @ViewChild('purchaseSubCategory',{static:true}) purchaseSubCategory:any;
    @Output() onSelectingCategories = new EventEmitter<any>();
    @Output() onMainCategorySelected = new EventEmitter<boolean>();
    catValues = [];

    constructor(private commonData:CommonData,
        private intComm:InternalCommunicationService){}

    ngOnInit(){
        this.category = Object.values(this.commonData.category);
    }

    purchaseSubCategorySelected(){
        this.catValues.push(this.purchaseMainCategory.value);
        this.catValues.push(this.purchaseSubCategory.value);
        this.onSelectingCategories.emit(this.catValues);
    }

    purchaseMainCategorySelected(){
        this.onMainCategorySelected.emit(true);
        if(this.purchaseMainCategory.value != "" && this.purchaseMainCategory.value != undefined){
            this.isDisabled = false;
            this.subCategory = this.intComm.generateSubCategories(this.subCategory,this.commonData,this.purchaseMainCategory);
        }
    }


}