import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Transaction } from '../../class/backend/transaction.class';
import { webappHttpService } from '../../services/http/webapp-http.service';
import { CustomFunctionsService } from '../../../../services/functions/custom-functions.service';
import { SharedService } from '../../../../services/shared/shared.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  xWindow:number = 0;
  yWindow:number = 0;
  display:boolean = false;
  isLoading:boolean = false;
  timePeriodValue:number = 1;
  timePeriodTextList:string[]=['یک هفته','یک ماه','سه ماه','شش ماه','یک سال'];
  timePeriodSelectedText:string = 'یک هفته';
  userToken:string = '';
  transactionList:Transaction[] = [];
  textPaymentOnline:string = "آنلاین";
  textPaymentCash:string = "نقدی";
  lottieConfig: Object;
  anim: any; 

  constructor(private httpService: webappHttpService,
    public shared: SharedService,
    public customFunction: CustomFunctionsService,
    @Inject(PLATFORM_ID) private platformId: Object) {
      this.lottieConfig = {
        path: 'assets/webappPics/preloader.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.xWindow = window.innerWidth;
    this.yWindow = window.innerHeight;
    this.userToken = localStorage.getItem("userToken");
    this.getTransaction();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.xWindow = window.innerWidth;
    this.yWindow = window.innerHeight;
  }

  getTransaction(){
    this.httpService.getTransactionsList(this.timePeriodValue, this.userToken).subscribe(res => {
      this.display = true;
      this.isLoading = false;
      this.transactionList = res;
    }, error =>{});
  }

  onClickTimePeriod(index:number){
    this.timePeriodValue = index+1;
    this.isLoading = true;
    this.getTransaction();
  }

  onClickTimePeriodDropDow(){
    for(let i=0; i < this.timePeriodTextList.length; i++){
      if(this.timePeriodTextList[i] == this.timePeriodSelectedText){
        this.timePeriodValue = i + 1;
      }
    }
    this.isLoading = true;
    this.getTransaction();
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

}
