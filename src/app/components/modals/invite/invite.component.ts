import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ngCopy } from 'angular-6-clipboard';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  @Input() inviteLink:string;

  xWindow:number = 0;
  yWindow:number = 0;
  showModal:boolean = false;
  xSizeModalInvite:string = '0';
  ySizeModalInvite:string = '0';
  lottieConfig: Object;
  anim: any;
  inviteLinkSplit:string[] = [];

  constructor(private basicData: BasicDataService) {
    this.lottieConfig = {
      path: 'assets/webappPics/happy_gift.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  ngOnInit() {
    this.xWindow = window.innerWidth;
    this.yWindow = window.innerHeight;
    this.showModal = true;
    this.setXYSizeInviteModal();
    this.inviteLinkSplit = this.inviteLink.split('\n');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.xWindow = window.innerWidth;
    this.yWindow = window.innerHeight;
    this.setXYSizeInviteModal();
  }

  setXYSizeInviteModal(){
    if(this.showModal){
      this.xSizeModalInvite = this.xWindow+'px';
      this.ySizeModalInvite = this.yWindow+'px';
    }
    else{
      this.xSizeModalInvite = this.xWindow+'px';
      this.ySizeModalInvite = 0+'px';
    }    
  }

  onCloseModal(){
    this.showModal = false;
    this.setXYSizeInviteModal();
    this.basicData.activeModalInvite.next(false);
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  onCopy(){
    let i = this.inviteLinkSplit.length - 1;
    ngCopy(this.inviteLinkSplit[i]);
  }

}

