import { webappHttpService } from './../../webApp/services/http/webapp-http.service';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { StorageService } from '../../../services/storage/storage.service';
import { EnumConstData } from '../../enum/constData.enum';
import { UrlRest } from '../../class/urlRest.class';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../../services/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumUrls } from '../../webApp/enum/enumUrls.enum';
import { Links } from '../../class/links';


@Component({
  selector: 'globalHeader',
  templateUrl: './g-header.component.html',
  styleUrls: ['./g-header.component.css']
})
export class GHeaderComponent implements OnInit {

  charFirstName: string = '';
  charLastName: string = '';
  userName:string = '';
  tempArr: string[] = [];
  isProfileImage: boolean = false;
  profileImageAddress: string = '';
  userToken: string = '';
  inviteMsg: string = '';
  stateShowMenu: number = 0; //0:normal menu; 1:opacity 0.4; 2:fixed top menu

  showBtnRegisterRequest:boolean = false;
  showBtnCurrentRequest:boolean = false;
  pathName: string = '';

  showMainMenu:boolean = true;

  blogUrl:string = "";

  constructor(public storage: StorageService, 
    private urlRest: UrlRest,
    public basicData: BasicDataService,
    public shared: SharedService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private links:Links,
    private webappHttp: webappHttpService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.blogUrl = this.links.blogLink;
      this.activeRoute.url.subscribe(res =>{
        //console.log(res);
        
        this.pathName = window.location.pathname;
        //console.log(this.pathName);

        if(this.pathName == EnumUrls.address_WebappCurrentRequest || 
          this.pathName == EnumUrls.address_WebappRequestRegister){
          this.showBtnCurrentRequest = false;
          this.showBtnRegisterRequest = false;
        }
        else{
          this.showBtnCurrentRequest = true;
          this.showBtnRegisterRequest = true;
        }
      });
    }

    this.storage.isLogin.subscribe(res => {
      this.setUserInfo(res);
    });

    this.storage.subject_userDataLogin.subscribe(data => {
      //console.log("header global subscribe user data");
      this.setUserInfo(this.storage.isLogin.value);
      if(data){
        this.storage.userDataLogin = data;
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
  }//end ngOnInit

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    if (isPlatformBrowser(this.platformId)){
      if(window){
        if(this.shared.isWebAppPage.value){
          const position1 = 50;
          const position2 = 40;
          const position3 = 50;
          const scrollPosition = window.pageYOffset;
          if (scrollPosition >= position1) {
            this.stateShowMenu = 2;//fixe top menu
          } 
          else if(scrollPosition <= position2) {
            this.stateShowMenu = 0;//normal menu
          }
          else{
            this.stateShowMenu = 1; //opacity 0.4 menu
          }

          if(scrollPosition > position3){
            this.showMainMenu = false;
          }
          else{
            this.showMainMenu = true;
          }
        }
        else{
          const position1 = 180;
          const position2 = 150;
          const position3 = 120;
          const scrollPosition = window.pageYOffset;
          if (scrollPosition >= position1) {
            this.stateShowMenu = 2;//fixe top menu
          } 
          else if(scrollPosition <= position3 && scrollPosition <= position2){
            this.stateShowMenu = 0;//normal menu
          }
          else if(scrollPosition > position2 && scrollPosition < position1){
            this.stateShowMenu = 1; //opacity 0.4 menu
          }
          else if(scrollPosition < position3){
            this.stateShowMenu = -1; //not show
          }
          if(scrollPosition > position3){
            this.showMainMenu = false;
          }
          else{
            this.showMainMenu = true;
          }
        }
      } 
    }
  }//end checkScroll 

  onLogin(){
    this.storage.showModalLogin.next(true);
    this.storage.isLoginWithRequest.next(false);
  }

  onUserMenuClick(){
    this.storage.showModalUserMenu.next(true);
  }

  onClickSearch(){
    this.storage.showModalSearch.next(true);
  }

  setUserInfo(isLoginResult:boolean){
    if(isPlatformBrowser(this.platformId)){
      this.userToken = localStorage.getItem('userToken');
    }
      if(isLoginResult){
        if(this.storage.userDataLogin){
          this.userName = this.storage.userDataLogin.user.personalData.firstName + " " + this.storage.userDataLogin.user.personalData.lastName;
          this.inviteMsg = this.storage.userDataLogin.inviteLink;
          this.tempArr= this.storage.userDataLogin.user.personalData.firstName.split('');
          this.charFirstName = this.tempArr[0];
          this.tempArr = [];
          this.tempArr = this.storage.userDataLogin.user.personalData.lastName.split('');
          this.charLastName = this.tempArr[0];
          if(this.storage.userDataLogin.user.personalData.photo == EnumConstData.profileImageEmpty){
            this.isProfileImage = false;
          }
          else{
            this.isProfileImage = true;
            this.profileImageAddress = this.urlRest.imagePath + this.storage.userDataLogin.user.personalData.photo;
          }
        } 
      }
  }


  onNewRequest(){
    this.shared.stepNumber.next(0);
    this.router.navigate([EnumUrls.address_WebappRequestRegister]); 
  }

  /*:::
  onBanerIqBaz(){
    this.router.navigate([EnumLinkGame.layoutGame]);
  }
  :::*/

  selectMenu():string{
    let className:string = '';
    if(this.stateShowMenu == 0){
      if(this.shared.isWebAppPage.value){
        className = "notShowWebApp";
      }
      else{
        className = "notShow";
      }
    }
    else if(this.stateShowMenu == 1){
      className = "showMeddleMenu";
    }
    else if(this.stateShowMenu == 2){
      className = "showFixTop";
    }
    else if(this.stateShowMenu == -1){
      className = "hidenMenu";
    }
    return className;
  }//end selectMenu

  goToBlog(){
    if(isPlatformBrowser(this.platformId)){
      window.location.href = this.blogUrl;
    }
  }//end goToBlog

  onFollowRequest(){
    this.webappHttp.getOnProgressRequests(this.userToken).subscribe(res => {
      if(res.length > 0){
        this.shared.requestInfo = res[0];
        this.shared.requestID = res[0].request.id;
        this.shared.routingByStateRequest(this.shared.requestInfo.state.id);
      }
    });
  }//end onFollowRequest

}
