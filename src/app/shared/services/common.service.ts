import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgForm, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn:"root"})
export class CommonService{

   constructor(private _snackBar: MatSnackBar){}

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

   snackBarOpen(message:string,config:any){
    this._snackBar.open(message, "", config);
   }

   generateSubCategories(purchaseMainCategory:any){
    let subCategory = [];
    for(let i=0; i<Object.keys(this.subCategory).length; i++){
        if((Object.keys(this.subCategory)[i]).split(" ").join("") === purchaseMainCategory){
            subCategory = Object.values(Object.values(this.subCategory)[i]);
            break;
        }
    }
    return subCategory;
   }

    updateDate(date:any,form:FormGroup){
        if(typeof date != "string"){
            let day = this.adjustDigits(date.getDate().toString());
            let month = this.adjustDigits((date.getMonth()+1).toString());
            let year = date.getFullYear().toString();
            form.value.date = year+'-'+month+'-'+day;
        }
    }
    
    adjustDigits(number:string){
        if(number.length == 1){
            return number = "0"+number;
        }
        return number;
    }

    category = {
        "1":"Food",
        "2":"Travel",
        "3":"Legal",
        "4":"Electronics",
        "5":"Home Improvements",
        "6":"Apparel",
        "7":"House Rent",
        "8":"Cosmetic Purchases",
        "9":"BankInterest And Fees",
        "10":"Money Sent Home",
        "11":"Utilities",
        "12":"Entertainment",
        "13":"Car",
        "14":"Gas",
        "15":"Education",
        "16":"Donations",
        "17":"Haircut",
        "18":"Investments",
        "19":"Memberships",
        "20":"Medical",
        "21":"Treat",
        "22":"Stationary And Printing",
        "23":"Shipping",
        "24":"Softwares",
        "25":"Dependant Expenses",
        "26":"Others"
    };
    subCategory = {
        "Food":{"1":"Grocery","2":"Dining Out"},
        "Travel":{ "1":"Flights","2":"Hotels","3":"Car Rental", "4":"Gas","5":"Tourism Fees","6":"Food", "7":"Parking"},
        "Legal":{ "1":"Immigration", "2":"Identification"},
        "Electronics":{ "1":"Phone", "2":"Others" },
        "HomeImprovements":{"1":"Home Improvements" },
        "Apparel":{ "1":"Clothes", "2":"Laundary" },
        "HouseRent":{"1":"House Rent" },
        "CosmeticPurchases":{ "1":"Cosmetic Purchases" },
        "BankInterestAndFees":{"1":"Bank Interest & Fees"},
        "MoneySentHome":{"1":"Money Sent Home"},
        "Utilities":{"1":"Electricity","2":"Heat","3":"Internet"},
        "Entertainment":{"1":"Movies","2":"Others"},
        "Car":{"1":"Service","2":"Wash","3":"Repairs / Parts","4":"Parking"},
        "Gas":{"1":"Personal Car","2":"Rental Car"},
        "Education":{"1":"School Exam Fees","2":"School Tuition Fees","3":"Training Fees","4":"Certification Fees","5":"Books"},
        "Donations":{"1":"Religion Donations","2":"Charitable Donations"},
        "Haircut":{"1":"Haircut"},
        "Investments":{"1":"Shares","2":"Bonds","3":"Gold","4":"Silver","5":"Other Comodities"},
        "Memberships":{"1":"Netflix","2":"Amazon Prime","3":"Costco","4":"Sams","5":"Gym","6":"Other Health Devlopments"},
        "Medical":{"1":"Rx / Medicines","2":"Lab Tests","3":"Docto Fees","4":"Suppliments"},
        "Treat":{"1":"Occasional Treat","2":"Gifts"},
        "StationaryAndPrinting":{"1":"Stationary And Printing"},
        "Shipping":{"1":"Shipping Charges","2":"Shipping Supplies"},
        "Softwares":{"1":"Software Purchase"},
        "DependantExpenses":{"1":"Dependant Expenses"},
        "Others":{"1":"Others"}
    };

    insurances = ['Auto Insurance','Health Insurance','Life Insurance','Home Insurance'];

    loanTypes = ['Auto','Home','Personal','Credit-Card','Business'];

    searchTypes = ['By Input', 'By Input And Date'];

    inputTypes = ['Purchases','Income','Insurance','Loans'];

}