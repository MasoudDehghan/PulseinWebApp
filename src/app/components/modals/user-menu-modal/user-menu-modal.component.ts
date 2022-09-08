import { SharedService } from './../../../services/shared/shared.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CustomFunctionsService } from '../../../services/functions/custom-functions.service';

@Component({
  selector: 'userMenuModal',
  templateUrl: './user-menu-modal.component.html',
  styleUrls: ['./user-menu-modal.component.css']
})
export class UserMenuModalComponent implements OnInit {

  showModal:boolean;
  xWindow:number = 0;
  yWindow:number = 0;
  modalBoxPositionLeft:string = '0px';
  modalBoxPositionTop:string = '0px';
  userCredit:string = '';

  constructor(public storage: StorageService,
    public shared: SharedService,
    private customFunc: CustomFunctionsService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if(this.storage.showModalUserMenu.value){
      this.shared.noScroll.next(true);
    }
 
    this.storage.userCredit.subscribe(res => {
      if(res == -1){
        this.userCredit = this.customFunc.chanageNumbersToFarsi(this.storage.userDataLogin.user.credit.toString());
        this.userCredit = this.customFunc.formatAmountMoney(this.userCredit);
        this.userCredit = this.userCredit + " تومان";
      }
      else{
        this.userCredit = this.customFunc.chanageNumbersToFarsi(res.toString());
        this.userCredit = this.customFunc.formatAmountMoney(this.userCredit);
        this.userCredit = this.userCredit + " تومان";
      }   
    });
    if (isPlatformBrowser(this.platformId)){
      this.showModal = this.storage.showModalUserMenu.getValue();
      this.xWindow = window.innerWidth;
      this.yWindow = window.innerHeight;
      this.setPositionModal();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser(this.platformId)){
      this.xWindow = window.innerWidth;
      this.yWindow = window.innerHeight;
      this.setPositionModal();
    } 
  }

  setPositionModal(){
    if(this.showModal){
      this.modalBoxPositionTop = ((this.yWindow / 2) - (370 / 2))+'px';
      this.modalBoxPositionLeft = ((this.xWindow / 2) - (350 / 2))+'px';
      if((this.yWindow / 2) - (370 / 2) <= 0){
        this.modalBoxPositionTop = "15px";
      }
    }
    else{
      this.modalBoxPositionLeft = '0px';
      this.modalBoxPositionTop = '0px';
    }
  }

  onCloseModal(){
    this.storage.showModalUserMenu.next(false);
    this.showModal = false;
    this.modalBoxPositionLeft = '0px';
    this.modalBoxPositionTop = '0px';
    this.shared.noScroll.next(false);
  }

  emitClose(val:boolean){
    this.storage.showModalUserMenu.next(val);
    this.showModal = val;
    this.modalBoxPositionLeft = '0px';
    this.modalBoxPositionTop = '0px';
  }

}
