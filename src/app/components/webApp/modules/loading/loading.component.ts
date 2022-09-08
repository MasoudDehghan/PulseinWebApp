import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { webappConstValue } from '../../class/webappConstVal';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  yWindow:number = 0;

  constructor(public constVal: webappConstValue, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      this.yWindow = window.innerHeight;
    }
  }//end ngOnInit

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(isPlatformBrowser(this.platformId)){
      this.yWindow = window.innerHeight;
    }
  }//end onResize



}

