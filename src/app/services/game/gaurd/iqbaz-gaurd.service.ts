import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IqbazGaurdService {

  token:string = '';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object){
    if(isPlatformBrowser(this.platformId)){
      this.token = localStorage.getItem('userToken');
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let letVisit:boolean = false;
    if(!this.token){
      letVisit = false;
      this.router.navigate(['game/IqBaz/login']);
    }
    else{
      if(this.token == ''){
        letVisit = false;
        this.router.navigate(['game/IqBaz/login']);
      }
      else{
        letVisit = true;
      }
    }
    return letVisit;
  }//end canActivate

}
