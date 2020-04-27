import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:'app-categories',
    templateUrl:'./categories.component.html',
    styleUrls:['./categories.component.css']
})
export class CategoriesComponent{

    constructor(private common:CommonService){}
    
    isDisabled:boolean = true;
    category:{};
    subCategory:{};
    @ViewChild('purchaseMainCategory',{static:true}) purchaseMainCategory:any;
    @ViewChild('purchaseSubCategory',{static:true}) purchaseSubCategory:any;
    @Output() onSelectingCategories = new EventEmitter<any>();
    @Output() onMainCategorySelected = new EventEmitter<boolean>();
    catValues = [];
    selectedCategory = "Food";

    ngOnInit(){
        this.category = Object.values(this.common.category);
    }

    purchaseSubCategorySelected(){
        this.catValues = [];
        this.catValues.push(this.purchaseMainCategory.value);
        this.catValues.push(this.purchaseSubCategory.value);
        this.onSelectingCategories.emit(this.catValues);
    }

    purchaseMainCategorySelected(){
        this.onMainCategorySelected.emit(true);
        if(this.purchaseMainCategory.value != "" && this.purchaseMainCategory.value != undefined){
            this.isDisabled = false;
            this.subCategory = this.common.generateSubCategories(this.subCategory,this.purchaseMainCategory);
        }
    }
}