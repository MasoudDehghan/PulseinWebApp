import { JobCategory3V } from './components/class/jobCategory3V.class';
import { BroadcastMessageService } from './components/webApp/services/broadcastMsg.service';
import { StorageService } from './services/storage/storage.service';
import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { BasicDataService } from './services/basicData/basic-data.service';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { WebSocketSubject, webSocket } from 'rxjs/websocket';
import { NotificationContent } from './components/webApp/class/notificationContent.class';
import { Howl } from 'howler';
import { NotificationTypeEnum } from './components/webApp/enum/notificationType.enum';
import * as notificationMsgList from './components/webApp/class/notificationMsgList';
import { MsgWorker } from './components/webApp/class/msgWorker.class';
import { PushNotificationsService } from './components/webApp/services/pushNotification.service';
import { ToastrService } from 'ngx-toastr';
import { webappConstValue } from './components/webApp/class/webappConstVal';
import { SharedService } from './services/shared/shared.service';
import { UrlRest } from './components/class/urlRest.class';
import { MessagingService } from './services/messaging/messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isErrSoket:boolean = false;
  socket$: WebSocketSubject<NotificationContent>;
  year: number = 0;
  month: number = 0;
  day: number = 0;
  hour: string = '00';
  minuets: string = '00';
  isDiviceMobile = false;
  message:any = null;

  constructor(
    private basicData: BasicDataService,
    public shared: SharedService,
    private router: Router,
    private urlRest: UrlRest,
    private storage: StorageService,
    private _pushNotificationService: PushNotificationsService,
    private toastr: ToastrService,
    private deviceService: DeviceDetectorService,
    private constVal: webappConstValue,
    private brodcastMsg: BroadcastMessageService,
    public messagingService: MessagingService,
    @Inject(PLATFORM_ID) private platformId: Object)
  {
    this.deviceDetectorFunction();
    this.isDiviceMobile = this.deviceService.isMobile();
    if(!this.isDiviceMobile){
      this._pushNotificationService.requestPermission();
    }
    shared.imgPath = urlRest.imagePath;
  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.shared.xWindow.next(window.innerWidth);
      this.shared.yWindow.next(window.innerHeight);

    /*-----start get firebaseToken--------*/
    this.messagingService.tokeFB.subscribe(token => {
      //this.tokenFireBase = token;
      this.shared.tokenFirebace = token;
      //console.log("------------***-----------");
      //console.log(token);
    });
    this.messagingService.getPermission();
    this.messagingService.receiveMessage();
    //this.message = this.messagingService.currentMessage;
    this.messagingService.currentMessage.subscribe(res =>{
      this.message = res;
      //console.log("پیامک دریافتی برابر است با: ");
      //console.log(this.message);
    })
    /*------------end get firebaseToken------------*/

      this.brodcastMsg.itemsHandler.subscribe(res => {
        res.forEach(item =>{
          this.toastr.error(item,
            "خطا", {
              timeOut: this.constVal.notificationTimeOut
            });
        });
        
      });

      
      this.shared.hasActiveRequest.subscribe(res => {
        //console.log("+++ appcomponent +++ res: "+ res);
        //this.shared.activeOneRequest = res;
      });
    
      //this.basicData.getjobCats();
      this.basicData.initData();

      this.storage.token.subscribe(res => {
        //console.log("*** token.subscribe ***");
        if(res && res != ''){
          //console.log("***storage.token ** res");
          //console.log(res);
          this.initSocket();
          
          setInterval(()=>{
            //console.log("*** setInterval ***");
            if(this.isErrSoket){
              //console.log("isErrorSocket** : "+ this.isErrSoket);
              this.initSocket();
            }
          }, 60000); 
        }
      });
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platformId)) {
          if (window){
            (<any>window).ga('set', 'page', event.urlAfterRedirects);
            (<any>window).ga('send', 'pageview');
          }
        }
      }
    });

  }//end ngOnInit

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser(this.platformId)) {
      //if (window){
        this.shared.xWindow.next(window.innerWidth);
        this.shared.yWindow.next(window.innerHeight);
      //}
    }
  }


  deviceDetectorFunction(){
    const isMobile:boolean = this.deviceService.isMobile();
    const isTablet:boolean = this.deviceService.isTablet();
    const isDesktop:boolean = this.deviceService.isDesktop();
    const os:string = this.deviceService.os.toLowerCase();
    //console.log(os);
    //console.log("isMobile: "+isMobile);
    //console.log("isTablet: "+isTablet);
    //console.log("isDesktop: "+isDesktop);
    //console.log("os: "+os);

    // 2:PC - 3:Android Web - 4:IOS develop  (pwa=> 5:PC Pwa- 6:Android Pwa - 7:IOS Pwa)
    this.storage.osDevice = os;
    if(isMobile){
      if(os == 'android'){
        this.storage.deviceType = 3;
      }
      else{
        this.storage.deviceType = 4;
      }
    }
    else if(isTablet){
      if(os == 'android'){
        this.storage.deviceType = 3;
      }
      else{
        this.storage.deviceType = 4;
      }
    }
    else if(isDesktop){
      this.storage.deviceType = 2;
    }
  }//end deviceDetectorFunction



  /*---start socket----*/
  initSocket(){
   //console.log("do initSocket !!!");
   this.isErrSoket = false;
   this.socket$ = webSocket(this.urlRest.webSocketAddress);
   let tokenRequest: NotificationContent = new NotificationContent();
   tokenRequest.title = localStorage.getItem('userToken');
   //console.log("tokenRequest.Title: "+ tokenRequest.title);
   this.socket$.next(tokenRequest);
 
   this.socket$.subscribe(
       (socketData) => {
         //console.log("**===socket$.subscribe===**");
         let notification: NotificationContent = <NotificationContent>socketData;
         let typeID = notification.typeId;
         let rcvNotificationTitle = notification.title;
         let isCommercial = notification.isCommercial;
         let commercial = notification.commercial;
         var sound = new Howl({
           src: ['../../../../assets/not.mp3']
         });
 
         if(isCommercial){
           this.notifyUser(commercial.title, commercial.content);
           if(commercial.sound){
             sound.play();
           }
         }
         else{
           switch (typeID) {
             case NotificationTypeEnum.Notification_Type_NewSuggestion:
               this.triggerRefreshData(typeID);
               this.notifyUser(notificationMsgList.newSuggestionTitle, notificationMsgList.newSuggestionContent);
               break;
             case NotificationTypeEnum.Notification_Type_RemoveSuggestion:
               this.triggerRefreshData(typeID);
               this.notifyUser(notificationMsgList.removeSuggestionTitle, rcvNotificationTitle);
               break;
             case NotificationTypeEnum.Notification_Type_PulseStateChanged:
               this.triggerRefreshData(typeID);
               this.notifyUser(notificationMsgList.pulseStateChangeTitle, notificationMsgList.pulseStateChangeContent);
               sound.play();
               break;
             case NotificationTypeEnum.Notification_Type_MsgForPulse:
               this.storage.rsvMsgFromWorker.next(rcvNotificationTitle);
               if(rcvNotificationTitle != ''){
                 this.year = new Date().getFullYear();
                 this.month = new Date().getMonth() + 1;
                 this.day = new Date().getDate();
                 this.hour = new Date().getHours().toString();
                 this.minuets = new Date().getMinutes().toString();
                 if(this.hour.length < 2){
                   this.hour = "0"+this.hour;
                 }
                 if(this.minuets.length < 2){
                   this.minuets = "0"+this.minuets;
                 }
                 let msgWorker:MsgWorker = {
                   date: this.year + "/" + this.month + "/" +this.day,
                   time: this.hour + ":" + this.minuets,
                   text: rcvNotificationTitle
                 }
                 this.storage.listMsgRsvWorker.push(msgWorker);
                 localStorage.setItem("workerMsg", JSON.stringify(this.storage.listMsgRsvWorker));
               }
               this.notifyUser(notificationMsgList.msgForPulseTitle, rcvNotificationTitle);
               break;
             case NotificationTypeEnum.Notification_Type_RequestExpire:
               this.triggerRefreshData(typeID);
               this.notifyUser(notificationMsgList.requestExpireTitle, notificationMsgList.requestExpireContent);
               this.storage.clearWorkerMsg();
               break;
             case NotificationTypeEnum.Notification_Type_RequestClosed:
               this.triggerRefreshData(typeID);
               break;
             case NotificationTypeEnum.Notification_Type_RequestWait4Payment:
               this.triggerRefreshData(typeID);
               this.notifyUser(notificationMsgList.requestClosedTitle, notificationMsgList.requestClosedContent);
               break;
             case NotificationTypeEnum.Notification_Type_StopReceiveSuggestion:
               this.triggerRefreshData(typeID);
               this.notifyUser(notificationMsgList.stopReceiveSuggestionTitle, notificationMsgList.stopReceiveSuggestionContent);
               break;
             case NotificationTypeEnum.Notification_Type_SuggestionChanged:
               this.triggerRefreshData(typeID);
               this.notifyUser(notificationMsgList.suggestionChangedTitle, notificationMsgList.suggestionChangedContent);
               break;
             case NotificationTypeEnum.Notification_Type_InvoiceChanged:
               this.triggerRefreshData(typeID);
               this.notifyUser(notificationMsgList.invoiceChangedTitle, notificationMsgList.invoiceChangedContent);
               break;
             default:
               //console.error("Unknown Notification Type : " + typeID);
               break;
           }
         }
       },
       (err) => {
         //console.log("*** is error in connect socket ***");
         this.socket$.unsubscribe();
         //this.storage.token.unsubscribe();
         this.isErrSoket = true;
       });
  }//end initSocket

  notifyUser(title: string, content: string) {
    try {
      if (this._pushNotificationService.requestPermissionStatus != 'granted' && this.isDiviceMobile) {
        this.toastr.info(content,
          title, {
            timeOut: this.constVal.notificationTimeOut
          });
      }
      else {
        let browserNotificationData: Array<any> = [];
        browserNotificationData.push({
          'title': title,
          'alertContent': content,
          'dir': 'rtl'
        });
        this._pushNotificationService.generateNotification(browserNotificationData);

        this.toastr.info(content,
          title, {
            timeOut: this.constVal.notificationTimeOut
          }
        );
      }
    }
    catch (e) {}
  }//end notifyUser

  triggerRefreshData(typeID) {
    this.basicData.triggerRefreshRequest.next(typeID);
    this.basicData.triggerRefreshDashboard.next(true);
  }//end triggerRefreshData

  /*---end socket---*/

  isMouseOverNotification:boolean = false;
  mouseOutNotifcation(){
    this.isMouseOverNotification = false;
  }

  mouseInNotification(){
    this.isMouseOverNotification = true;
  }

  onNotificatioClick(notificationLink:string){
    //console.log("link Notification: "+notificationLink);
    this.shared.showFirebaseNotification.next(false);
    this.isMouseOverNotification = false;
    if(notificationLink.indexOf("comercial") != -1){
      let linkSplit:string[] = notificationLink.split('/');
      let comercialJobcat3:JobCategory3V;
      //console.log(linkSplit);
      this.basicData.categories3.forEach(item =>{
        item.forEach(eleman => {
          if(eleman.id == Number(linkSplit[linkSplit.length-1])){
            comercialJobcat3 = eleman;
          }
        })
      });

      if(comercialJobcat3.haveSeo){
        this.router.navigate(["categories3", comercialJobcat3.ename]);
      }
      else{
        this.basicData.preRegisterOfRequest(comercialJobcat3);
      }
    }
    else{
      //console.log("پیامک به کاربر");
    }
  }

}//end class

