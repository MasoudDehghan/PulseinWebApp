import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { RequestV } from '../../class/backend/requestV.class';
import { ClientLoginData } from '../../class/backend/clientLoginData.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { webappConstValue } from '../../class/webappConstVal';
import { EnumUrls } from '../../enum/enumUrls.enum';
import { StorageService } from '../../../../services/storage/storage.service';
import { CustomFunctionsService } from '../../../../services/functions/custom-functions.service';
import { BasicDataService } from '../../../../services/basicData/basic-data.service';
import { SharedService } from '../../../../services/shared/shared.service';
import { Message } from '../../../class/mesage.class';
import { LoginService } from '../../../../services/httpLogin/login.service';
import { webappHttpService } from '../../services/http/webapp-http.service';
import { CheckDiscountRequest } from '../../class/backend/checkDiscountRequest.class';
import { ToastMessage } from '../../../class/toastMessage.class';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'smslogin',
  templateUrl: './smslogin.component.html',
  styleUrls: ['./smslogin.component.css']
})
export class SmsloginComponent implements OnInit {

  /*----start form variables---*/
  loginFormStep1: FormGroup;
  loginFormStep2: FormGroup;
  signupForm:FormGroup;
  /*----end form variables-----*/

  txtErrorMsg:string = '';
  isWrongSmsCode:boolean = false;
  displayModalLogin:boolean = false;
  showStateGetMobile:boolean = true;
  showStateLoginSmsmCode:boolean = false;
  showSignupState:boolean = false;
  smsCode:string = '';
  mobileNumber:string = '';
  firstName:string = null;
  lastName:string = null;
  isMobile:boolean = false;
  isloginLoading:boolean = false;
  lottieConfig: Object;
  lottieConfigHeader: Object;
  anim: any;
  isLoginOk:boolean = false;
  modalBoxPositionTop:string = '0px';
  modalBoxPositionRight:string = '0px';
  modalBoxSizeX:string = '0px';
  modalBoxSizey:string = '0px';
  displayModal:boolean = false;
  googleAnalyticsCategory:string = 'loginFinalStep';

