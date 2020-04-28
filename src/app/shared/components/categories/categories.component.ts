import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';

@Component({
    selector:'app-categories',
    templateUrl:'./categories.component.html',
    styleUrls:['./categories.component.css']
})
export class CategoriesComponent{

    constructor(private common:CommonService,
                private controlContainer: ControlContainer){}
    
    @Input() parentForm: FormGroup;
    @Input() formInnerControlName1: string;
    @Input() formInnerControlName2: string;
    @Input() isDisabled:boolean;
    @Input() subCategory:any;
    @Output() subCategorySelected = new EventEmitter<string[]>();
    @Output() mainCategorySelected = new EventEmitter<boolean>();
    category:{};

    ngOnInit(){
        this.isDisabled = true;
        this.subCategory = [];
        this.category = Object.values(this.common.category);
        this.parentForm.controls.subCategory.valueChanges.subscribe( value =>{
            let selectedCatValues = [];
            selectedCatValues.push(this.parentForm.value.mainCategory);
            selectedCatValues.push(value);
           this.subCategorySelected.emit(selectedCatValues);
        });
        this.parentForm.controls.mainCategory.valueChanges.subscribe( () =>{
            this.mainCategorySelected.emit(true);
        });
        
    }
}