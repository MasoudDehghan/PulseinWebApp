import { TypeInfo } from './../../components/webApp/class/backend/typeInfo.class';
import { InvoiceV } from './../../components/webApp/class/backend/invoiceV.class';
import { Router } from '@angular/router';
import { PulseV } from './../../components/webApp/class/backend/pulseV.class';
import { OfferV } from './../../components/webApp/class/backend/offerV.class';
import { CityV } from './../../components/webApp/class/backend/cityV.class';
import { CDashboardBanner } from './../../components/webApp/class/backend/cDashboardBanner.class';
import { CDashboardCat3Info } from './../../components/webApp/class/backend/cDashboardCat3Info.class';
import { CDashboardDiscount } from './../../components/class/CDashboardDiscount.class';
import { AnswerV } from './../../components/webApp/class/backend/answerV.class';
import { PreRegisterRequestResult } from './../../components/webApp/class/backend/preRegisterRequestResult.class';
import { CustomFunctionsService } from './../functions/custom-functions.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { JobCategory2V } from '../../components/class/jobCategory2V.class';
import { JobCategory3V } from '../../components/class/jobCategory3V.class';
import { isPlatformBrowser } from '@angular/common';
import { AreaV } from '../../components/webApp/class/backend/areaV.class';
import { ConstValue } from '../../components/class/constValue';
import { imgUpload } from '../../components/webApp/class/imgUpload.class';
import { RequestGetDate } from '../../components/webApp/class/requestGetDate.class';
import { TimePeriod } from '../../components/webApp/class/backend/timePeriod.class';
import { Cat3QuestionV } from '../../components/webApp/class/backend/cat3QuestionV.class';
import { Answer } from '../../components/webApp/class/answer.class';
import { QuestionAnswer } from '../../components/webApp/class/backend/questionAnswer.class';
import { CandidateLocationV } from '../../components/webApp/class/backend/candidateLocationV.class';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  citySelected:TypeInfo = null;

  noScroll:BehaviorSubject<boolean> = new BehaviorSubject(false);
  requestID:number = 0;
  selectedWorkerName:BehaviorSubject<string> = new BehaviorSubject('');
  selectedOffer:BehaviorSubject<OfferV> = new BehaviorSubject(null);
  showModalQuestionRefuseOffer:BehaviorSubject<boolean> = new BehaviorSubject(false);
  showModalQuestionAcceptOffer:BehaviorSubject<boolean> = new BehaviorSubject(false);
  showModalQuestionStartDoAck:BehaviorSubject<boolean> = new BehaviorSubject(false);
  requestInfo:PulseV = null;
  stateNameRequest:BehaviorSubject<string> = new BehaviorSubject('');
  stateIdRequest:BehaviorSubject<number> = new BehaviorSubject(1);
  sharedFinalInvoice:BehaviorSubject<InvoiceV> = new BehaviorSubject(null);

  offerList:OfferV[] = [];

  jobcat3FromLandingPage:boolean = false;

  userToken:string = '';
  imgPath: string = '';

  showModalSelectArea:BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectedArea:BehaviorSubject<AreaV> = new BehaviorSubject(null);

  showModalCandidateLocation:BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectedLocation:BehaviorSubject<CandidateLocationV> = new BehaviorSubject(null);

  discountList:BehaviorSubject<CDashboardDiscount[]> = new BehaviorSubject([]);
  usefulJobcatList:BehaviorSubject<CDashboardCat3Info[]> = new BehaviorSubject([]);
  favoriteJobcatList:BehaviorSubject<CDashboardCat3Info[]> = new BehaviorSubject([]);
  bannerList:BehaviorSubject<CDashboardBanner[]> = new BehaviorSubject([]);

  //IQbaz
  iqbazBanerShow:BehaviorSubject<boolean> = new BehaviorSubject(false);
  iqbazHour:BehaviorSubject<number> = new BehaviorSubject(0);
  iqbazDay:BehaviorSubject<number> = new BehaviorSubject(0);

  //activeOneRequest: boolean = false;

  isBack: boolean = true;
  stepNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  stepNumberMobile: BehaviorSubject<number> = new BehaviorSubject(0);
  category2: JobCategory2V;
  listSearchResult: BehaviorSubject<object[]> = new BehaviorSubject([]);
  pagePath: BehaviorSubject<string> = new BehaviorSubject('');

  hasActiveRequest: BehaviorSubject<boolean> = new BehaviorSubject(false);
  //userIP: BehaviorSubject<string> = new BehaviorSubject('IR');

  showFab: BehaviorSubject<boolean> = new BehaviorSubject(true);

  isWebAppPage:BehaviorSubject<boolean> = new BehaviorSubject(false);
  inPageDownload: BehaviorSubject<boolean> = new BehaviorSubject(false);

  xWindow: BehaviorSubject<number> = new BehaviorSubject(1000);
  yWindow: BehaviorSubject<number> = new BehaviorSubject(1000);

  tokenFirebace:string = '';
  showFirebaseNotification:BehaviorSubject<boolean> = new BehaviorSubject(false);

  isHomePage:BehaviorSubject<boolean> = new BehaviorSubject(false);

  changeArea: BehaviorSubject<AreaV> = new BehaviorSubject(null);
  lng: number = 0;
  lat: number = 0;

  iqbazCat3LinkPoint: BehaviorSubject<string> = new BehaviorSubject(null);

  showModalDiscount:BehaviorSubject<boolean> = new BehaviorSubject(false);
  btnTextCheckDiscount:BehaviorSubject<string> = new BehaviorSubject("بررسی کد تخفیف");
  discountCode:BehaviorSubject<string> = new BehaviorSubject(null);
  discountPercent:BehaviorSubject<string> = new BehaviorSubject(null);
  discountMaxCredit:BehaviorSubject<string> = new BehaviorSubject(null);
  checkDiscountInLogin:BehaviorSubject<boolean> = new BehaviorSubject(false);
  resDiscountCheckWithLogin:BehaviorSubject<boolean> = new BehaviorSubject(false);

  RequestInfoMobile:BehaviorSubject<PulseV> = new BehaviorSubject(null);

  isLoadingFullPageLatti:BehaviorSubject<boolean> = new BehaviorSubject(false);

  //requestCode:BehaviorSubject<string> = new BehaviorSubject(null);

  reqRej_jobcat2Select:JobCategory2V = null;
  reqRej_preRegister:PreRegisterRequestResult = null;
  reqRej_jobcat3Select:JobCategory3V = null;
  /*--start var of request-questions.component--*/
  listQuestionsFinished:Cat3QuestionV[] = [];
  listAnswer:Answer[] = [];
  listQuestionAnswer:QuestionAnswer[] = [];
  listAnswerV:AnswerV[] = null;
  showDescription:boolean = true;
  /*--end var of request-questions.component--*/
  /*==============*/
  /*--start var of extar-description.component--*/
  reqRej_title:string = '';
  reqRej_description:string = '';
  reqRej_photoList: string[] = [];
  imgUrlsList: imgUpload[] = [];
  uploadDataList: File[] = [];
  /*--end var of extar-description.component--*/
  /*==============*/
  /*--start var of date-time.component--*/
  reqRej_emergancy:boolean = false;
  selectedIndexOfDateList: number = 0;
  listTimesPeriodBox: TimePeriod[] = [];
  dateList: RequestGetDate[] = [
    { dayInWeak: '', dayInMonth: '', monthName: '', isSelected: true, disable: false },
    { dayInWeak: '', dayInMonth: '', monthName: '', isSelected: false, disable: false },
    { dayInWeak: '', dayInMonth: '', monthName: '', isSelected: false, disable: false },
    { dayInWeak: '', dayInMonth: '', monthName: '', isSelected: false, disable: false }
  ];
  standardDateList: string[] = ['', '', '', ''];
  arrCheckBoxTimePeriod: boolean[] = null;
  listStringTimePeriod: string[] = [];
  /*--end var of date-time.component--*/ 
  /*==============*/
  /*--start var of request-location.component--*/
  savePalceID:number = null;
  savePlaceTitle:string = '';
  isSavePlace:boolean = false;
  reqReg_lng: number = 51.370762;
  reqReg_lat: number = 35.706742;
  areaID:number = null;
  areaName:string = '';
  address:string = '';
  destination:string = '';
  /*--end var of request-location.component--*/
  /*==============*/
  /*--start var of request-summary.component--*/
  requestRegister:PulseV = null;
  /*--end var of request-summary.component--*/

  cancelRequestInfo:PulseV = null;
  cancelRequest_jobcat3:JobCategory3V = null;

  onResultModalSearch: BehaviorSubject<boolean> = new BehaviorSubject(false);

  showModalFolloweRequest: BehaviorSubject<boolean> = new BehaviorSubject(false);
  firstTimeShowModalFolloweRequest: BehaviorSubject<boolean> = new BehaviorSubject(true);

  showDiscountModal: BehaviorSubject<boolean> = new BehaviorSubject(false);

  candidateLocationEditInfo: CandidateLocationV;
  cityListInEditCandidateLocation:CityV[] = [];

  takhfifanToken:string = null;

  constructor(private constVal: ConstValue, 
    private customFunction: CustomFunctionsService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.lng = constVal.lng;
    this.lat = constVal.lat;
  }

  getPagePath():string{
    let pathName:string = '';
    if (isPlatformBrowser(this.platformId)){
      let path:string = document.URL;
      let str: string[] = path.split('/');
      if(str.indexOf('categories2') == -1 && str.indexOf('categories3') == -1){
        pathName = str[str.length-1];
      }
      else{
        if(str.indexOf('categories2') != -1){
          pathName = 'categories2';
        }
        else if(str.indexOf('categories3') != -1){
          pathName = 'categories3';
        }
      } 
    }
    return pathName;
  }//end getPagePath

  checkDiscountValue(discountCode:string, percent:number, maxCredit:number):string[]{
    let info:string[] = ['', '' ,'']; //info[0]:discountCodeText, info[1]:farsiPercent, info[2]:discountMaxCredit
    info[0] = discountCode;
    info[1] = this.customFunction.chanageNumbersToFarsi(percent.toString());
    info[2] = this.customFunction.formatAmountMoney(this.customFunction.chanageNumbersToFarsi(maxCredit.toString()));
    this.discountCode.next(info[0]);
    this.discountPercent.next(info[1]);
    this.discountMaxCredit.next(info[2]);
    return info;
  }//end checkDiscountValue

  removeReserveDiscountCode(){
    this.discountCode.next(null);
    this.discountMaxCredit.next(null);
    this.discountPercent.next(null);
    this.btnTextCheckDiscount.next("بررسی کد تخفیف");
  }//end removeReserveDiscountCode

  clearVareablesForRequestRegister(){
    this.reqRej_jobcat2Select = null;
    //this.reqRej_preRegister = null;
    //this.reqRej_jobcat3Select = null;
    /*--start var of request-quesy=tions.component--*/
    this.listQuestionsFinished = [];
    this.listAnswer = [];
    this.listQuestionAnswer = [];
    this.listAnswerV = null;
    this.showDescription = false;
    /*--end var of request-quesy=tions.component--*/
    /*==============*/
    /*--start var of extar-description.component--*/
    this.reqRej_title = '';
    this.reqRej_description = '';
    this.reqRej_photoList = [];
    this.imgUrlsList = [];
    this.uploadDataList = [];
    /*--end var of extar-description.component--*/
    /*==============*/
    /*--start var of date-time.component--*/
    this.reqRej_emergancy = false;
    this.selectedIndexOfDateList = 0;
    this.listTimesPeriodBox = [];
    this.dateList = [
      { dayInWeak: '', dayInMonth: '', monthName: '', isSelected: true, disable: false },
      { dayInWeak: '', dayInMonth: '', monthName: '', isSelected: false, disable: false },
      { dayInWeak: '', dayInMonth: '', monthName: '', isSelected: false, disable: false },
      { dayInWeak: '', dayInMonth: '', monthName: '', isSelected: false, disable: false }
    ];
    this.standardDateList = ['', '', '', ''];
    this.arrCheckBoxTimePeriod = null;
    this.listStringTimePeriod = [];
    /*--end var of date-time.component--*/
    /*==============*/
    /*--start var of request-location.component--*/
    this.savePalceID = null;
    this.savePlaceTitle = '';
    this.isSavePlace = false;
    this.reqReg_lng = 51.370762;
    this.reqReg_lat = 35.706742;
    this.areaID = null;
    this.areaName = '';
    this.address = '';
    this.destination = '';
    /*--end var of request-location.component--*/
    /*==============*/
    /*--start var of request-summary.component--*/
    this.requestRegister = null;
    /*--end var of request-summary.component--*/
  }//end clearVareablesForRequestRegister

  clearQuestionsList(selector:number){
    this.listQuestionsFinished = [];
    this.listAnswer = [];
    this.listQuestionAnswer = [];
    this.listAnswerV = null;
    if(selector == 0){
      //0:show description state
      this.showDescription = false;
    }
    else if(selector == 1){
      //1:not show description state
      this.showDescription = false;
    }
  }//end clearQuestionsList

  routingByStateRequest(stateID:number){
    if(stateID == 1){
      //وضعیت : منتظر ارائه پیشنهاد
      this.router.navigate(["/followRequest/waitToOffer"]);
    }
    else if(stateID == 14){
      //وضعیت : منتظر تأیید شروع
      this.router.navigate(["/followRequest/waitDoAck"]);
    }
    else if(stateID == 10){
      //وضعیت : درحال انجام
      this.router.navigate(["/followRequest/ongoing"]);
    }
    else if(stateID == 12){
      //وضعیت : منتظر پرداخت
      this.router.navigate(["/followRequest/waitToPayment"]);
    }
    else if(stateID == 5){
      //وضعیت : منتظر نظرسنجی
      this.router.navigate(["/followRequest/survey"]);
    }
  }//end routingByStateRequest

}
