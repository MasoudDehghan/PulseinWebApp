import { Links } from './../../class/links';
import { CustomFunctionsService } from './../../../services/functions/custom-functions.service';
import { BasicDataService } from './../../../services/basicData/basic-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from './../../../services/storage/storage.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';
import { EnumUrls } from '../../webApp/enum/enumUrls.enum';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { EnumConstData } from '../../enum/constData.enum';
import { UrlRest } from '../../class/urlRest.class';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-drawer-menu',
  templateUrl: './drawer-menu.component.html',
  styleUrls: ['./drawer-menu.component.css']
})
export class DrawerMenuComponent implements OnInit {

  showMenu:boolean = false;
  categories1: JobCategory1V[] = [];
  //categories2: Array<JobCategory2V[]> = [];
  //categories3: Array<JobCategory3V[]> = [];
  isProfileImage: boolean = false;
  userName:string = '';
  profileImageAddress: string = '';
  userCredit:string = '';
  inviteMsg: string = '';
  userToken:string = '';
  showBtnRegisterRequest:boolean = false;
  showBtnCurrentRequest:boolean = false;
  pathName: string = '';
  blogUrl: string = '';

  constructor(public shared: SharedService, 
    private router: Router,
    public basicData: BasicDataService,
    private urlRest: UrlRest,
    private customFunc: CustomFunctionsService,
    public storage: StorageService,
    private activeRoute: ActivatedRoute,
    private links: Links,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.blogUrl = this.links.blogLink;
    if (isPlatformBrowser(this.platformId)){
      this.activeRoute.url.subscribe(res =>{
        this.pathName = window.location.pathname;
        if(this.pathName == EnumUrls.address_WebappCurrentRequest || this.pathName == EnumUrls.address_WebappRequestRegister){
          this.showBtnCurrentRequest = false;
          this.showBtnRegisterRequest = false;
        }
        else{
          this.showBtnCurrentRequest = true;
          this.showBtnRegisterRequest = true;
        }
      });
    }

    this.basicData.setCategories.subscribe(resSetCategories => {
      if(resSetCategories){
        this.categories1 = this.basicData.categories1;
        //this.categories2 = this.basicData.categories2;
        //this.categories3 = this.basicData.categories3;
      }
    }); 

    this.storage.subject_userDataLogin.subscribe(data => {
      //console.log("****---- header Mobile global subscribe user data ******");
      if(data){
        //console.log(data);
        this.storage.userDataLogin = data;
        if(data.user){
          if(data.user.credit){
            this.storage.userCredit.next(data.user.credit);
          }
          this.userName = this.storage.userDataLogin.user.personalData.firstName + " " + this.storage.userDataLogin.user.personalData.lastName;
          if(this.storage.userDataLogin.user.personalData.photo == EnumConstData.profileImageEmpty){
            this.isProfileImage = false;
          }
          else{
            this.isProfileImage = true;
            this.profileImageAddress = this.urlRest.imagePath + this.storage.userDataLogin.user.personalData.photo;
          }
        }
        if(this.storage.userDataLogin.inviteLink){
          this.inviteMsg = this.storage.userDataLogin.inviteLink;
        }
        if(this.storage.userDataLogin.inProgressRequests){
          if(this.storage.userDataLogin.inProgressRequests.length > 0){
            this.shared.hasActiveRequest.next(true);
            this.shared.showModalFolloweRequest.next(true);
          }
          else{
            this.shared.hasActiveRequest.next(false);
          }
        }
        else{
          this.shared.hasActiveRequest.next(false);
        }
      }
    });

    this.storage.userCredit.subscribe(res => {
      if(res == -1){
        if(this.storage.userDataLogin){
          if(this.storage.userDataLogin.user){
            if(this.storage.userDataLogin.user.credit){
              this.userCredit = this.customFunc.chanageNumbersToFarsi(this.storage.userDataLogin.user.credit.toString());
              this.userCredit = this.customFunc.formatAmountMoney(this.userCredit);
              this.userCredit = this.userCredit + " تومان";
            }
          }
        }
      }
      else{
        this.userCredit = this.customFunc.chanageNumbersToFarsi(res.toString());
        this.userCredit = this.customFunc.formatAmountMoney(this.userCredit);
        this.userCredit = this.userCredit + " تومان";
      }
    });
  }//end ngOnInit

  onclickMenu(){
    this.showMenu = !this.showMenu;
    if(this.showMenu){
      this.shared.noScroll.next(true);
    }
    else{
      this.shared.noScroll.next(false);
    }
  }//end onclickMenu

  onPulsein(){
    this.closeMenu();
    this.router.navigate([EnumUrls.address_home]);
  }//end onPulsein

  onLogin(){
    this.closeMenu();
    this.storage.showModalLogin.next(true);
    this.storage.isLoginWithRequest.next(false);
  }//end onLogin

  /*
  onNewRequest(){
    this.closeMenu();
    this.router.navigate([EnumUrls.address_home]);
  }//end onNewRequest
  */

  onAddCredit(){
    this.closeMenu();
    this.userToken = this.storage.userDataLogin.user.loginData.token;
    this.basicData.activeModalAddCredit.next(true);
  }//end onAddCredit

  onInvite(){
    this.closeMenu();
    this.basicData.activeModalInvite.next(true);
  }//end onInvite

  onCandidateLocations(){
    this.closeMenu();
    this.router.navigate(['/webApp/candidateLocations']);
  }//end onCandidateLocations

  onProfile(){
    this.closeMenu();
    this.router.navigate(['/webApp/profile']);
  }//end onProfile

  onTransactions(){
    this.closeMenu();
    this.router.navigate(['/webApp/transactions']);
  }//end onTransactions

  onFinishedRequest(){
    this.closeMenu();
    this.router.navigate(['/webApp/finishedRequests']);
  }//end onFinishedRequest

  onFollowingRequest(){
    this.closeMenu();
    this.router.navigate([EnumUrls.address_WebappCurrentRequest]);
  }//end onFollowingRequest

  onExit(){
    this.closeMenu();
    this.storage.userLogOut();
  }//end onExit

  closeMenu(){
    this.showMenu = false;
    this.shared.noScroll.next(false);
  }//end closeMenu

  goToBlog(){
    if(isPlatformBrowser(this.platformId)){
      window.location.href = this.blogUrl;
    }
  }//end goToBlog

}
