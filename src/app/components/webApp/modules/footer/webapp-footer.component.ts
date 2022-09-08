import { EnumConstData } from './../../../enum/constData.enum';
import { Component, OnInit, HostListener } from '@angular/core';
import { webappConstValue } from '../../class/webappConstVal';
import { SharedService } from '../../../../services/shared/shared.service';

@Component({
  selector: 'webapp-footer',
  templateUrl: './webapp-footer.component.html',
  styleUrls: ['./webapp-footer.component.css']
})
export class webappFooterComponent implements OnInit {

  txtOwnr:string = 'کلیه حقوق این وب سایت به شرکت نیکاسا فام تعلق دارد';
  txtTel:string = 'با ما در تماس باشید:';
  telNumber:string = '';
  telegram:string = '';
  instagram:string = '';
  xWindow:number = 0;

  constructor( private constval: webappConstValue, public shared: SharedService ) { }

  ngOnInit() {
    this.xWindow = window.innerWidth;
    this.telNumber = EnumConstData.suportTel1;
    this.instagram = this.constval.instagramLink;
    this.telegram = this.constval.telegramLink;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.xWindow = window.innerWidth;
  }

}
