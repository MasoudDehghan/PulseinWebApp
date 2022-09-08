import { SharedService } from '../../../services/shared/shared.service';
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { JobCategory2V } from '../../class/jobCategory2V.class';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { ConstValue } from '../../class/constValue';
import { SiteCommentV } from '../../class/siteCommentV.class';
import { HttpService} from '../../../services/http/http.service';
import { Message } from '../../class/mesage.class';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-criticism-suggestion',
  templateUrl: './criticism-suggestion.component.html',
  styleUrls: ['./criticism-suggestion.component.css']
})
export class CriticismSuggestionComponent implements OnInit {

  countSecond:number = 120;
  showCaptcha:boolean = true;
  showMessageDiv:boolean = false;
  checkFormSendByMessage:boolean = false;
  checkFormSendByMobile:boolean = true;
  checkFormSendByEmail:boolean = true;
  firstNameModel:string = '';
  lastNameModel:string = '';
  emailModel:string = '';
  mobileModel:string = '';
  emailfilled:boolean = true;
  mobilefilled:boolean = true;
  msgfilled:boolean = true;
  msgModel:string = '';
  resultRecaptcha:string = null;


  selectType:boolean = false;

  option1:string = 'کاربر';
  option2:string = 'متخصص';
 
  capchaVerified:boolean = false;
  capchaKey:string = '';
  isPC:boolean = true;
  categories1: JobCategory1V[];
  categories2: Array<JobCategory2V[]>;
  categories3: Array<JobCategory3V[]>;
  xWindow:number = 1000;


  constructor(private basicData: BasicDataService, 
    private constVar:ConstValue, 
    private httpService: HttpService,
    private objContact:SiteCommentV,
    public msgError:Message,
    public msg:Message,
    public titleSeo:Title,
    public shared: SharedService,
    public meta:Meta,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.showCaptcha = true;
    this.capchaKey = this.constVar.capchaGoogleKey;
    this.titleSeo.setTitle("پالسین - انتقادات و پیشنهادات");
    this.meta.updateTag({
      name: 'description',
      content: "پالسین برای بهبود کیفیت خدمات ارائه شده پیشنهادها و انتقادات کاربران را بررسی و اجرا می‌کند"
    });

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.modeInit();

      this.basicData.setCategories.subscribe(res => {
        if(res){
          //console.log("criticism-suggestion ***");
          this.categories1 = this.basicData.categories1;
          this.categories2 = this.basicData.categories2;
          this.categories3 = this.basicData.categories3;
        }
      });
    }
  }//end ngOnInit

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser(this.platformId)){
      this.xWindow = window.innerWidth;
      if(this.xWindow <= 720){
        this.isPC = false;
      }
      else{
        this.isPC = true;
      }
    }
  }

  modeInit(){
    this.xWindow = window.innerWidth;
    if(this.xWindow <= 720){
     this.isPC = false;
    }
    else{
     this.isPC = true;
    } 
  }

  resolved(captchaResponse: string) {
    this.resultRecaptcha = captchaResponse;
    if(this.resultRecaptcha != '' && this.resultRecaptcha != 'false' && this.resultRecaptcha){
      this.capchaVerified = true;
    }
    //console.log(`Resolved captcha with response ${captchaResponse}:`); 
  }

  onFocus(inputName){
    this.showMessageDiv = false;

    if(inputName === 'email'){
      this.emailfilled = true;
    }

    if(inputName === 'mobile'){
      if(!this.mobilefilled){
        this.mobileModel = '';
      }
      this.mobilefilled = true;
    }

    if(inputName === 'userMsg'){
      this.msgfilled = true;
    }
  }//end onFocus


  onBlur(inputName){
    this.showMessageDiv = false;

    if(inputName === 'email'){
      if(this.emailModel.trim() === ''){
        this.emailModel = '';
        this.checkFormSendByEmail = true;
      }
      else{
        if(this.emailModel.indexOf('@') == -1 || this.emailModel.indexOf('.') == -1){
          this.checkFormSendByEmail = false;
          this.emailfilled = false;
        }
        else{
          this.checkFormSendByEmail = true;
          this.emailfilled = true;
        }
      }
    }

    if(inputName === 'mobile'){
      let mobile:string = this.mobileModel.trim();
      if( mobile === ''){
        this.mobileModel = '';
        this.checkFormSendByMobile = true;
      }
      else if(mobile.length == 11){
        let mobileSplit:string[] = mobile.split('');
        if(mobileSplit[0] == '0' && mobileSplit[1]=='9'){
          if(isNaN(+mobile)){
            this.checkFormSendByMobile = false;
            //this.mobileModel = '';
          }
          else{
            this.checkFormSendByMobile = true;
          }
        }
        else{
          this.checkFormSendByMobile = false;
          //this.mobileModel = '';
        }
      }
      else if(mobile.length > 0 && mobile.length < 11){
        this.checkFormSendByMobile = false;
      }
    }

    if(inputName === 'userMsg'){
      if(this.msgModel.trim() === ''){
        this.msgModel = '';
        this.msgfilled = false;
        this.checkFormSendByMessage = false;
      }
      else if(this.msgModel.length > 20){
        this.checkFormSendByMessage = true;
      }
    }
    this.checkForm();
  }//end onBlur


  onChange(inputVal){
    if(inputVal === 'mobile'){
      this.mobilefilled = true;
      //console.log(this.mobileModel);
      
      let splitVal = [];
      splitVal = this.mobileModel.split('');

      for(let i = 0; i < splitVal.length; i++){
        if(isNaN(+splitVal[i])){
          this.mobileModel = '';
          this.mobilefilled = false;
          return;
        }
        if(splitVal[0] != "0"){
          this.mobileModel = '';
          this.mobilefilled = false;
          return;
        }
        if(i === 1){
          if(splitVal[i] != '9'){
            this.mobileModel = '';
            this.mobilefilled = false;
            return;
          }
        }
        
      }
    } 
  }//end onChange

  onSend(){
    this.objContact.firstName = this.firstNameModel;
    this.objContact.lastName = this.lastNameModel;
    this.objContact.mobileNumber = this.mobileModel;
    this.objContact.message = this.msgModel;
    this.showCaptcha = false;

    if(this.emailModel == ''){
      this.objContact.email = null;
    }
    else{
      this.objContact.email = this.emailModel;
    }
    this.objContact.workerSupport = this.selectType;
    this.showMessageDiv = true;
    this.httpService.postContactUsForm(this.objContact).subscribe(data =>{
      this.msg = data;
      this.firstNameModel = '';
      this.lastNameModel = '';
      this.mobileModel = '';
      this.msgModel = '';
      this.emailModel = '';
      this.capchaVerified = false;
    }, error => {
      this.capchaVerified = false;
      this.msgError = <Message>(error.error.error);
    });

    if(isPlatformBrowser(this.platformId)){
      let interval = setInterval(()=>{
        this.countSecond--;
        if(this.countSecond <= 0){
          this.countSecond = 120;
          this.showCaptcha = true;
          clearInterval(interval);
        }   
      }, 1000);
    }
  }

  checkForm(){
    if(this.capchaVerified && this.checkFormSendByEmail && this.checkFormSendByMobile && this.checkFormSendByMessage)
      return false;
    else
      return true;
  }

}
