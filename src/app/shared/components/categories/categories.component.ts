import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';

@Component({
    selector:'app-categories',
    templateUrl:'./categories.component.html',
    styleUrls:['./categories.component.css']
})
export class CategoriesComponent{

    constructor(private common:CommonService){}
    
    @Input() parentForm: FormGroup;
    @Input() subCategory:string[];
    @Output() subCategorySelected = new EventEmitter<string[]>();
    @Output() mainCategorySelected = new EventEmitter<boolean>();
    category:{};

    ngOnInit(){
        this.category = Object.values(this.common.category);
        this._mainCategorySubscription();
        this._subCategorySubscription();
        Object.keys(this.subCategory).length === 0 ? this.subCategory = [] : '';
    }

    private _subCategorySubscription(){
        this.parentForm.controls.subCategory.valueChanges.subscribe( value =>{
            let selectedCatValues = [];
            selectedCatValues.push(this.parentForm.value.mainCategory);
            selectedCatValues.push(value);
           this.subCategorySelected.emit(selectedCatValues);
        });
    }

    private _mainCategorySubscription(){
        this.parentForm.controls.mainCategory.valueChanges.subscribe( () =>{
            this.mainCategorySelected.emit(true);
        });
    }
}