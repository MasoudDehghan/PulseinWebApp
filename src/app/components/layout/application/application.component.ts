//import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { SerachItem } from '../../webApp/class/serachItem.class';
import { WebSocketSubject } from 'rxjs/websocket';
import { NotificationContent } from '../../webApp/class/notificationContent.class';
import { PushNotificationsService } from '../../webApp/services/pushNotification.service';
import { StorageService } from '../../../services/storage/storage.service';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { SharedService } from '../../../services/shared/shared.service';
import { ConstValue } from '../../class/constValue';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers: [PushNotificationsService]
})
export class ApplicationComponent implements OnInit {

  year: number = 0;
  month: number = 0;
  day: number = 0;
  hour: string = '00';
  minuets: string = '00';
  socket$: WebSocketSubject<NotificationContent>;
  noResultPart1: string = "خدمتی مرتبط با ";
  noResultPart2: string = " یافت نشد";
  listSearch: SerachItem[] = [];
  isMobile = false;
  isErrSoket:boolean = false;
  xWindow:number = 0;
  yWindow:number = 0;

  constructor(public basicData: BasicDataService,
    public storage: StorageService,
    public shared:SharedService,
    private constVal: ConstValue,
    private _pushNotificationService: PushNotificationsService,
    private deviceService: DeviceDetectorService,
    @Inject(PLATFORM_ID) private platformId: Object) {
      this.shared.isWebAppPage.next(true);
      shared.iqbazBanerShow.next(false);
      this.isMobile = this.deviceService.isMobile();
      if(!this.isMobile)
        this._pushNotificationService.requestPermission();
  }

  ngOnInit() {
    this.setXY();
    this.shared.inPageDownload.next(false);
    this.shared.changeArea.subscribe(res => {
      if(res){
        //console.log('تغییر مختصات جغرافیایی');
        this.shared.lat = res.centerLat;
        this.shared.lng = res.centerLong;
      }
      else{
        //console.log('تغییر نیافتن مختصات جغرافیایی');
        this.shared.lat = this.constVal.lat;
        this.shared.lng = this.constVal.lng;
      }
    });

    //this.letItSnow();
  }//end ngOnInit
  

  /*---start snow function---
  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  letItSnow(){
    let snowflakes: NodeListOf<Element> = document.getElementsByClassName("snow");
    let arr = Array.from(snowflakes);
    for (let i = 0; i < snowflakes.length; i++) {
      var snowflake = snowflakes[i];
      snowflake.setAttribute('cx', this.getRandom(1,100) + '%');
      snowflake.setAttribute('cy', '-' + this.getRandom(1,100));
      snowflake.setAttribute('r', this.getRandom(1,3));
    }
  }
  ---end snow function----*/

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setXY();
  }

  setXY(){
    if(isPlatformBrowser(this.platformId)){
      this.xWindow = window.innerWidth;
      this.yWindow = window.innerHeight;
    }
  }//end setXY

}