  constructor(private basicData: BasicDataService,
    public constVal: webappConstValue,
    private customFunction: CustomFunctionsService,
    private httpService: LoginService,
    private httpWebApp: webappHttpService,
    public storage: StorageService,
    private toastr: ToastrService,
    private toastMsg:ToastMessage,
    private shared: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router) {
      this.lottieConfig = {
        path: 'assets/webappPics/preloader.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
    }

  ngOnInit() {
    this.storage.showModalLogin.subscribe(res =>{
      this.displayModalLogin = res;
    });
    
    this.loginFormStep1 = new FormGroup({
      userMobile: new FormControl(null, [Validators.required, Validators.minLength(this.constVal.minMobile), Validators.maxLength(this.constVal.maxMobile)])
    });

    this.loginFormStep2 = new FormGroup({
      userloginSms: new FormControl(null, [Validators.required, Validators.minLength(this.constVal.minVerifySMS)])
    });

    this.signupForm = new FormGroup({
      userFirstName: new FormControl(null, [Validators.required, Validators.minLength(this.constVal.minFirstName)]),
      userLastName: new FormControl(null, [Validators.required, Validators.minLength(this.constVal.minLastName)]),
      userSms: new FormControl(null, [Validators.required, Validators.minLength(this.constVal.minVerifySMS)])
    });

    this.displayModal = true;
    this.setPositionModal();
  }//end ngOnInit


  onSubmitStep1(){
    this.isloginLoading = true;
    this.onLoginStep1(); 
  }

  onSubmitStep2(){
    this.isloginLoading = true;
    this.sendSMSCode();
  }

  onSubmitSignup(){
    this.isloginLoading = true;
    this.sendSMSCode();
  }

  onKeyupStep1(event){
    if(this.loginFormStep1.valid && this.isMobile){
      if(event.key === "Enter"){
        this.onSubmitStep1();
      }
    }
  }

  onKeyupStep2(event){
    if(this.loginFormStep2.valid){
      if(event.key === "Enter"){
        this.sendSMSCode();
      }
    }
  }

  onKeyupSignup(event){
    if(this.signupForm.valid){
      if(event.key === "Enter"){
        this.sendSMSCode();
      }
    }
  }
  
  onClose(){
    this.shared.removeReserveDiscountCode();
    this.displayModal = false;
    this.storage.showModalLogin.next(false);
  }

  onMobileInput(val:string){
    this.isMobile = false;
    this.mobileNumber = val;
    if(this.mobileNumber.length == this.constVal.maxMobile){
      this.isMobile = this.checkMobileInput(this.mobileNumber);
    }
  }

  onInputFirstName(val){
    this.firstName = val;
  }

  onInputlastName(val){
    this.lastName = val;
  }

  onInputSms(val:string){
    this.smsCode = val;
    this.isWrongSmsCode = false;
    if(this.smsCode.length == 5){
      this.sendSMSCode();
    }
  }

  onLoginStep1(){
    this.smsCode = '';
    this.isTimeOut = false;
    this.mobileNumber = this.customFunction.chanageNumbersToEnglish(this.mobileNumber);
    this.httpService.getLoginWithRequest(this.mobileNumber).subscribe(res=>{
      this.isloginLoading = false;
      this.showStateGetMobile = false; 
      
      if(!res){
        this.showSignupState = true;
      }
      else{
        this.showStateLoginSmsmCode = true;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
      }
      this.timerSMSVerify();
    }, error =>{
      //console.log(error);
      let msgError = <Message>(error.error.error);
      //console.log(msgError);
      this.isloginLoading = false;
    });
  }

  sendSMSCode(){
    //let request:RequestV =  JSON.parse(sessionStorage.getItem('requestInfo'));
    
    this.smsCode = this.customFunction.chanageNumbersToEnglish(this.smsCode);
    let loginInfo:ClientLoginData = {
      firstName: this.firstName,
	    lastName: this.lastName,
	    mobileNumber: this.mobileNumber,
	    smsCode: this.smsCode,
	    //request: request,
      loginType: this.storage.deviceType,
      deviceId: this.shared.tokenFirebace
    };

    //if(!this.storage.isLoginWithRequest.value){
      //=====No request in login=====//
      this.httpService.getCompleteLoginWithRequest(loginInfo).subscribe(res => {
        /*==start save mobile and password===*/
        console.log('----اطلاعات بعد از ورود کاربر----');
        console.log(res);
        let encodeNumber:string = '';
        encodeNumber = this.customFunction.encodingNumber(this.mobileNumber);
        localStorage.setItem('pulsInfo',encodeNumber + this.smsCode);
        /*==end save mobile and password===*/
        this.storage.subject_userDataLogin.next(res);
        localStorage.setItem('userToken', res.user.loginData.token);
        this.storage.token.next(res.user.loginData.token);
        this.storage.isLogin.next(true);

        if(res.inProgressRequests){
          if(res.inProgressRequests.length > 0 && this.checkLayout()){
            this.shared.hasActiveRequest.next(true);
            //console.log("--درخواست فعال دارید!!!--");
            this.toastr.clear();
            this.toastr.error(this.toastMsg.msgHasActiveRequest, this.toastMsg.title4HasActiveRequest);
            this.router.navigate([EnumUrls.address_home]);
          }
          else{
            //console.log("--1درخواست فعال ندارید!!!--");
            this.shared.hasActiveRequest.next(false);
            this.registerNewRequest(res.user.loginData.token);
            if(this.shared.checkDiscountInLogin.value){
              this.checkDiscount(res.user.loginData.token);
            }
          }
        }
        else{
          //console.log("--0درخواست فعال ندارید!!!--");
          this.shared.hasActiveRequest.next(false);
          this.registerNewRequest(res.user.loginData.token);
          if(this.shared.checkDiscountInLogin.value){
            this.checkDiscount(res.user.loginData.token);
          }
        }

        this.showStateLoginSmsmCode = false;
        this.showSignupState = false
        this.isLoginOk = true;
        setTimeout(()=>{
          this.isLoginOk = false;
          this.storage.showModalLogin.next(false);
          this.basicData.getUserLocations(res.user.loginData.token);
        },1500);
      }, error =>{
        this.shared.removeReserveDiscountCode();
        console.log(error);
        this.isloginLoading = false;
        let msgError = <Message>(error.error.error);
        console.log(msgError);
        msgError.msg.forEach(eleman =>{
          if(eleman.code == 74){
            this.txtErrorMsg = eleman.msg;
            this.isWrongSmsCode = true;
          }
        });
      });    
  }//end sendSMSCode

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  timeCountMin:number;
  timeCountSec:number;
  isTimeOut:boolean = false;
  timerSMSVerify(){
    this.timeCountMin = 5;
    this.timeCountSec = 59;

    let interval = setInterval(()=>{
      this.timeCountSec--;
      if(this.timeCountSec == 0 && this.timeCountMin > 0){
        this.timeCountMin--;
        this.timeCountSec = 59;
      }
       else if(this.timeCountSec <= 0 && this.timeCountMin <= 0){
        this.isTimeOut = true;
        clearInterval(interval);
      }   
    }, 1000);
  }//end timerSMSVerify

  onNewMobile(){
    this.mobileNumber = '';
    this.firstName = '';
    this.lastName = '';
    this.showStateGetMobile = true;
    this.showSignupState = false;
    this.isTimeOut = false;
    this.showStateLoginSmsmCode = false;
    this.loginFormStep1.get('userMobile').setValue('');
    this.signupForm.get('userFirstName').setValue('');
    this.signupForm.get('userLastName').setValue('');
    this.signupForm.get('userSms').setValue('');
  }

  checkMobileInput(mobile:string):boolean{
    let mobileTemp:string[] = mobile.split('');
    let noError:boolean = true;
      for(let i = 0; i < this.constVal.maxMobile; i++){
        if(noError){
          if((mobileTemp[0]=='0' || mobileTemp[0]=='۰') && (mobileTemp[1]=='۹' || mobileTemp[1]=='9')){
            noError = this.customFunction.checkCharIsNumber(mobileTemp[i]);
          }
          else{
            noError = false;
          }
        }
      }
    return noError;
  }

  showModalStyle(){
    let style = {
      'top': this.modalBoxPositionTop,
      'right': this.modalBoxPositionRight,
      'width': this.modalBoxSizeX,
      'height': this.modalBoxSizey
    }
    return style;
  }

  hideModalStyle(){
    this.modalBoxPositionTop = '0px';
    this.modalBoxPositionRight = '0px';
    this.modalBoxSizeX = '0px';
    this.modalBoxSizey = '0px';
    let style = {
      'top': '0px',
      'right': '0px',
      'width': '0px',
      'height': '0px'
    }
    return style;
  }

  setPositionModal(){
    let xVal:number = 400;
    let yVal:number = 350;
    if(this.shared.xWindow.value > xVal){
      this.modalBoxSizeX = xVal + 'px';
      this.modalBoxPositionRight = ((this.shared.xWindow.value / 2) - (xVal / 2))+'px';
      //console.log("111")
    }
    else{
      this.modalBoxSizeX = this.shared.xWindow.value + 'px';
      this.modalBoxPositionRight = '0px';
      //console.log("222")
    }
    if(this.shared.yWindow.value > yVal){
      this.modalBoxSizey = yVal + 'px';
      this.modalBoxPositionTop = ((this.shared.yWindow.value / 2) - (yVal / 2))+'px';
      //console.log("333")
    }
    else{
      this.modalBoxSizey = '350px';
      this.modalBoxPositionTop = '0px';
      //console.log("444")
    }
  }

  registerNewRequest(token:string){
    if(this.storage.isLoginWithRequest.value){
      let requestInfo: RequestV = JSON.parse(sessionStorage.getItem('requestInfo'));
      requestInfo.takhfifanToken = this.shared.takhfifanToken;
      sessionStorage.removeItem('requestInfo');
      this.httpWebApp.postUserNewRequest(requestInfo, token).subscribe(res => {
        this.shared.stepNumber.next(7);
        this.shared.stepNumberMobile.next(5);
        //this.shared.requestCode.next(res.request.code);
        this.shared.requestRegister = res;
        this.shared.hasActiveRequest.next(true);
        this.storage.isLoginWithRequest.next(false);
        this.router.navigate([EnumUrls.requestRegister_requestResult]);
      }, error => {
        //console.log("خطایی رخ داده است. در زمان ثبت درخواست در ماژول لاگین با اس ام اس");
        //console.log(error);
      });
    }
  }//end registerNewRequest

  checkDiscount(token:string){
    let infoDiscountCheck:CheckDiscountRequest = JSON.parse(sessionStorage.getItem("infoDiscountRequest"));
    sessionStorage.removeItem("infoDiscountRequest");
    //console.log("city: " + this.shared.selectedArea.value);
    //console.log(this.shared.citySelected.name);
    //console.log(this.shared.citySelected.id);
    this.httpWebApp.checkDiscount(infoDiscountCheck, token).subscribe(data => {
      //console.log("-----sms login with check discount------");
      //console.log(data);
      this.shared.resDiscountCheckWithLogin.next(true);
      this.shared.checkDiscountValue(data.code, data.percent, data.maxCredit);
      this.shared.checkDiscountInLogin.next(false);
    }, error =>{
      //console.log('----خطا به هنگام محاسبه کد تخفیف در زمان لاگین---');
      //console.log(error);
    });
  }//end checkDiscount


  checkLayout():boolean{
    let isWebAppLayout:boolean = false;
    if (isPlatformBrowser(this.platformId)){
      let path:string = document.URL;
      let str: string[] = path.split('/');
      if(str.indexOf('webApp') == -1){
        isWebAppLayout = false;
      }
      else{
        isWebAppLayout = true;
      }
    }
    return isWebAppLayout;
  }//end checkLayout

}
