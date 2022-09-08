import { IqbazService } from './../../../../services/game/iqbaz/iqbaz.service';
import { Rules } from './../../../class/game/iqBaz/rules.class';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomFunctionsService } from '../../../../services/functions/custom-functions.service';
import { LoginService } from '../../../../services/httpLogin/login.service';
import { Message } from '../../../class/mesage.class';
import { ClientLoginData } from '../../../webApp/class/backend/clientLoginData.class';
import { StorageService } from '../../../../services/storage/storage.service';
import { SharedService } from '../../../../services/shared/shared.service';
import { ListPoints } from '../../../class/game/iqBaz/listPoints.class';
import { FestivalWinner } from '../../../class/game/iqBaz/festivalWinner.class';

@Component({
  selector: 'app-iq-baz-login',
  templateUrl: './iq-baz-login.component.html',
  styleUrls: ['./iq-baz-login.component.css']
})
export class IqBazLoginComponent implements OnInit {
  googleAnalyticsSendMobile:string = 'iqbazSendMobile';
  token:string = '';
  mobileNumber:string = '';
  isMobile:boolean = false;
  step:number = 1; //1:insertPhoneNumber, 2:insert Name and family and smscode, 3: just smscode
  isLoading:boolean = true;
  //isMinLoading:boolean = true;

  lottieConfig: Object;
  anim: any;

  firstName:string = '';
  lastName:string = '';

  phoneNumberlittlewindow: FormGroup;
  phoneNumber: FormGroup;
  userInfo: FormGroup;
  loginFinal: FormGroup;
  loginFinalLittelWindow: FormGroup;
  userInfoLittlewindow: FormGroup;
  referalID: string = "0";
  showReport:boolean = false;

  listPointsTxt:ListPoints[] = [
    {name: "هر سوال آسون", value: "۵"},
    {name: "هر سوال متوسط", value: "۱۰"},
    {name: "هر سوال سخت", value: "۲۰"},
    {name: "دعوت از هر دوست", value: "۲"},
    {name: "هر سفارش", value: "۵۰"}
  ];

  ranking:FestivalWinner[] = [];

  giftsText:string[] = [
    'بدون قرعه کشی به انتخاب برنده تا سقف',
    'به قید قرعه کشی برای همه ی شرکت کننده ها تا سقف',
    'اهدایی پالسین، تیکت،‌ ایران رنتر و چیلیوری برای شرکت کنندگان'
  ];

  rulesList:Rules[] = [
    {
      text:"کسی که بیشترین امتیاز مسابقه رو کسب کنه،‌ برنده جایزه بدون قرعه کشی خواهد بود.",
      sign:"fas fa-circle"
    },
    {
      text:"برنده می تونه از بین پلی استیشن ۴، تلویزیون هوشمند سونی، هدفن بیتس استودیو، ایرپاد اپل، هدفن سونی و کلی جایزه دیگه، به سلیقه خودش یه جایزه رو انتخاب کنه!",
      sign:"fas fa-circle"
    },
    {
      text:"برای کسب بیشترین امتیاز مسابقه، می تونید علاوه بر شرکت در مسابقه و پاسخ به سوالات، دوستان خودتون رو به مسابقه دعوت کنید و به ازای هر دوستی که به این بازی دعوت می کنید،‌۲ امتیاز اضافه کسب کنید.",
      sign:"fas fa-circle"
    },
    {
      text:"در عین حال با ثبت درخواست و تکمیل سفارش در سایت پالسین، ۵۰ امتیاز اضافه می گیرید که برای برنده شدن در مسابقه حتما به این امتیازات نیاز پیدا می کنین!",
      sign:"fas fa-circle"
    },
    {
      text:"امتیاز جواب دادن به هر سوال آسون ۵تاست! هر سوال متوسط ۱۰ تا و هر سوال سخت ۲۰ امتیاز داره!",
      sign:"fas fa-circle"
    },
    {
      text:"اگه چند روز بعد از شروع مسابقه به پالسین ملحق شدید، بدونید که دیر نیست و هنوز هم می تونید جایزه رو ببرید! فقط کافیه که دوستاتون رو به مسابقه دعوت کنید، درخواست ثبت کنید و جواب دادن به سوالات رو از روز اول شروع کنید. ",
      sign:"fas fa-circle"
    },
    {
      text:" سوالات هر ۲۴ ساعت و ۱۲ بامداد هر روز برای پاسخگویی شرکت کنندگان مسابقه نمایش داده میشن. اگر دیر به ما اضافه شدید،‌ هر سه ساعت می تونید به سوالات روزهای اول جواب بدید تا به سرعت امتیازاتتون به نفراتی که از روز اول مسابقه شرکت کردن نزدیک بشید!",
      sign:"fas fa-circle"
    },
    {
      text:"یه نکته ی مهم: اگر بتونید به همه ی سوالات یک روز درست جواب بدید، امتیاز دعوت از دوستان بوست میشه و بجای ۲ امتیاز به ازای هر دوست، ۳ امتیاز می گیرید!",
      sign:"fas fa-circle"
    },
    {
      text:"فراموش نکنید که با هر گوشی موبایل تنها یک بار می تونید ثبت نام کنید و ثبت نام بیشتر شمارش نمیشه و حتما باید دوستی رو که دعوت می کنید واقعی باشه.",
      sign:"fas fa-circle"
    }
  ];


