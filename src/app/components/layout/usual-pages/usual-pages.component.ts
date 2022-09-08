import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';
import { isPlatformBrowser } from '@angular/common';
import { StorageService } from '../../../services/storage/storage.service';


@Component({
  selector: 'app-usual-pages',
  templateUrl: './usual-pages.component.html',
  styleUrls: ['./usual-pages.component.css']
})
export class UsualPagesComponent implements OnInit {

  isScrollDown:boolean = false;
  scrollDown:number = 0;
  showBtn:boolean = true;

  constructor(public shared: SharedService,
    public storage: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object) {
      shared.isWebAppPage.next(false);
  }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      sessionStorage.removeItem('discountCode');
    }
    this.shared.pagePath.subscribe(res => {
      if(res == 'experts' || res == 'searchResult' || res == 'categories2' || res == 'categories3' || res == 'FAQs-expert'){
        this.showBtn = false;
      }
      else{
        this.showBtn = true;
      }

      if(res == 'Home'){
        this.shared.isHomePage.next(true);
      }
      else{
        this.shared.isHomePage.next(false);
      }
    });
  }//end ngOnInit

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    if (isPlatformBrowser(this.platformId)){
      const scrollPosition = window.pageYOffset;
      /*--start check scroll down or up---*/
      if(scrollPosition > this.scrollDown){
        //this.isScrollDown = true;
        this.scrollDown = scrollPosition;
      }
      else if(scrollPosition < this.scrollDown){
        //this.isScrollDown = false;
        this.scrollDown = scrollPosition;
      }
      /*--end check scroll down or up---*/
    }
  }//end checkScroll

}
