import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonData } from 'src/app/shared/services/commonData.service';

@Injectable({providedIn:"root"})
export class InternalCommunicationService{

   constructor(private _snackBar: MatSnackBar,private commonData:CommonData){}

   private expansionPanel = new BehaviorSubject("purchasesAndInvestments");
   currentExpansionPanel = this.expansionPanel.asObservable();

   onExpansionPanelClick(expansionPanelName:string){
       this.expansionPanel.next(expansionPanelName);
   }

   expansionPanelDecision(currentExpansionPanel:string,desiredPanelName:string,openPanel:boolean){
        if(currentExpansionPanel !=desiredPanelName){
            return openPanel = false;
        }else{
            return openPanel = true;
        }
   }

   snackBarOpen(message:string){
    this._snackBar.open(message, "", {
        duration: 3000
      });
   }

   generateSubCategories(subCategory:{},commonData:CommonData,purchaseMainCategory:any){
    for(let i=1; i<=Object.keys(commonData.subCategory).length; i++){
        if((Object.keys(commonData.subCategory)[i]).split(" ").join("") === purchaseMainCategory.value){
            subCategory = Object.values(Object.values(commonData.subCategory)[i]);
            break;
        }
    }
    return subCategory;
   }

   datePickerCalled(form:NgForm,dateErrorMessage:string){
        if(form.value.date === ""){
            dateErrorMessage = "Date is a Required Field!";
        }else{
            dateErrorMessage = "Please enter a valid date!";
        }
    }



}