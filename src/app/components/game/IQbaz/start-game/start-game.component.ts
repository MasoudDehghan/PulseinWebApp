import { Bonus15 } from './../../../class/game/iqBaz/bonus15.class';
import { FestivalAnswer } from '../../../class/game/iqBaz/festivalAnswer.class';
import { UrlRest } from '../../../class/urlRest.class';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SharedService } from '../../../../services/shared/shared.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { IqbazService } from '../../../../services/game/iqbaz/iqbaz.service';
import { isPlatformBrowser } from '@angular/common';
import { ListPoints } from '../../../class/game/iqBaz/listPoints.class';
import { ngCopy } from 'angular-6-clipboard'; 
import { EnumBonusLevel } from '../../../class/game/enumIQBaz/enumBonusLevel';
import { CustomFunctionsService } from '../../../../services/functions/custom-functions.service';
import { FestivalResult } from '../../../class/game/iqBaz/festivalResult.class';
import { FestivalWinner } from '../../../class/game/iqBaz/festivalWinner.class';
import { Links } from '../../../class/links';


@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  listPointsTxt:ListPoints[] = [
    {name: "هر سوال آسون", value: "۵"},
    {name: "هر سوال متوسط", value: "۱۰"},
    {name: "هر سوال سخت", value: "۲۰"},
    {name: "دعوت از هر دوست", value: "0"},
    {name: "هر سفارش", value: "۵۰"}
  ];
  referalTextP1:string = "دعوت از هر دوست";
  referalTextP2:string = "امتیاز دارد.";

  stepLoading:boolean = false;

  lottieConfig: Object;
  anim: any;

  isLoading:boolean = true;
  step:number = 0; //0:strat game page, 1:get question and send answer, 2:show answer

  firstName:string = '';
  lastName:string = '';

  loginResult:FestivalResult = null;

  token:string = '';
  questionID:number = 0;
  questionPoint:number = 0;
  level:number = 1;
  question:string = '';
  opAns1:string = '';
  opAns2:string = '';
  opAns3:string = '';
  opAns4:string = '';
  isImageQuestion:boolean = false;
  imageQuestion:string = '';
  imagePath:string = '';
  resultAnswer:FestivalResult = null;
  nextValid:boolean = false;
  remainSeconds:number = 0;
  noAnswer:boolean = false;
  referalID: string = null;
  referalLink: string = 'https://pulsein.app/game/IqBaz/login/';
  rank:number = 0;
  totalScore:number = 0;
  referalScore:number = 0;
  invitePoint:number = 0;
  requestScore:number = 0;
  questionScore:number = 0;
  appScore:number = 0;
  linkScore:number = 0;
  showLink:boolean = false;
  linkPage:string = '';
  showAppInfo:boolean = false;
  directLink: string = '';
  //confirmTime:string = '';
  bonusList:Bonus15[] = [];
  indexSelectedThumbnailGift:number = 0;
  showBonusList:boolean = false;
  textBtnGift:string = 'جوایز شما';
  txtNext:string = 'سؤال بعدی';
  today:string = null;
  round:string = null;
  endGame:boolean = false;
  shwCodes:boolean = false;
  winnerFirstName:string = null;
	winnerLastName:string = null;
	winnerScore:number = null;
	winnerFirstName2:string = null;
  winnerLastName2:string = null;
  tokenExist:boolean = false;

  constructor(public shared: SharedService,
    public storage: StorageService, 
    private linksList: Links,
    private httpService: IqbazService,
    private customFunction: CustomFunctionsService,
    private urlRest: UrlRest,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router) {
      this.lottieConfig = {
        path: 'assets/image/game/iqBaz/loading.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
      if(isPlatformBrowser(this.platformId)){
        this.token = localStorage.getItem('userToken');
        if(!this.token){
          router.navigate(["/game/IqBaz/login"]);
        }
        else{
          this.tokenExist = true;
        }
      }
    }

  ngOnInit() {
    //console.log(this.storage.deviceType);
    this.directLink = this.linksList.directLinkCustomer;
    let tempBonusList:Bonus15[] = [
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''},
      {type:0, code:''}
    ];
    this.bonusList = tempBonusList;
    if(isPlatformBrowser(this.platformId)){
      this.referalID = sessionStorage.getItem('referralID');
      sessionStorage.removeItem('referralID');
      //this.token = localStorage.getItem('userToken');
    }
    this.imagePath = this.urlRest.imagePath;
    if(!this.token){
      this.router.navigate(["game/IqBaz/login"]);
    }
    else{
      if(!this.referalID){
        this.referalID = '0';
      }
      
      this.httpService.loginForGame(this.token, this.referalID).subscribe(res => {
        this.loginResult = res;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.nextValid = res.nextValid;
        this.remainSeconds = res.remainSeconds;
        this.referalLink = this.referalLink + res.referalId;
        this.rank = res.report.grade;
        this.totalScore = res.report.totalScore;
        this.requestScore = res.report.requestScore;
        this.referalScore = res.report.invitationScore;
        this.invitePoint = res.report.invitePoint;
        this.questionScore = res.report.questionScore;
        if(res.endGame){
          this.endGame = res.endGame;
        }
        if(res.shwCodes){
          this.shwCodes = res.shwCodes;
        }
        if(res.winnerFirstName){
          this.winnerFirstName = res.winnerFirstName;
          this.winnerLastName = res.winnerLastName;
          this.winnerScore = res.winnerScore;
        }
        if(res.winnerFirstName2){
          this.winnerFirstName2 = res.winnerFirstName2;
          this.winnerLastName2 = res.winnerLastName2;
        }
        if(res.report.appScore){
          this.appScore = res.report.appScore;
        }
        if(res.report.linkScore){
          this.linkScore = res.report.linkScore;
        }
        if(res.showLink){
          this.showLink = res.showLink;
        }
        if(res.link){
          this.linkPage = res.link;
        }
        if(res.showAppInfo){
          this.showAppInfo = res.showAppInfo;
        }
        if(res.today){
          this.today = this.customFunction.chanageNumbersToFarsi(res.today.toString());
        }
        if(res.round){
          this.round = this.customFunction.chanageNumbersToFarsi(res.round.toString());
        }
        

        //this.confirmTime = res.report.confirmTime;
        this.httpService.getLevelBonus(this.token).subscribe(res => {
          this.isLoading = false;
          //console..log("لیست جوایز");
          //console..log(res);
          for(let i = 0; i < res.length; i++){
            this.bonusList[i] = res[i];
          }
          //console..log(this.bonusList);
        }, error =>{
          //console.log("خطا در گرفتن لیست جوایز");
          //console..log(error);
          this.isLoading = false;
        });
        if(!res.nextValid){
          this.initTime(res.remainSeconds + 60);
        }
      }, error => {
        //console..log("خطای ورود در بازی");
        //console..log(error);
      });
    }
  }//end ngOnInit

  onLink(){
    if(isPlatformBrowser(this.platformId)){
      let strSplit:string[] = this.linkPage.split('/');
      let enameJobcat3:string = strSplit[strSplit.length-1];
      this.shared.iqbazCat3LinkPoint.next(enameJobcat3);
      //console.log('صفحه بازدید');
      //console.log(enameJobcat3);
      this.router.navigate(['/categories3/' + enameJobcat3]);
    }
  }//end onLink

  pointOfInvite():string{
    let fNumber:string = '۰';
    fNumber = this.customFunction.chanageNumbersToFarsi(this.invitePoint.toString());
    this.listPointsTxt[3].value = fNumber;
    return fNumber;
  }//end pointOfInvite

  styleMainDivGifts():string{
    let classDiv:string = '';
    if(!this.showBonusList){
      classDiv = 'hideBoxMainDivGifts';
    }
    else{
      if(this.shared.xWindow.getValue() >= 1000){
        classDiv = 'showBoxMainDivGifts1000'
      }
      else if(this.shared.xWindow.getValue() < 1000 && this.shared.xWindow.getValue() >= 850){
        classDiv = 'showBoxMainDivGifts850'
      }
      else if(this.shared.xWindow.getValue() < 850 && this.shared.xWindow.getValue() >= 620){
        classDiv = 'showBoxMainDivGifts620'
      }
      else if(this.shared.xWindow.getValue() < 620 && this.shared.xWindow.getValue() >= 400){
        classDiv = 'showBoxMainDivGifts400'
      }
      else if(this.shared.xWindow.getValue() < 400){
        classDiv = 'showBoxMainDivGifts300'
      }
    }
    return classDiv;
  }//end styleMainDivGifts

  onShowGifts(){
    if(!this.showBonusList){
      this.showBonusList = true;
      this.textBtnGift = "بستن"
    }
    else{
      this.showBonusList = false;
      this.textBtnGift = 'جوایز شما';
    }
  }


  showAllResult:boolean = false;
  showBtnAllRes:boolean = true;
  AllUser:FestivalWinner[] = [];
  onAllresult(){
    this.showBtnAllRes = false;
    this.showAllResult = false;
    this.stepLoading = true;
    this.AllUser = [];
    this.httpService.getReportAll(this.token).subscribe(res => {
      //console.log(res);
      this.showAllResult = true;
      this.stepLoading = false;
      this.AllUser = res.winners;
    });
  }//end onAllresult

  onCloseAllresult(){
    this.showBtnAllRes = true;
    this.showAllResult = false;
    this.AllUser = [];
  }//end onCloseAllresult


  /////////////////////////////////////
  showAllcodes:boolean = false;
  showBtnAllCodes:boolean = true;
  AllCodeList:string[] = [];
  onAllGiftCode(){
    this.showBtnAllCodes = false;
    this.showAllcodes = false;
    this.stepLoading = true;
    this.AllCodeList = [];
    this.httpService.getGiftsCode(this.token).subscribe(res => {
      //console.log(res);
      this.showAllcodes = true;
      this.stepLoading = false;
      this.AllCodeList = res;
    });
  }//end onAllresult

  onCloseAllGiftCode(){
    this.showBtnAllCodes = true;
    this.showAllcodes = false;
    //this.AllCodeList = [];
  }//end onCloseAllresult
  ////////////////////////////////////

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

  onthumbnail(index:number){
    if(this.bonusList[index].type != 0){
      this.indexSelectedThumbnailGift = index;
    }
  }

  setClassForThumbnailGifts(index:number):string{
    let boxClass:string = '';
    if(this.bonusList[index].type == 0){
      boxClass = 'thumbnailLock';
    }
    else{
      if(index == this.indexSelectedThumbnailGift){
        boxClass = 'thumbnailGiftSelected';
      }
      else{
        boxClass = "thumbnailGiftUnselected";
      }
    }
    return boxClass;
  }//end setClassForThumbnailGifts

  thumbnailBonus(bonusType:number){
    let src:string = '';
    let bonusTypeStr = bonusType.toString();
    if(bonusType == 0){
      src = "assets/image/game/iqBaz/lock.png";
    }
    else{
      if(bonusTypeStr == EnumBonusLevel.ChiliveryID){
        src = EnumBonusLevel.cheliveryThumbnail;
      }
      else if(bonusTypeStr == EnumBonusLevel.TicketID){
        src = EnumBonusLevel.TicketThumbnail;
      }
      else if(bonusTypeStr == EnumBonusLevel.IranRenterID){
        src = EnumBonusLevel.IranRenterThumbnail;
      }
      else{
        src = EnumBonusLevel.pulseinThumbnail;
      }
    }
    return src;
  }//end thumbnailBonus

  imageBonus(bonusType:number){
    let src:string = '';
    let bonusTypeStr = bonusType.toString();
    if(bonusType == 0){
      src = "assets/image/game/iqBaz/lock.png";
    }
    else{
      if(bonusTypeStr == EnumBonusLevel.ChiliveryID){
        src = EnumBonusLevel.cheliveryImg;
      }
      else if(bonusTypeStr == EnumBonusLevel.TicketID){
        src = EnumBonusLevel.TicketImg;
      }
      else if(bonusTypeStr == EnumBonusLevel.IranRenterID){
        src = EnumBonusLevel.IranRenterImg;
      }
      else{
        src = EnumBonusLevel.pulseinImg;
      }
    }
    return src;
  }//end imageBonus

  textBonus(bonusType:number):string{
    let TextBonus:string = '';
    let bonusTypeStr = bonusType.toString();
    if(bonusTypeStr == EnumBonusLevel.ChiliveryID){
      TextBonus = EnumBonusLevel.cheliveryText;
    }
    else if(bonusTypeStr == EnumBonusLevel.TicketID){
      TextBonus = EnumBonusLevel.tiketText;
    }
    else if(bonusTypeStr == EnumBonusLevel.IranRenterID){
      TextBonus = EnumBonusLevel.iranRentertext;
    }
    else if(bonusTypeStr == EnumBonusLevel.p_CarwashID ){
      TextBonus = EnumBonusLevel. p_CarwashText;
    }
    else if(bonusTypeStr == EnumBonusLevel.P_NezafatID ){
      TextBonus = EnumBonusLevel.P_NezafatText;
    }
    else if(bonusTypeStr == EnumBonusLevel. P_CarpetID ){
      TextBonus = EnumBonusLevel.P_CarpetText;
    }
    else if(bonusTypeStr == EnumBonusLevel.P_CoolerWaterID ){
      TextBonus = EnumBonusLevel.P_CoolerWaterText;
    }
    else if(bonusTypeStr == EnumBonusLevel.P_CoolerGazyID ){
      TextBonus = EnumBonusLevel.P_CoolerGazyText;
    }
    return TextBonus;
  }//end textBonus

  timeLimitBonus(bonusType:number):string{
    let limitBonus:string = '';
    let bonusTypeStr = bonusType.toString();
    if(bonusTypeStr == EnumBonusLevel.ChiliveryID){
      limitBonus = EnumBonusLevel.cheliveryLimitTime;
    }
    else if(bonusTypeStr == EnumBonusLevel.TicketID){
      limitBonus = EnumBonusLevel.tiketLimitTime;
    }
    else if(bonusTypeStr == EnumBonusLevel.IranRenterID){
      limitBonus = EnumBonusLevel.iranRenterLimitTime;
    }
    else if(bonusTypeStr == EnumBonusLevel.p_CarwashID ){
      limitBonus = EnumBonusLevel.p_CarwashLimitTime;
    }
    else if(bonusTypeStr == EnumBonusLevel.P_NezafatID ){
      limitBonus = EnumBonusLevel.P_NezafatLimitTime;
    }
    else if(bonusTypeStr == EnumBonusLevel. P_CarpetID ){
      limitBonus = EnumBonusLevel.P_CarpetLimitTime;
    }
    else if(bonusTypeStr == EnumBonusLevel.P_CoolerWaterID ){
      limitBonus = EnumBonusLevel.P_CoolerWaterLimitTime;
    }
    else if(bonusTypeStr == EnumBonusLevel.P_CoolerGazyID ){
      limitBonus = EnumBonusLevel.P_CoolerGazyLimitTime;
    }
    return limitBonus;
  }//end timeLimitBonus

  onBonus(bonusType){
    let bonusTypeStr = bonusType.toString();
    if(bonusTypeStr == EnumBonusLevel.ChiliveryID){
      window.location.href = EnumBonusLevel.cheliveryLink;
    }
    else if(bonusTypeStr == EnumBonusLevel.TicketID){
      window.location.href = EnumBonusLevel.tiketLink;
    }
    else if(bonusTypeStr == EnumBonusLevel.IranRenterID){
      window.location.href = EnumBonusLevel.iranRenterLink;
    }
    else if(bonusTypeStr == EnumBonusLevel.p_CarwashID ){
      window.location.href = EnumBonusLevel.p_CarwashLink;
    }
    else if(bonusTypeStr == EnumBonusLevel.P_NezafatID ){
      window.location.href = EnumBonusLevel.P_NezafatLink;
    }
    else if(bonusTypeStr == EnumBonusLevel. P_CarpetID ){
      window.location.href = EnumBonusLevel.P_CarpetLink;
    }
    else if(bonusTypeStr == EnumBonusLevel.P_CoolerWaterID ){
      window.location.href = EnumBonusLevel.P_CoolerWaterLink;
    }
    else if(bonusTypeStr == EnumBonusLevel.P_CoolerGazyID ){
      window.location.href = EnumBonusLevel.P_CoolerGazyLink;
    }
  }//end onBonus

  onNextQuestion(){
    this.isChangeColor = false;
    if(this.nextValid){
      this.isStart = true;
      this.stepLoading = true;
      this.httpService.getNextQuestion(this.token).subscribe(res => {
        this.step = 1;
        //console..log("سوال بعدی...");
        //console..log(res);
        this.questionID = res.id;
        this.questionPoint = res.correctScore;
        this.level = res.level;
        this.question = res.text;
        this.opAns1 = res.answer1;
        this.opAns2 = res.answer2;
        this.opAns3 = res.answer3;
        this.opAns4 = res.answer4;
        this.isImageQuestion = res.haveImage;
        this.imageQuestion = res.image;

        if(!this.isImageQuestion){
          this.setTimer20();
          this.stepLoading = false;
        }        
      }, error => {
        //console..log("خطای گرفتن سوالات در بازی");
        //console..log(error);
      });
    }
    else{
      this.router.navigate(["/game/IqBaz/end"]);
    }
  }//end onNextQuestion

  doLoadImageQ(){
    if(this.isImageQuestion && this.imageQuestion && this.imageQuestion != ''){
      this.setTimer20();
      this.stepLoading = false;
    }
  }//end doLoadImageQ


  onStart(){
    this.onNextQuestion();
  }//onStart

  indexAnswer:number = 0
  onAnswer(answerIndex:number){
    this.indexAnswer = answerIndex;
    this.stepLoading = true;
    clearInterval(this.interval20);
    this.reSec = 15;
    this.isStart = false;
    clearInterval(this.interval9);
    this.time9s = 4;
    this.showBtnNextQuestion = false;
    let answerInfo:FestivalAnswer = {
      questionId:this.questionID,
      answerIndex:answerIndex
    }
    this.httpService.postAnswer(answerInfo, this.token).subscribe(res => {
      //console..log("نتیجه جواب...");
      //console..log(res);
      this.step = 2;
      this.resultAnswer = res;
      this.nextValid = res.nextValid;
      this.stepLoading = false;
      this.setTimer9();
      
      //if(res.roundScore && res.bonusScore){
      if(!res.nextValid){
        //this.initTime(res.remainSeconds);
        sessionStorage.setItem('iqbazGameover', JSON.stringify(res));
        this.txtNext = "نتیجه بازی";
      }

      setTimeout(()=>{
        this.isChangeColor = true;
      },500);
      
    });
  }//end onAnswer

  isChangeColor:boolean = false;

  boxAnswerStyle(index:number):string{
    let divClass:string = '';
    if(index == this.indexAnswer){
      if(this.indexAnswer == this.resultAnswer.correctAnswerIndex){
        divClass = 'trueAnswer';
      }
      else{
        divClass = 'falseAnswer';
      }
    }
    else if(index == this.resultAnswer.correctAnswerIndex){
      divClass = 'trueAnswer';
    }
    else{
      divClass = "boxOptionAnswer";
    }
    return divClass;
  }//end boxAnswerStyle

  signAnswer(index:number):string{
    let signClass:string = '';
    if(index == this.indexAnswer){
      if(this.indexAnswer == this.resultAnswer.correctAnswerIndex){
        signClass = 'fas fa-check iTrue';
      }
      else{
        signClass = 'fas fa-times ifalse';
      }
    }
    else if(index == this.resultAnswer.correctAnswerIndex){
      signClass = 'fas fa-check iTrue';
    }
    else{
      signClass = "fas fa-circle iNotmantion";
    }
    return signClass;
  }

  currectAnswer(index:number):string{
    let ans:string = '';
    if(index == 1){
      ans = this.opAns1;
    }
    if(index == 2){
      ans = this.opAns2;
    }
    if(index == 3){
      ans = this.opAns3;
    }
    if(index == 4){
      ans = this.opAns4;
    }
    return ans;
  }

  reSec:number = 15;
  isStart:boolean = true;
  interval20: any = null;
  setTimer20(){
    this.noAnswer = false;
    if(isPlatformBrowser(this.platformId)){
      this.interval20 = setInterval(()=>{
        this.reSec--;
        if(this.reSec <= 0){
          this.isStart = false;
          clearInterval(this.interval20);
          this.onAnswer(0);
          this.noAnswer = true;
        }   
      }, 1000);
    }
  }//end setTimer20

  interval9:any = null;
  showBtnNextQuestion:boolean = false;
  time9s:number = 4;
  setTimer9(){
    if(isPlatformBrowser(this.platformId)){
      this.interval9 = setInterval(()=>{
        this.time9s--;
        if(this.time9s <= 0){
          this.showBtnNextQuestion = true;
          clearInterval(this.interval9);
        }
      }, 1000);
    }
  }

  /*--start timing---*/
  day:number = 0;
  hour:number = 0;
  minute:number = 0;
  second:number = 0;
  remind:number = 0;
  //dayText:string = '00';
  //hourText:string = '00';
  //minText:string = '00';
  hour10txt:string = '0';
  hour1txt:string = '0';
  min10txt:string = '0';
  min1txt:string = '0';
  sec1text:string = '0';
  sec10text:string = '0';
  //secondText:string = '00';

  initTime(inputMinutes:number){
    clearInterval(this.intervalRemaind);
    this.day = Math.floor(inputMinutes / (24*60*60));
    this.remind = inputMinutes - (this.day * (24*60*60));
    this.hour = Math.floor(this.remind / (60*60));
    this.remind = this.remind - (this.hour * (60*60));
    this.minute = Math.floor(this.remind / 60);
    this.second = this.remind - (this.minute * 60);

    if(this.second == 0 && this.minute == 0 && this.hour == 0 && this.day > 0){
      this.day = this.day - 1;
      this.hour = 23;
      this.minute = 59;
      this.second = 59;
    }
    else if(this.second == 0 && this.minute == 0 && this.hour > 0){
      this.hour = this.hour - 1;
      this.minute = 59;
      this.second = 59;
    }
    else if(this.second == 0 && this.minute > 0){
      this.minute = this.minute - 1;
      this.second = 59;
    }
    this.timerCustom();
    this.setFormatTimer();
  }

  intervalRemaind:any = null;
  timerCustom(){
      if(isPlatformBrowser(this.platformId)){
        this.intervalRemaind = setInterval(()=>{
          this.second--;
          if(this.second == 0 && this.minute > 0){
            this.second = 59;
            this.minute = this.minute - 1;
          }
          if(this.second == 0 && this.minute == 0 && this.hour > 0){
            this.hour = this.hour - 1;
            this.minute = 59;
            this.second = 59;
          }
          if(this.second == 0 && this.minute == 0 && this.hour == 0 && this.day > 0){
            this.day = this.day - 1;
            this.hour = 23;
            this.minute = 59;
            this.second = 59;
          }
          if(this.day <= 0 && this.hour <= 0 && this.minute <= 0 && this.second <= 0){
            this.day = 0;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
            clearInterval(this.intervalRemaind);
            this.step = 0;
            this.nextValid = false;
            if(this.second <= 0 && this.remainSeconds > -1){
              this.nextValid = true;
            }
          }
          this.setFormatTimer();
        }, 1000);
      }
  }
    
  setFormatTimer(){
    if(this.hour < 10){
      //this.hourText = '0'+this.hour;
      this.hour10txt = '0';
      this.hour1txt = this.hour.toString();
    }
    else{
      //his.hourText = this.hour.toString();
      this.hour10txt = (Math.floor(this.hour / 10)).toString();
      this.hour1txt = (this.hour % 10).toString();
    }

    if(this.minute < 10){
      //this.minText = '0'+this.minute;
      this.min10txt = '0';
      this.min1txt = this.minute.toString();
    }
    else{
      //this.minText = this.minute.toString();
      this.min10txt = (Math.floor(this.minute / 10)).toString();
      this.min1txt = (this.minute % 10).toString();
    }

    if(this.second < 10){
      //this.secondText = '0'+this.second;
      this.sec10text = '0';
      this.sec1text = this.second.toString();
    }
    else{
      //this.secondText = this.second.toString();
      this.sec10text = (Math.floor(this.second / 10)).toString();
      this.sec1text = (this.second % 10).toString();
    }
}
  /*--end timing---*/

  handleAnimation(anim: any) {
    this.anim = anim;
  }//end handleAnimation

  onCopy(){
    ngCopy(this.referalLink);
  }

}
