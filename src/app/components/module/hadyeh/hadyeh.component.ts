import { Component, OnInit, ViewEncapsulation, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//import { trigger, transition, animate, style, state } from '@angular/animations';
import { HttpService } from '../../../services/http/http.service';
import { Message } from '../../class/mesage.class';

@Component({
  selector: 'app-hadyeh',
  templateUrl: './hadyeh.component.html',
  styleUrls: ['./hadyeh.component.css'],
  /*
  animations: [
    trigger('anim', [
      state('state1', style({ 'max-height': '100%', transform: 'rotate(10deg)' })),
      state('state2', style({ 'max-height': '100%', transform: 'rotate(-10deg)' })),
      transition('state1 => state2', animate('500ms ease-out')),
      transition('state2 => state1', animate('500ms ease-out'))
    ])
  ],
  */
  encapsulation: ViewEncapsulation.None
})


export class HadyehComponent implements OnInit {

  @Input() userType: string;

  backgroundImage: string = "assets/image/backgroundGift.jpg";

  state: string = 'state1';
  dialogDisplay: boolean = false;
  btnDisplay: boolean = false;
  mobile: string = '';
 // letGetHadye: boolean = false;
  limitsendMobileInDay: number = 1000;
  showMessage: boolean = false;
  counstTimer:number = 60;
  countSecond: number;
  activeButton:boolean = true;
  showTimer:boolean = false;

  text1ForClient: string = "همین حالا اپلیکیشن پالسین را نصب کنید و ده هزار تومان شارژ هدیه دریافت کنید";
  text1ForWorker: string = "همین حالا اپلیکیشن پالسین را نصب کنید و پس از تأیید نهایی بیست هزار تومان شارژ هدیه دریافت کنید";
  text2ForClient: string = "با نصب نرم افزار بر روی موبایل خود ده هزار تومان شارژ اولیه رایگان دریافت کنید";
  text2ForWorker: string = "با نصب نرم افزار بر روی موبایل خود بیست هزار تومان شارژ اولیه رایگان دریافت کنید";
  textSuccessMsg: string = "به زودی لینک دانلود برای شما پیامک میشود";
  textErrorMsg: string = "شماره موبایل شما معتبر نمی باشد";

  constructor(private httpServer: HttpService, 
      public msg: Message, 
      public msgError: Message, 
      @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    //this.checkLocal();
    //console.log(this.userType);
    if(this.userType == 'client'){
      this.backgroundImage = "assets/image/backgroundGift.jpg";
    }
    else{
      this.backgroundImage = "assets/image/backgroundGifEx.jpg";
    }
    this.countSecond = this.counstTimer;
    //this.autoAnimation();
  }

  /*
  autoAnimation() {
    if (isPlatformBrowser(this.platformId)){
      setInterval(() => {
        if (this.state == 'state1') {
          this.state = 'state2';
        }
        else {
          this.state = 'state1';
        }
      }, 500);
    }
  }
  */

  showDialog() {
    this.dialogDisplay = true;
  }

  sendMobile() {
    this.msg.code = 10000;
    this.msgError.code = 10000;
    this.showMessage = true;
    if (this.mobile.length == 11) {
      let zero = this.mobile.slice(0, 1);
      let nine = this.mobile.slice(1, 2);
      let mobNumber: number = +this.mobile.slice(1, 11);
      if (zero == '0' && nine == '9' && !isNaN(mobNumber)) {
        //send mobile
        /*
        if (isPlatformBrowser(this.platformId)) {

          this.setLocalCounter();
          this.checkLocal();
        }
        */
        if (this.userType === 'client') {
          this.httpServer.getClienMobile(this.mobile).subscribe(data => {
            this.msg = data;
          }, error => {
            this.msgError = <Message>(error.error.error);
          });
        }
        else {
          this.httpServer.getExpertMobile(this.mobile).subscribe(data => {
            this.msg = data;
          }, error => {
            this.msgError = <Message>(error.error.error);
          });
        }
        //-------
      }
      else {
        this.mobile = '';
      }
    }
    else {
      this.mobile = '';
    }

    this.activeButton = false;
    this.showTimer = true;
    if (isPlatformBrowser(this.platformId)){
      let interval = setInterval(()=>{
        this.countSecond--;
        if(this.countSecond <= 0){
          this.countSecond = this.counstTimer;
          this.activeButton = true;
          this.showTimer = false;
          clearInterval(interval);
        }  
      }, 1000);
    }
    
  }


  onChange() {
    this.showMessage = false;
  }

/*
  checkLocal() {
    if (isPlatformBrowser(this.platformId)){
      this.letGetHadye = false;
    let nowDay: string = new Date().getDate().toString();
    let storageDay: string = '';
    if (localStorage.getItem("setDayHadye") === null) {
      localStorage.setItem("setDayHadye", nowDay);
      this.letGetHadye = true;
    }
    else {
      storageDay = localStorage.getItem("setDayHadye");
      if (storageDay != nowDay) {
        localStorage.removeItem("setDayHadye");
        localStorage.removeItem("setCountHadye");
        this.letGetHadye = true;
      }
      else if (storageDay == nowDay && Number(localStorage.getItem("setCountHadye")) < (this.limitsendMobileInDay)) {
        this.letGetHadye = true;
      }
    }
    }
  }

  setLocalCounter() {
    if (isPlatformBrowser(this.platformId)){
      let counter: number = 0;
    if (localStorage.getItem("setCountHadye") != null) {
      counter = Number(localStorage.getItem("setCountHadye"));
    }
    if (counter < this.limitsendMobileInDay) {
      counter++;
      let c: string = counter.toString();
      localStorage.setItem("setCountHadye", c);
    }
    }
  }
  */

}
