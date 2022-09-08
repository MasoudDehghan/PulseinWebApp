import { Router } from '@angular/router';
import { SharedService } from './../../../services/shared/shared.service';
import { localDiscount } from './../../class/localDiscount.class';
import { CustomFunctionsService } from './../../../services/functions/custom-functions.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { webappHttpService } from '../../webApp/services/http/webapp-http.service';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from '../../class/toastMessage.class';
import { EnumUrls } from '../../webApp/enum/enumUrls.enum';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  isLoadingFullpage:boolean = false;
  isLoadingInpage:boolean = true;
  showModal:boolean = false;
  unitIranMoney:string = " تومان ";
  offChanelLimitTime:string = "فقط تا پایان بهمن ماه می‌توانید از این کد تخفیف استفاده نمایید";
  niniSiteLimitTime:string = "فقط تا ۱۵ اسفند ماه می‌توانید از این کد تخفیف استفاده نمایید";
  mediaadLimitTime:string = "فقط تا ۱۵ اسفند ماه می‌توانید از این کد تخفیف استفاده نمایید";
  yektanetLimitTime:string = "فقط تا ۱۵ اسفند ماه می‌توانید از این کد تخفیف استفاده نمایید";
  chatrbazanLimitTime:string = "فقط تا ۲۰ اسفند ماه می‌توانید از این کد تخفیف استفاده نمایید";
  customerClub9811:string = " تا ۲۹ اسفند ماه می‌توانید از این کد تخفیف استفاده نمایید";
  limitTimeDescription:string = "";
  siteName:string = "test";

  modal_selectedJobcat:JobCategory3V = null;
  modal_code:string = null;
  modal_percent:number = null;
  modal_maxcredit:number = null;
  modal_description:string = null;
  modal_citySuport:string = null;

  codeClean:string = "";
  codeCarpet:string = "";
  codeMove:string = "";
  codeMobl:string = "";
  codeCarW:string = "";

  percentClean:number = 0;
  percentCarpet:number = 0;
  percentMove:number = 0;
  percentMobl:number = 0;
  percentCarw:number = 0;

  creditClean:number = 0;
  creditCarpet:number = 0;
  creditMove:number = 0;
  creditMobl:number = 0;
  creditCarw:number = 0;

  homeCleanCat:JobCategory3V = {
    id: 163,
    icon: "JobCategoriesImg/icon163c.png",
    name: "نظافت",
    ename: "home-cleaning",
    haveWorker: true,
    haveSeo: true,
    haveNewSeo: true
  };

  carpetCat:JobCategory3V = {
    id: 313,
    icon: "JobCategoriesImg/icon313c.png",
    name: "قالیشویی",
    ename: "carpet-cleaning",
    haveWorker: true,
    haveSeo: true,
    haveNewSeo: true
  }

  moblCat:JobCategory3V = {
    id: 129,
    icon: "JobCategoriesImg/icon129c.png",
    name: "مبل شویی",
    ename: "furniture-cleaning",
    haveWorker: true,
    haveSeo: true,
    haveNewSeo: true
  };

  moveCat:JobCategory3V = {
    id: 322,
    icon: "JobCategoriesImg/icon322c.png",
    name: "اسباب کشی",
    ename: "Movers",
    haveWorker: true,
    haveSeo: true,
    haveNewSeo: true
  }

  carwCat:JobCategory3V = {
    id: 143,
    icon: "JobCategoriesImg/icon143c.png",
    name: "کارواش نانو در محل",
    ename: "carwash-at-home",
    haveWorker: true,
    haveSeo: true,
    haveNewSeo: true
  }

  listDiscount:localDiscount[] = [
    { 
      img:"assets/image/landing/localDiscount/clean.jpg",
      code:this.codeClean,
      percent:this.percentClean,
      maxCredit:this.creditClean,
      description:this.limitTimeDescription,
      jobcat3: this.homeCleanCat,
      locationSuport: "تهران و کرج"
    },
    {
      img:"assets/image/landing/localDiscount/carpet.jpg",
      code:this.codeCarpet,
      percent:this.percentClean,
      maxCredit:this.creditCarpet,
      description:this.limitTimeDescription,
      jobcat3: this.carpetCat,
      locationSuport: "تهران و کرج"
    },
    {
      img:"assets/image/landing/localDiscount/mobl.jpg",
      code:this.codeMobl,
      percent:this.percentMobl,
      maxCredit:this.creditMobl,
      description:this.limitTimeDescription,
      jobcat3: this.moblCat,
      locationSuport: "تهران و کرج"
    },
    {
      img:"assets/image/landing/localDiscount/move.jpg",
      code:this.codeMove,
      percent:this.percentMove,
      maxCredit:this.creditMove,
      description:this.limitTimeDescription,
      jobcat3: this.moveCat,
      locationSuport: "تهران و کرج"
    },
    {
      img:"assets/image/landing/localDiscount/carwash.jpg",
      code:this.codeMove,
      percent:this.percentCarw,
      maxCredit:this.creditCarw,
      description:this.limitTimeDescription,
      jobcat3: this.carwCat,
      locationSuport: "تهران"
    }
  ];

  constructor(private customFunction:CustomFunctionsService, 
    private webAppHttp: webappHttpService,
    private toastr: ToastrService,
    private toastMsg: ToastMessage,
    public shared: SharedService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    let path:string = document.URL;
    if(path.indexOf('offch.com') != -1){
      //console.log("found " + path.indexOf('offch.com'));
      this.isLoadingInpage = false;
      this.siteName = "offch";
      this.codeClean = "ocClean";
      this.codeCarpet = "ocCarp";
      this.codeMove = "ocMove";
      this.codeMobl = "ocMobl";
      this.codeCarW = "";
      this.limitTimeDescription = this.offChanelLimitTime;
      this.percentClean = 50;
      this.creditClean = 35000;
      this.percentCarpet = 40;
      this.creditCarpet = 40000;
      this.percentMobl = 40;
      this.creditMobl = 40000;
      this.percentMove = 35;
      this.creditMove = 70000;
      this.percentCarw = 0;
      this.creditCarw = 0;
      this.setDiscountCode();
      this.setDiscountDescription(this.offChanelLimitTime);
      this.setDiscountPercent();
      this.setDiscountCredit();
      this.webAppHttp.getCountClickDiscount(1, this.siteName).subscribe(res => {});
    }
    else if(path.indexOf('Ninisite') != -1 || path.indexOf('ninisite') != -1){
      //console.log("found " + path.indexOf('Ninisite.com'));
      this.isLoadingInpage = false;
      this.siteName = "ninisite";
      this.codeClean = "nsClean";
      this.codeCarpet = "nsCarp";
      this.codeMove = "nsMove";
      this.codeMobl = "nsMobl";
      this.codeCarW = "nscarw";
      this.limitTimeDescription = this.niniSiteLimitTime;
      this.percentClean = 0;
      this.creditClean = 25000;
      this.percentCarpet = 0;
      this.creditCarpet = 25000;
      this.percentMobl = 0;
      this.creditMobl = 25000;
      this.percentMove = 0;
      this.creditMove = 45000;
      this.percentCarw = 0;
      this.creditCarw = 15000;
      this.setDiscountCode();
      this.setDiscountDescription(this.niniSiteLimitTime);
      this.setDiscountPercent();
      this.setDiscountCredit();
      this.webAppHttp.getCountClickDiscount(1, this.siteName).subscribe(res => {});
    }
    else if(path.indexOf('mediaad') != -1){
      //console.log("found " + path.indexOf('mediaad.org'));
      this.isLoadingInpage = false;
      this.siteName = "mediaad";
      this.codeClean = "mdClean";
      this.codeCarpet = "mdCarp";
      this.codeMove = "mdMove";
      this.codeMobl = "mdMobl";
      this.codeCarW = "mdcarw";
      this.limitTimeDescription = this.mediaadLimitTime;
      this.percentClean = 0;
      this.creditClean = 25000;
      this.percentCarpet = 0;
      this.creditCarpet = 25000;
      this.percentMobl = 0;
      this.creditMobl = 25000;
      this.percentMove = 0;
      this.creditMove = 45000;
      this.percentCarw = 0;
      this.creditCarw = 15000;
      this.setDiscountCode();
      this.setDiscountDescription(this.mediaadLimitTime);
      this.setDiscountPercent();
      this.setDiscountCredit();
      this.webAppHttp.getCountClickDiscount(1, this.siteName).subscribe(res => {});
    }
    else if(path.indexOf('yektanet') != -1){
      //console.log("found " + path.indexOf('yektanet.com'));
      this.isLoadingInpage = false;
      this.siteName = "yektanet";
      this.codeClean = "ynClean";
      this.codeCarpet = "ynCarp";
      this.codeMove = "ynMove";
      this.codeMobl = "ynMobl";
      this.codeCarW = "yncarw";
      this.limitTimeDescription = this.yektanetLimitTime;
      this.percentClean = 0;
      this.creditClean = 25000;
      this.percentCarpet = 0;
      this.creditCarpet = 25000;
      this.percentMobl = 0;
      this.creditMobl = 25000;
      this.percentMove = 0;
      this.creditMove = 45000;
      this.percentCarw = 0;
      this.creditCarw = 15000;
      this.setDiscountCode();
      this.setDiscountDescription(this.yektanetLimitTime);
      this.setDiscountPercent();
      this.setDiscountCredit();
      this.webAppHttp.getCountClickDiscount(1, this.siteName).subscribe(res => {});
    }
    else if(path.indexOf('chatrbaazan') != -1){
      this.isLoadingInpage = false;
      this.siteName = "chatrbazan";
      this.codeClean = "ctClean";
      this.codeCarpet = "ctCarp";
      this.codeMove = "ctMove";
      this.codeMobl = "ctMobl";
      this.codeCarW = "ctcarw";
      this.limitTimeDescription = this.chatrbazanLimitTime;
      this.percentClean = 0;
      this.creditClean = 25000;
      this.percentCarpet = 0;
      this.creditCarpet = 25000;
      this.percentMobl = 0;
      this.creditMobl = 25000;
      this.percentMove = 0;
      this.creditMove = 45000;
      this.percentCarw = 0;
      this.creditCarw = 15000;
      this.setDiscountCode();
      this.setDiscountDescription(this.chatrbazanLimitTime);
      this.setDiscountPercent();
      this.setDiscountCredit();
      this.webAppHttp.getCountClickDiscount(1, this.siteName).subscribe(res => {});
    }
    else if(path.indexOf('customerclub9811') != -1){
      this.isLoadingInpage = false;
      this.siteName = "customerclub9811";
      this.codeClean = "dbcnzt";
      this.codeCarpet = "dbccrp";
      this.codeMove = "dbcmov";
      this.codeMobl = "dbcmbl";
      this.codeCarW = "dbcwas";
      this.limitTimeDescription = this.chatrbazanLimitTime;
      this.percentClean = 30;
      this.creditClean = 30000;
      this.percentCarpet = 30;
      this.creditCarpet = 30000;
      this.percentMobl = 30;
      this.creditMobl = 30000;
      this.percentMove = 30;
      this.creditMove = 50000;
      this.percentCarw = 30;
      this.creditCarw = 30000;
      this.setDiscountCode();
      this.setDiscountDescription(this.customerClub9811);
      this.setDiscountPercent();
      this.setDiscountCredit();
      this.webAppHttp.getCountClickDiscount(1, this.siteName).subscribe(res => {});
    }
    else if(path.indexOf('cclub981229') != -1){
      this.isLoadingInpage = false;
      this.siteName = "cclub981229";
      this.codeClean = "dbcnzf";
      this.codeCarpet = "dbccrp";
      this.codeMove = "dbcmov";
      this.codeMobl = "dbcmbl";
      this.codeCarW = "dbcwas";
      this.limitTimeDescription = this.chatrbazanLimitTime;
      this.percentClean = 25;
      this.creditClean = 35000;
      this.percentCarpet = 30;
      this.creditCarpet = 30000;
      this.percentMobl = 30;
      this.creditMobl = 30000;
      this.percentMove = 30;
      this.creditMove = 50000;
      this.percentCarw = 30;
      this.creditCarw = 30000;
      this.setDiscountCode();
      this.setDiscountDescription(this.customerClub9811);
      this.setDiscountPercent();
      this.setDiscountCredit();
      this.webAppHttp.getCountClickDiscount(1, this.siteName).subscribe(res => {});
    }
  }//end ngOnInit

  changePercentFa(percentNumber:number):string{
    return this.customFunction.chanageNumbersToFarsi(percentNumber.toString());
  }//end changePercentFa

  changeMaxCreditFa(maxCreditNumber:number):string{
    let maxCreditFarsi:string = this.customFunction.chanageNumbersToFarsi(maxCreditNumber.toString());
    return this.customFunction.formatAmountMoney(maxCreditFarsi);
  }//end changeMaxCreditFa

  makeTextDiscount(percent:number , maxCredit:number):string{
    if(percent > 0){
      return this.changePercentFa(percent) + " درصد تخفیف تا سقف " + this.changeMaxCreditFa(maxCredit) + this.unitIranMoney;
    }
    else{
      return this.changeMaxCreditFa(maxCredit) + this.unitIranMoney + "تخفیف بدون هیچ محدودیتی"
    }
  }//end makeTextDiscount

  onOffCodePc(OffCode:string, jobcat3:JobCategory3V){
    //console.log(jobcat3.id + " - " + this.siteName);
    this.webAppHttp.getCountClickDiscount(jobcat3.id, this.siteName).subscribe(res => {
      console.log("it is ok in pc : get Count Click Discount");
      console.log(res);
    });
    if(isPlatformBrowser(this.platformId)){
      this.showModal = false;
      sessionStorage.setItem('discountCode', OffCode);
      this.onJobCat3(jobcat3);
    }
  }//end onOffCodePc

  onOffCodeMobile(OffCode:string, jobcat3:JobCategory3V){
    if(isPlatformBrowser(this.platformId)){
      this.showModal = false;
      sessionStorage.setItem('discountCode', OffCode);
      this.onJobCat3(jobcat3);
    }
  }//end onOffCodeMobile

  onJobCat3(item:JobCategory3V){
    this.isLoadingFullpage = true;
    if(!item){
      //console.log("دسته3 داده ندارد!!!");
      this.isLoadingFullpage = false;
    }
    else{
      this.webAppHttp.getGuestPreRegisterRequest(item.id).subscribe(res => {
        this.isLoadingFullpage = false;
        if(!res.haveActiveWorker){
          this.toastr.clear();
          this.toastr.warning(this.toastMsg.msg4NoWorker, this.toastMsg.title4NoWorker);
        }
        else{
          this.shared.reqRej_preRegister = res;
          this.shared.reqRej_jobcat3Select = item;
          if(res.haveQuestion){
            //go to questions module
            this.shared.jobcat3FromLandingPage = true;
            this.router.navigate([EnumUrls.requestRegister_questions]);
          }
          else if(!res.haveQuestion){
            //no question and go to descriptions request
            //module description
            this.router.navigate([EnumUrls.requestRegister_extraDescription]);
          }
        }
      }, error => {
        this.isLoadingFullpage = false;
        //console.log("خطای کاربر  مهمان");
        //console.log(error);
      });
    }
  }//end onJobCat3

  onShowDiscountInfo(discount:localDiscount){
    this.modal_selectedJobcat = discount.jobcat3;
    this.modal_code = discount.code;
    this.modal_percent = discount.percent;
    this.modal_maxcredit = discount.maxCredit;
    this.modal_description = discount.description;
    this.modal_citySuport = discount.locationSuport;
    this.showModal = true;
    //console.log(discount.jobcat3.id + " - " + this.siteName);
    this.webAppHttp.getCountClickDiscount(discount.jobcat3.id, this.siteName).subscribe(res => {
      console.log("it is ok in mobile : get Count Click Discount");
      console.log(res);
    });;
  }//end onShowDiscountInfo

  closeModal(){
    this.showModal = false;
  }

  setDiscountCode(){
    this.listDiscount[0].code = this.codeClean;
    this.listDiscount[1].code = this.codeCarpet;
    this.listDiscount[2].code = this.codeMobl;
    this.listDiscount[3].code = this.codeMove;
    this.listDiscount[4].code = this.codeCarW;
  }//end setDiscountCode

  setDiscountDescription(limitTimDes:string){
    this.listDiscount[0].description = limitTimDes;
    this.listDiscount[1].description = limitTimDes;
    this.listDiscount[2].description = limitTimDes;
    this.listDiscount[3].description = limitTimDes;
    this.listDiscount[4].description = limitTimDes;
  }//end setDiscountDescription

  setDiscountPercent(){
    this.listDiscount[0].percent = this.percentClean;
    this.listDiscount[1].percent = this.percentCarpet;
    this.listDiscount[2].percent = this.percentMobl;
    this.listDiscount[3].percent = this.percentMove;
    this.listDiscount[4].percent = this.percentCarw;
  }//end setDiscountPercent

  setDiscountCredit(){
    this.listDiscount[0].maxCredit = this.creditClean;
    this.listDiscount[1].maxCredit = this.creditCarpet;
    this.listDiscount[2].maxCredit = this.creditMobl;
    this.listDiscount[3].maxCredit = this.creditMove;
    this.listDiscount[4].maxCredit = this.creditCarw;
  }//end setDiscountCredit

}