  description:string = "در مسابقه شرکت کنید و با کسب بالاترین امتیاز، بدون قرعه کشی از بین PS4، تلویزیون سونی، ایرپاد و هدفن بیتس، جایزه اتون رو انتخاب کنید! کافیه فسفر بسوزونید و دوستاتون رو به این بازی دعوت کنید!";

  descriptionPart1:string = "در مسابقه شرکت کنید و با کسب بالاترین امتیاز، بدون قرعه کشی از بین ";
  giftList:string[] = ['PS4','تلویزیون سونی','ایرپاد','هدفن بیتس'];
  descriptionPart2:string = "جایزه خودتون رو انتخاب کنید! کافیه فسفر بسوزونید و دوستاتون رو به این بازی دعوت کنید!";
  descriptionGiftCodes:string = "برای مشاهده امتیازات و کدهای شانس خود و برندگان جشنواره، باید شماره موبایلی که با آن در بازی ثبت نام کرده اید را در باکس مقابل وارد نمایید.";

  constructor(@Inject(PLATFORM_ID) private platformId: Object, 
    private customFunction: CustomFunctionsService,
    private activeRoute: ActivatedRoute,
    public storage: StorageService,
    private router: Router,
    public shared: SharedService,
    private httpService: LoginService,
    private httpServiceIQbaz: IqbazService) {
    this.lottieConfig = {
      path: 'assets/image/game/iqBaz/loading.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
   }

  ngOnInit() {
    this.phoneNumberlittlewindow = new FormGroup({
      mobileNumber: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });
    this.phoneNumber = new FormGroup({
      mobileNumber: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
    });
    this.userInfo = new FormGroup({
      fName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      lName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      smsCode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    });
    this.userInfoLittlewindow = new FormGroup({
      fName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      lName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      smsCode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    });
    this.loginFinal = new FormGroup({
      smsCode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    });
    this.loginFinalLittelWindow = new FormGroup({
      smsCode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    });

    if(isPlatformBrowser(this.platformId)){
      this.token = localStorage.getItem('userToken');
    }
    this.activeRoute.params.subscribe((param: Params) => {
      this.referalID = param.refID;
      if(!this.referalID){
        this.referalID = '0';
      } 
      if(this.token){
        if(isPlatformBrowser(this.platformId)){
          sessionStorage.setItem('referralID', this.referalID);
        }
        this.router.navigate(['game/IqBaz/start']);
      }
      else{
        this.isLoading =  false;
        //this.getReport();
      }
    });//end activeRoute
    
  }//end ngOnInit


  /*
  getReport(){
    this.httpServiceIQbaz.getReportGuest().subscribe(res => {
      if(res){
        if(res.winners){
          if(res.winners.length > 0){
            this.showReport = true;
            this.ranking = res.winners;
          }
        }
      }
    });
  }//end getReport
  */

  inputSmsCode(value:string){
    //console.log(value);
    if(value.length == 5){
      //console.log(value.length);
      this.onSubmitLogin();
    }
  }//end inputSmsCode

  inputSmsCodeLittleWindow(value:string){
    if(value.length == 5){
      this.onSubmitLittleWindowLogin();
    }
  }//end inputSmsCodeLittleWindow

  inputSmsSignup(value:string){
    if(value.length == 5){
      this.onSubmitUserInfo();
    }
  }//end inputSmsSignup

  inputSmsSignupLittleWindow(value:string){
    if(value.length == 5){
      this.onSubmitUserInfoLittleWindow();
    }
  }//end inputSmsSignupLittleWindow


  gradeIcon(grade:number):string{
    let src:string = '';
    if(grade == 1){
      src = "assets/image/game/iqBaz/goldMedal.png";
    }
    else{
      src = "assets/image/game/iqBaz/idea.png";
    }
    return src;
  }//end gradeIcon


  onSubmitPhoneNumber(){
    this.isTimeOut = false;
    this.isLoading = false;
    let enMobileNumber:string = this.customFunction.chanageNumbersToEnglish(this.mobileNumber);
    this.httpService.getLoginWithRequest(enMobileNumber).subscribe(res=>{
      if(!res){
        this.step = 2;
      }
      else{
        this.step = 3;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
      }
      this.timerSMSVerify();
    }, error =>{
      //console.log(error);
      let msgError = <Message>(error.error.error);
      //console.log(msgError);
    });
    //console.log('it is send mobile number');
  }//end onSubmitPhoneNumber

  onSubmitPhoneNumberLittleWindow(){
    this.onSubmitPhoneNumber();
  }//end onSubmitPhoneNumberLittleWindow

  onSubmitLogin(){
    //console.log("onSubmitLogin");
    this.loginCompelete(this.loginFinal.value.smsCode);
  }//end onSubmitLogin

  onSubmitLittleWindowLogin(){
    this.isLoading = true;
    //console.log('it is end of Login little window---');
    this.loginCompelete(this.loginFinalLittelWindow.value.smsCode)
  }//end onSubmitLittleWindowLogin

  onMobileInput(val:string){
    this.isMobile = false;
    this.mobileNumber = val;
    if(this.mobileNumber.length == 11){
      this.isMobile = this.checkMobileInput(this.mobileNumber);
    }
  }//end onMobileInput

  checkMobileInput(mobile:string):boolean{
    let mobileTemp:string[] = mobile.split('');
    let noError:boolean = true;
      for(let i = 0; i < 11; i++){
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
  }//end checkMobileInput

  onSubmitUserInfo(){
    this.firstName = this.userInfo.value.fName;
    this.lastName = this.userInfo.value.lName;
    this.loginCompelete(this.userInfo.value.smsCode);
  }//end onSubmitUserInfo

  onSubmitUserInfoLittleWindow(){
    this.firstName = this.userInfoLittlewindow.value.fName;
    this.lastName = this.userInfoLittlewindow.value.lName;
    this.loginCompelete(this.userInfoLittlewindow.value.smsCode);
  }//end onSubmitUserInfoLittleWindow

  handleAnimation(anim: any) {
    this.anim = anim;
  }//end handleAnimation

  timeCountMin:number;
  timeCountSec:number;
  isTimeOut:boolean = false;
  interval:any = null;
  timerSMSVerify(){
    clearInterval(this.interval);
    if(isPlatformBrowser(this.platformId)){
      this.timeCountMin = 4;
      this.timeCountSec = 59;

      this.interval = setInterval(()=>{
        this.timeCountSec--;
        if(this.timeCountSec == 0 && this.timeCountMin > 0){
          this.timeCountMin--;
          this.timeCountSec = 59;
        }
        else if(this.timeCountSec <= 0 && this.timeCountMin <= 0){
          this.isTimeOut = true;
          this.step = 1;
          clearInterval(this.interval);
        }   
      }, 1000);
    }
  }//end timerSMSVerify

  loginCompelete(inputSmsCode:string){
    //console.log("loginCompelete");
    let enMobile:string = this.customFunction.chanageNumbersToEnglish(this.mobileNumber);
    let smsCode = this.customFunction.chanageNumbersToEnglish(inputSmsCode);
    let loginInfo:ClientLoginData = {
      firstName: this.firstName,
	    lastName: this.lastName,
	    mobileNumber: enMobile,
	    smsCode: smsCode,
      loginType: this.storage.deviceType,
      deviceId: this.shared.tokenFirebace
    };
    //console.log(loginInfo);

    this.httpService.getCompleteLoginWithRequest(loginInfo).subscribe(res => {
      
      let encodeNumber:string = '';
      encodeNumber = this.customFunction.encodingNumber(this.mobileNumber);
      
      
      this.storage.subject_userDataLogin.next(res);
      
      this.storage.token.next(res.user.loginData.token);
      this.storage.isLogin.next(true);
      
      if(isPlatformBrowser(this.platformId)){
        localStorage.setItem('pulsInfo',encodeNumber + smsCode);
        localStorage.setItem('userToken', res.user.loginData.token);
        sessionStorage.removeItem('requestInfo');
      }

      if(res.inProgressRequests){
        if(res.inProgressRequests.length > 0){
          this.shared.hasActiveRequest.next(true);
        }
        else{
          this.shared.hasActiveRequest.next(false);
        }
      }
      else{
        this.shared.hasActiveRequest.next(false);
      }
    //console.log("user is login");
      //console.log(res);
      //this.basicData.getUserLocations(res.user.loginData.token);
      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem('referralID', this.referalID);
        this.router.navigate(["/game/IqBaz/start"]);
        //console.log("after router...");
      }
    }, error =>{
      //console.log(error);
      let msgError = <Message>(error.error.error);
      //console.log(msgError);
    });
  }//end loginCompelete

}
