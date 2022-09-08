import { CustomFunctionsService } from './../../../../services/functions/custom-functions.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../../../services/shared/shared.service';
import { Router } from '@angular/router';
import { ngCopy } from 'angular-6-clipboard';
import { FestivalLevelBonus } from '../../../class/game/iqBaz/festivalLevelBonus.class';
import { EnumBonusLevel } from '../../../class/game/enumIQBaz/enumBonusLevel';
import { FestivalResult } from '../../../class/game/iqBaz/festivalResult.class';
import { StorageService } from '../../../../services/storage/storage.service';
import { Links } from '../../../class/links';


@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  token:string = '';
  referalID:string = '0';
  firstName:string = "";
  lastName:string = "";
  isLoading:boolean = true;
  //gameResult:FestivalResult = null;
  resultLocal:FestivalResult = null;
  referalLink:string = "https://pulsein.app/game/IqBaz/login/";
  bonus:FestivalLevelBonus = null;
  rank:number = 0;
  totalScore:number = 0;
  roundScore:number = 0;
  referalScore:number = 0;
  invitePoint:number = 0;
  requestScore:number = 0;
  appScore: number = 0;
  linkScore: number = 0;
  questionScore:number = 0;
  allUserCnt:number = 0;
  curectRound:number = 0;
  remindRound:number = 0;
  showLink:boolean = false;
  linkPage:string = '';
  showAppInfo:boolean = false;
  directLink: string = '';

  referalTextP1:string = "با دعوت از هر دوست";
  referalTextP2:string = "امتیاز هدیه بگیرید.";

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private customFunction: CustomFunctionsService,
    public storage: StorageService,
    private linksList: Links,
    private router: Router,
    public shared:SharedService) { }

  ngOnInit() {
    this.directLink = this.linksList.directLinkCustomer;
    if(isPlatformBrowser(this.platformId)){
      this.token = localStorage.getItem('userToken');
      this.resultLocal = JSON.parse(sessionStorage.getItem("iqbazGameover"));
      this.setTimerGameOver();
    }

    if(this.token && this.resultLocal){
      sessionStorage.removeItem("iqbazGameover");
      this.initTime(this.resultLocal.remainSeconds);
      this.firstName = this.resultLocal.firstName;
      this.lastName = this.resultLocal.lastName;
      this.referalLink = this.referalLink + this.resultLocal.referalId;
      this.bonus = this.resultLocal.bonus;
      this.rank = this.resultLocal.report.grade;
      this.totalScore = this.resultLocal.report.totalScore;
      this.roundScore = this.resultLocal.report.roundScore;
      this.questionScore = this.resultLocal.report.questionScore;
      if(this.resultLocal.report.appScore){
        this.appScore = this.resultLocal.report.appScore;
      }
      if(this.resultLocal.report.linkScore){
        this.linkScore = this.resultLocal.report.linkScore;
      }
      this.referalScore = this.resultLocal.report.invitationScore;
      this.requestScore = this.resultLocal.report.requestScore;
      this.invitePoint = this.resultLocal.report.invitePoint;
      this.allUserCnt = this.resultLocal.report.winnerCnt;
      this.curectRound = this.resultLocal.round;
      this.remindRound = 15 - this.resultLocal.round;
      if(this.resultLocal.showLink){
        this.showLink = this.resultLocal.showLink;
      }
      if(this.resultLocal.link){
        this.linkPage = this.resultLocal.link;
      }
      if(this.resultLocal.showAppInfo){
        this.showAppInfo = this.resultLocal.showAppInfo;
      }
      this.isLoading = false;
    }
    else if(!this.token){
      this.router.navigate(["/game/IqBaz/login"]);
    }
    else if(!this.resultLocal){
      this.router.navigate(["/game/IqBaz/start"]);
    }
    
  }//end ngOnInit

  farsiNumber(value:number):string{
    let fNumber:string = '۰';
    fNumber = this.customFunction.chanageNumbersToFarsi(value.toString());
    return fNumber;
  }

  pointOfInvite():string{
    let fNumber:string = '۰';
    fNumber = this.customFunction.chanageNumbersToFarsi(this.invitePoint.toString());
    return fNumber;
  }//end pointOfInvite

  onCopy(){
    ngCopy(this.referalLink);
  }

  imageBonus(bonusType:number):string{
    let src:string = '';
    let bonusTypeStr = bonusType.toString();
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

  gameOverShowStep1:boolean = true;
  setTimerGameOver(){
    if(isPlatformBrowser(this.platformId)){
      let interval = setInterval(()=>{
        this.gameOverShowStep1 = !this.gameOverShowStep1;
      }, 300);
    }
  }//end setTimerGameOver

  rankMedal():string{
    let src:string = "";
    if(this.rank == 1){
      src = "assets/image/game/iqBaz/rank1.png";
    }
    else if(this.rank == 2){
      src = "assets/image/game/iqBaz/rank2.png";
    }
    else if(this.rank == 3){
      src = "assets/image/game/iqBaz/rank3.png";
    }
    else{
      src = "assets/image/game/iqBaz/rank4.png";
    }
    return src;
  }

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

  /*--start timing---*/
  day:number = 0;
  hour:number = 0;
  minute:number = 0;
  second:number = 0;
  remind:number = 0;
  dayText:string = '00';
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
            //this.basicData.endTimer.next(true);
            this.day = 0;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
            clearInterval(this.intervalRemaind);
            this.router.navigate(["/game/IqBaz/start"]);
          }
          this.setFormatTimer();
        }, 1000);
      }
  }
    
  setFormatTimer(){
      if(this.day < 10){
        this.dayText = '0'+this.day;
      }
      else{
        this.dayText = this.day.toString();
      }
  
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

}
