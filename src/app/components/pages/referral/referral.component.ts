import { SharedService } from '../../../services/shared/shared.service';
import { HttpService } from '../../../services/http/http.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConstValue } from '../../class/constValue';
import { Message } from '../../class/mesage.class';
import { InvitationV } from '../../class/invitationV.class';
import { Links } from '../../class/links';
import { BasicDataService } from '../../../services/basicData/basic-data.service';


@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent implements OnInit {

  xWindow:number = 1000;
  yWindow:number = 1000;
  screenX:string = '0px';
  screenY:string = '0px';
  presenterID:string = '';
  resultRecaptcha:string = null;
  isCaptchaTrue:boolean = false;
  mobile:string = '';
  MobileSendToServer:string = '';
  isMobileNumber:boolean = false;
  PresenterUserName:string = '';
  inviteText1:string = " شما را";
  inviteText2:string ="به خانواده پالسین دعوت کرده است.";
  titrDownload:string = "دانلود اپلیکیشن پالسین";
  showBtnDownloadApp:boolean = false;
  min:number = 0;
  txtTime:string = "فرصت باقی مانده تا ثبت نام شما";
  textEndTime:string = "پایان اعتبار دعوت";
  erroeMessage:string = '';
  isError:boolean = false;
  displayLoading:boolean = true;
  dispalyReferralPage:boolean = false;
  title4ErrorReferralCode:string = "خطای کد معرف";
  description4ErrorReferralCode:string ="داده ای مرتبط با کد معرف شما یافت نشد!!!";


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private route:ActivatedRoute,
    private httpService:HttpService,
    public linkDownload:Links,
    public basicData:BasicDataService,
    public shared: SharedService,
    public constVal:ConstValue) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.shared.pagePath.next(this.shared.getPagePath());
    this.getDimSize();
    this.route.params.subscribe((param: Params) => {
      this.presenterID = param.id;
      this.httpService.getPresenterInfo(this.presenterID).subscribe(res => {
        if(res){
          this.PresenterUserName = res.presenterFirstName + " " + res.presenterLastName;
          this.min = res.expireTime;
          this.displayLoading = false;
          this.dispalyReferralPage = true;
        }
      }, error => {
        //this.router.navigate(["notFound"]);
        this.displayLoading = false;
        this.dispalyReferralPage = false;
      });
    });
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.getDimSize();
  }

  getDimSize(){
    if (isPlatformBrowser(this.platformId)) {
      if (window){
        this.xWindow = window.innerWidth;
        this.yWindow = window.innerHeight;
        this.screenX = this.xWindow + 'px';
        this.screenY = this.yWindow + 'px';
      }
    }
  }
  
  resolved(captchaResponse: string) {
    this.resultRecaptcha = captchaResponse;
    if(this.resultRecaptcha != '' && this.resultRecaptcha != 'false' && this.resultRecaptcha){
      this.isCaptchaTrue = true;
    }
  }

  onChangeMobile(inputVal:string){
    this.isError = false;
    this.isMobileNumber = false;
    this.MobileSendToServer = "";
    let tempMobile:string = "";
    inputVal = inputVal.trim();
    if(inputVal.length == 11){
      let splitInput = inputVal.split('');
      let isErrorInMobileInput:boolean = false;
      if((splitInput[0] == '0' || splitInput[0]== '۰') && (splitInput[1] == '9' || splitInput[1] == '۹')){
        for(let i = 0; i < 11; i++){
          if(!isErrorInMobileInput){
            if(splitInput[i] == "1" || splitInput[i] == "۱"){
              tempMobile = tempMobile + "1";
            }
            else if(splitInput[i] == "2" || splitInput[i] == "۲"){
              tempMobile = tempMobile + "2";
            }
            else if(splitInput[i] == "3" || splitInput[i] == "۳"){
              tempMobile = tempMobile + "3";
            }
            else if(splitInput[i] == "4" || splitInput[i] == "۴"){
              tempMobile = tempMobile + "4";
            }
            else if(splitInput[i] == "5" || splitInput[i] == "۵"){
              tempMobile = tempMobile + "5";
            }
            else if(splitInput[i] == "6" || splitInput[i] == "۶"){
              tempMobile = tempMobile + "6";
            }
            else if(splitInput[i] == "7" || splitInput[i] == "۷"){
              tempMobile = tempMobile + "7";
            }
            else if(splitInput[i] == "8" || splitInput[i] == "۸"){
              tempMobile = tempMobile + "8";
            }
            else if(splitInput[i] == "9" || splitInput[i] == "۹"){
              tempMobile = tempMobile + "9";
            }
            else if(splitInput[i] == "0" || splitInput[i] == "۰"){
              tempMobile = tempMobile + "0";
            }
            else{
              isErrorInMobileInput = true;
            }
          }
        }
        if(!isErrorInMobileInput && tempMobile.length == 11){
          this.isMobileNumber = true;
          this.MobileSendToServer = tempMobile;
        }

      }
    }
  }

  onSendMobile(){
    let info:InvitationV = {
      presenterFirstName:null,
	    presenterLastName:null,
	    presenterPhoto:null,
	    presenterId:Number(this.presenterID),
	    presentedMobile:this.MobileSendToServer,
      expireTime:null
    }

    this.httpService.postRegisterInveited(info).subscribe(res => {
      this.showBtnDownloadApp = true;
    }, error => {
      //console.log(error);
      let msgError:Message = <Message>(error.error.error);
      this.isError = true;
      this.isMobileNumber = false;
      if(error.status == 500){
        let imsgs = msgError.msg;
        imsgs.forEach(msg=>{
          if(msg.code == 146){
            this.erroeMessage = "شماره قبلا ثبت شده است";
          }
          else if(msg.code == 208){
            this.erroeMessage = "اطلاعات دعوت کننده اشتباه است";
          }
          else{
            this.erroeMessage = "خطایی رخ داده است";
          }
        });
      }
      else{
        this.erroeMessage = "خطایی رخ داده است";
      }
    });
  }

} 
