import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from '../../../../class/toastMessage.class';
import { Router } from '@angular/router';
import { UrlRest } from '../../../../class/urlRest.class';
import { EnumUrls } from '../../../enum/enumUrls.enum';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})
export class DateTimeComponent implements OnInit {

  isLoading: boolean = true;

  jobcat3EName: string = '';
  jobcat3Name: string = '';
  jobcat3Id: number = 0;
  jobcat3Icon: string = '';

  emergencyEnable:boolean = false;

  userToken:string = '';

  emergancyQuestion: string = 'درخواست اورژانسی';
  emergancyAnswer: string = "درخواست فوری بعد از ۳ ساعت منقضی می شود.";
  timeLineTitr: string = "بازه زمانی شروع کار را تعیین کنید";

  lottieConfig: Object;
  anim: any;

  constructor(public shared: SharedService,
    private urlRest: UrlRest,
    private location: LocationStrategy,
    //public constVal: webappConstValue,
    //public storage: StorageService,
    private toastr: ToastrService,
    private toastMsg: ToastMessage,
    //private httpService: webappHttpService,
    private router: Router){
      //console.log('date-time runing in cunstructor');
      //console.log(shared.reqRej_preRegister);
      if(shared.reqRej_preRegister && shared.reqRej_jobcat3Select && shared.reqRej_title != ''){
        this.shared.stepNumber.next(4);
        this.shared.stepNumberMobile.next(2);
        this.emergencyEnable = shared.reqRej_preRegister.emergencyEnable;
        this.jobcat3EName = shared.reqRej_jobcat3Select.ename;
        this.jobcat3Name = shared.reqRej_jobcat3Select.name;
        this.jobcat3Id = shared.reqRej_jobcat3Select.id;
        this.jobcat3Icon = urlRest.imagePath + shared.reqRej_jobcat3Select.icon;
        this.setTimeAndDate();
        this.isLoading = false;
      }
      else{
        router.navigate([EnumUrls.address_home]);
      }

      this.lottieConfig = {
        path: 'assets/webappPics/emergency.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };  
  }//end constructor

  ngOnInit() {
    //console.log('date-time runing in onInit');
  }//end ngOnInit

  handleAnimation(anim: any) {
    this.anim = anim;
  }//end handleAnimation


  onEmergency() {
    this.shared.reqRej_emergancy = this.shared.reqRej_emergancy  ? false : true;
    //console.log("click on btn toggle...");
  }//end onEmergency


  onSelectDate(index) {
    if(!this.shared.dateList[index].disable){
      if (this.shared.selectedIndexOfDateList != index) {
        for (let i = 0; i < this.shared.arrCheckBoxTimePeriod.length; i++) {
          this.shared.arrCheckBoxTimePeriod[i] = false;
        }
      }
      this.shared.selectedIndexOfDateList = index;
      for (let i = 0; i < this.shared.dateList.length; i++) {
        this.shared.dateList[i].isSelected = false;
      }
      this.shared.dateList[index].isSelected = true;
    }
  }//end onSelectDate

  onPeriodTimeBox(inputID: number) {
    if (this.shared.arrCheckBoxTimePeriod[inputID - 1]) {
      this.shared.arrCheckBoxTimePeriod[inputID - 1] = false;
    }
    else {
      this.shared.arrCheckBoxTimePeriod[inputID - 1] = true;
    }
  }//end onPeriodTimeBox

  noPeriodTimeBox() { }//end noPeriodTimeBox

  setTimeAndDate(){
    let indexOfDatelistSelected:number = 0;
    for(let i = 0; i < this.shared.dateList.length; i++){
      if(this.shared.dateList[i].isSelected){
        indexOfDatelistSelected = i;
      }
    }
    for (let i = 0; i < this.shared.dateList.length; i++) {
      let arrayTemp: string[];
      if (i == 0) {
        arrayTemp = this.shared.reqRej_preRegister.day1.split("-");
      }
      else if (i == 1) {
        arrayTemp = this.shared.reqRej_preRegister.day2.split("-");
      }
      else if (i == 2) {
        arrayTemp = this.shared.reqRej_preRegister.day3.split("-");
      }
      else if (i == 3) {
        arrayTemp = this.shared.reqRej_preRegister.day4.split("-");
      }
      this.shared.dateList[i].dayInMonth = arrayTemp[2];
      if(i==0){
        this.shared.dateList[i].dayInWeak = "امروز";
      }
      else{
        this.shared.dateList[i].dayInWeak = arrayTemp[3];
      }
      this.shared.dateList[i].monthName = arrayTemp[4];
      if(indexOfDatelistSelected == i){
        this.shared.dateList[i].isSelected = true;
      }
      else{
        this.shared.dateList[i].isSelected = false;
      }
      this.shared.standardDateList[i] = arrayTemp[0] + "-" + arrayTemp[1] + "-" + arrayTemp[2];
    }

    this.shared.listTimesPeriodBox = this.shared.reqRej_preRegister.periods;
    if(this.shared.arrCheckBoxTimePeriod == null){
      this.shared.arrCheckBoxTimePeriod = [];
      for (let i = 0; i < this.shared.listTimesPeriodBox.length; i++) {
        this.shared.arrCheckBoxTimePeriod[i] = false;
      }
    }
    let findCheckboxTimeperiodTrue: boolean = false;
    for(let i=0; i < this.shared.reqRej_preRegister.periods.length; i++){
      if(this.shared.reqRej_preRegister.periods[i].activeToday){
        findCheckboxTimeperiodTrue = true;
      }
    }
    if(!findCheckboxTimeperiodTrue){
      this.shared.dateList[0].disable = true;
      this.shared.dateList[0].isSelected = false;
      this.shared.dateList[1].isSelected = true;
      this.shared.selectedIndexOfDateList = 1;
    }
  }//end setTimeAndDate

  onRegDate() {
    this.shared.listStringTimePeriod = [];
    let isSelectedChexkBox: boolean = false;
    for (let i = 0; i < this.shared.arrCheckBoxTimePeriod.length; i++) {
      if (!isSelectedChexkBox) {
        isSelectedChexkBox = this.shared.arrCheckBoxTimePeriod[i];
      }
    }

    if(!this.shared.reqRej_emergancy){
      for (let i = 0; i < this.shared.listTimesPeriodBox.length; i++) {
        if (this.shared.arrCheckBoxTimePeriod[i]) {
          this.shared.listStringTimePeriod.push(this.shared.listTimesPeriodBox[i].start + "-" + this.shared.listTimesPeriodBox[i].end);
        }
      }
    }

    if (!this.shared.reqRej_emergancy && !isSelectedChexkBox) {
      this.toastr.clear();
      this.toastr.error(this.toastMsg.msgErrorRequestStartTime, this.toastMsg.title4ErrorRequestStartTime);
    }
    else {
      this.router.navigate([EnumUrls.requestRegister_location]);
    }
  }//end onRegDate

  onBack() {
    this.location.back();
  }

}
