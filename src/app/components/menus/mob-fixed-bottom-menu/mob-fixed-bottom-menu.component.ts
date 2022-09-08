import { Router } from '@angular/router';
import { SharedService } from './../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Links } from '../../class/links';
import { EnumUrls } from '../../webApp/enum/enumUrls.enum';

@Component({
  selector: 'app-mob-fixed-bottom-menu',
  templateUrl: './mob-fixed-bottom-menu.component.html',
  styleUrls: ['./mob-fixed-bottom-menu.component.css']
})
export class MobFixedBottomMenuComponent implements OnInit {

  closeFixedBottomMenu:boolean = false;
  //directLink: string = '';
  webAppAddress:string = '';
  deviceInfo = null;
  os:string = 'windows';
  isMac:boolean = false;

  constructor(private deviceService: DeviceDetectorService, 
    private router: Router,
    private linksList: Links,
    public shared: SharedService) {
    this.epicFunction();
   }

  ngOnInit() {
    //this.directLink = this.linksList.directLinkCustomer;
    this.webAppAddress = this.linksList.webAppAddress;
  }

  onClose(){
    this.closeFixedBottomMenu = true;
  }

  epicFunction() {
     this.os = this.deviceService.os;
     if(this.os == 'mac'){
       this.isMac = true;
     }
     else{
      this.isMac = false;
     }
  }

  onFollowRequest(){
    this.router.navigate([EnumUrls.address_WebappCurrentRequest]);
  }

  onDownloadIOS(){}

}
