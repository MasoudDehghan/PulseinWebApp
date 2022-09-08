import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { JobCategory2V } from '../../class/jobCategory2V.class';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { Links } from '../../class/links';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../../services/shared/shared.service';
import { MetaService } from '../../../services/metaTag/meta.service';


@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.css']
})

export class ExpertsComponent implements OnInit {

  user:string = "worker";
  imgGooglePlaySrc:string = 'assets/image/market/google60.png';
  imgAppStoreSrc:string = 'assets/image/market/apple.png';
  imgAppStoreSrcDef:string = 'assets/image/market/apple.png';
  imgComingSoonSrc:string = 'assets/image/market/comingsoon60.jpg';
  appExpertLinkCofeBazar:string = '';
  appExpertLinkGooglePlay:string = '';
  appExpertLinkDirect:string = '';

  headerText1:string = "از کاری که در آن تخصص دارید کسب درآمد کنید!";
  headerText2:string = "پالسین یک قدم کوتاه برای داشتن یک شغل مناسب است!";
  titleHowWork:string ="چگونه از پالسین کسب درآمد کنیم";
  descriptionHowWork:string = "تنها کافی است که برای شروع کاری آزادانه، پردرآمد و بدون محدودیت زمانی، اپلیکیشن متخصصین پالسین را نصب کنید و منتظر تماس تیم پشتیبانی ما باشید.";
  subTitle1:string = "کار را انتخاب کنید";
  subInfo1:string = "پیشنهادات روزانه بصورت نوتیفیکیشن به شما اطلاع داده می شود. با توجه به مسافت و زمانبندی تعیین شده، نسبت به اعلام آمادگی برای انجام کار اقدام کنید.";
  subTitle2:string = "ارسال پیش فاکتور و توافق با کارفرما";
  subInfo2:string = "پالس اعلام آمادگی به همراه شماره تلفن شما برای مشتری ارسال می شود. مشتری با شما تماس می گیرد و در مورد جزئیات کار با شما صحبت می کند. اگر لازم باشد، قیمت اقلام اضافی را اعلام کنید و بر سر هزینه ها و اجرت کار به توافق نهایی برسید.";
  subTitle3:string = "اتمام کار و کسب درآمد";
  subInfo3:string = "پس از لمس دکمه اتمام کار در اپلیکیشن متخصصین، می توانید برای کار بعدی آماده شوید. تنها کافی است تا کار خود را به موقع و درست انجام دهید تا درخواست های بعدی پیش از همه برای شما ارسال شود.";
  titleAppDownload:string = "پالسین برای متخصصین";
  descriptionAppDownload:string = "با نصب اپلیکیشن متخصصین پالسین، درخواست مشتریان را در هر ساعت از شبانه روز و در هر جایی که باشید مشاهده کنید و پیشنهاد خود را برای دریافت آنها ثبت نمایید. این اپلیکیشن به شما امکان می دهد تا علاوه بر درخواست های انجام شده، لیست کارها و درآمد خود را نیز مدیریت کنید.";
  isPC:boolean = true;
  categories1: JobCategory1V[];
  categories2: Array<JobCategory2V[]>;
  categories3: Array<JobCategory3V[]>;
  xWindow:number = 1000;

  constructor(private basicData: BasicDataService, 
              private linksList: Links,
              private shared: SharedService,
              public titleSeo:Title,
              public meta:Meta,
              private metaService: MetaService,
              @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.shared.inPageDownload.next(true);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.appExpertLinkCofeBazar = this.linksList.cafeBazarExpert;
    this.appExpertLinkDirect = this.linksList.directLinkExpert;
    this.appExpertLinkGooglePlay = this.linksList.googlePlayExpert;

    this.titleSeo.setTitle("پالسین - کسب درآمد در پالسین");
    this.meta.updateTag({
      name: 'description',
      content: "کسب درآمد در پالسین. متخصصین می‌توانند در پالسین ثبت نام کنند و در بازار پالسین تخصص خود را به مشتریان ارائه دهند."
    });

    this.metaService.createCanonicalURL(this.metaService.webBasicUrl + "/experts");

    if (isPlatformBrowser(this.platformId)){
      window.scrollTo(0, 0);
      this.modeInit();
      this.basicData.setCategories.subscribe(res => {
        if(res){
          //console.log("experts ***");
          this.categories1 = this.basicData.categories1;
          this.categories2 = this.basicData.categories2;
          this.categories3 = this.basicData.categories3;
        }
      });
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser(this.platformId)){
      this.xWindow = window.innerWidth;
      if(this.xWindow <= 720){
        this.isPC = false;
      }
      else{
        this.isPC = true;
      } 
    } 
  }

  modeInit(){
    if (isPlatformBrowser(this.platformId)){
      this.xWindow = window.innerWidth;
      if(this.xWindow <= 720){
        this.isPC = false;
      }
      else{
        this.isPC = true;
      }
    } 
  }

  textPosition(){
    if(this.isPC){
      return 'text-right';
    }
    else{
      return 'text-center';
    }
  }

  onMouseEnter(inVal){
    if(inVal === 'apple'){
      this.imgAppStoreSrc = this.imgComingSoonSrc;
    }
  }

  onMouseOut(inVal){
   if(inVal === 'apple'){
      this.imgAppStoreSrc = this.imgAppStoreSrcDef;
    }
  }

}
