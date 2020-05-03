import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
    selector:'app-editRawData',
    templateUrl:'./editRawData.component.html',
    styleUrls:['./editRawData.component.css']
})
export class EditRawDataComponent implements OnInit{

    constructor(public dialogRef: MatDialogRef<EditRawDataComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private common:CommonService){}

    purchaseForm:FormGroup;
    selected:string;
    category:any;
    subCategory:any;

    ngOnInit(): void {
        this.category = Object.values(this.common.category);
        this.purchaseForm = new FormGroup({
            'item': new FormControl(this.data.item),
            'cost' : new FormControl(this.data.cost),
            'mainCategory' : new FormControl(this.data.mainCategory),
            'subCategory' : new FormControl(this.data.subCategory),
            'date': new FormControl(this.data.date)
        })
        this.selected = this.data.mainCategory;
    }

    confirmClosing(){
    this.dialogRef.close(true);
    }
    
    cancelConfirm(){
    this.dialogRef.close(false);
    }

}