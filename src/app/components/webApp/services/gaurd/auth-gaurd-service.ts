import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { StorageService } from "../../../../services/storage/storage.service";
import { SharedService } from "../../../../services/shared/shared.service";


@Injectable({
    providedIn: 'root'
})

export class AuthGaurdService implements CanActivate{

    constructor(private router: Router, private storage: StorageService, private shared:SharedService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
       let stn = this.shared.stepNumber.getValue() - 1;
       //console.log("---- shared.stepNumber: " + stn);
       if(stn <= 0){
           this.shared.isBack = true;
           //console.log("shared.isBack1"+this.shared.isBack);
           return true;
       }
       else if(stn == 2 && (this.shared.category2 == null || this.shared.category2 == undefined)){
           this.shared.stepNumber.next(1);
           this.shared.category2 = null;
           return this.shared.isBack;
       }
       else{
            this.shared.stepNumber.next(stn);
            //console.log("shared.isBack2"+this.shared.isBack);
            return this.shared.isBack;
       }
    }
}