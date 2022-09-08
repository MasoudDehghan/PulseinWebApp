import { StorageService } from './../../../services/storage/storage.service';
import { userCat3CommentDto } from './../../class/UserCat3Comment.class';
import { TypeInfo } from './../../webApp/class/backend/typeInfo.class';
import { webappHttpService } from './../../webApp/services/http/webapp-http.service';
import { CustomFunctionsService } from './../../../services/functions/custom-functions.service';
import { IqbazService } from './../../../services/game/iqbaz/iqbaz.service';
import { HttpService } from '../../../services/http/http.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { UrlRest } from '../../class/urlRest.class';
import { Cat3CoParagraphV } from '../../class/cat3CoParagraphV.class';
import { SharedService } from '../../../services/shared/shared.service';
import { EnumUrls } from '../../webApp/enum/enumUrls.enum';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from '../../class/toastMessage.class';
import { LocationStrategy } from '@angular/common';
import { MetaService } from '../../../services/metaTag/meta.service';
import {
  trigger, state, style, animate, transition
} from '@angular/animations';
import { C3Seo } from '../../class/C3Seo.class';
import { faqs } from '../../class/faqs.class';
import { CDashboardDiscount } from '../../class/CDashboardDiscount.class';
import { priceInfoSeo } from '../../class/priceInfoSeo.class';


@Component({ 
  selector: 'app-jobcat3',
  templateUrl: './jobcat3.component.html',
  styleUrls: ['./jobcat3.component.css'],
  animations: [
    trigger('faqState', [
      state('hide', style({
        height: '0px',
        'line-height':'0px'
      })),
      state('show',   style({
        height: 'auto',
        'min-height': '40px',
        'line-height':'25px'
      })),
      transition('show <=> hide', animate('300ms ease-in'))
    ]),
    trigger('arrowState', [
      state('hide', style({
        transform: 'rotate(0deg)'
      })),
      state('show',   style({
        transform: 'rotate(-180deg)'
      })),
      transition('hide <=> show', animate('200ms ease-in'))
    ])
  ]
})
export class Jobcat3Component implements OnInit {

  isLoading:boolean = false;
  googleAnalyticsCategory:string = '';

  jobcat3Selected:JobCategory3V = null;
  cat3ID:number;
  cat3Ename: string = '';
  imageCat3: string = 'assets/image/empty.jpg';
  mobileImgCat3: string = '';
  urlForGoingToApp:string = "";
  jobCat3FarsiName:string = "";
  seoDescription:string = "";
  descriptionForJobcat3: Cat3CoParagraphV[] = [];
  txtRequest:string = "ثبت درخواست";
  token:string = '';
  flag:number = 0; //0: no data, 1: data oldStyle, 2: data newStyle
  path:string = '';


  /*===========================*/
  dataPage: C3Seo = null;
  imagePath:string = '';
  h1Header:string = "";
  h2Header:string = "";
  imgHeader:string = "";
  altImageHeader:string = "";
  btnText:string = "";
  introdouction:string = "";
  h2TitrArea:string = "";
  textAreaList:string[] = [];
  h2TitrWhyPulsein:string = "";
  txtWhyPulseinList:string[] = [];
  h2TitrPrice:string = "";
  h2TitleFAQ:string = "";
  FAQList:faqs[] = [];
  htmlList:TypeInfo[] = [];
  htmlIndexList:TypeInfo[] = [];
  /*===========================*/
  titrFirstDiscount:string = "تخفیف ویژه جهت اولین ثبت سفارش";
  titrGeneralDiscount:string = "تخفیف باشگاه مشتریان";
  txtDiscount:string = "استفاده از کد تخفیف ";
  txtPercentMaxPriceDiscount:string = " درصد تخفیف تا سقف ";
  haveGeneralOffCode:boolean = false;
  generalOffCode_code:string;
  generalOffCode_Percent: string;
  generalOffCode_maxPrice: string;
  haveFirstUseOffCode:boolean = false;
  firstUseOffCode_code:string;
  firstUseOffCode_Percent:string;
  firstUseOffCode_maxPrice:string;
  unitIranMoney:string = " تومان ";
  imgMainDiscount:string = "";

  lottieConfig: Object;
  anim: any;

  customOptions: any = {
    rtl:true,
    loop: true,
    autoplay:true,
    autoplayTimeout:7000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      300: {
        items: 2
      },
      500: {
        items: 3
      },
      750: {
        items: 4
      }
    },
    nav: false
  }

  otherDiscountList: CDashboardDiscount[] = [];
  textDiscountGolds:string = "تخفیف‌های طلایـی پالسین";
  selectedJobcatDiscount: CDashboardDiscount = null;

  priceInfo: priceInfoSeo = null;

  userCommentList: userCat3CommentDto[] = [];
  h2TitleComments: string = "نظرات کاربران";
  uesrIdeatext: string = '';
  showMainIdeaBox:boolean = true;
  ans_parentId:number = null;
  ans_cat3Id:number = null;
  ansID:number = null;
  userMobile:string = '';
  userName:string = '';

  pathImagesInServer:string = 'https://pulsein.pro/blueberry/SeoContent/';
  listCarpetImg:string[] = [
    "crp01.jpg",
    "crp02.jpg",
    "crp03.jpg",
    "crp04.jpg",
    "crp05.jpg",
    "crp06.jpg",
    "crp07.jpg",
    "crp08.jpg",
    "crp09.jpg",
    "crp10.jpg",
    "crp11.jpg",
    "crp12.jpg",
    "crp13.jpg",
    "crp14.jpg",
    "crp15.jpg",
    "crp16.jpg",
    "crp17.jpg",
    "crp18.jpg",
    "crp19.jpg",
    "crp20.jpg",
    "crp21.jpg",
    "crp22.jpg",
    "crp23.jpg",
    "crp24.jpg",
    "crp25.jpg",
    "crp26.jpg"
  ];

  listMoveingImg:string[] = [
    "mov01.jpg",
    "mov02.jpg",
    "mov03.jpg",
    "mov04.jpg",
    "mov05.jpg",
    "mov06.jpg",
    "mov07.jpg",
    "mov08.jpg",
    "mov09.jpg",
    "mov10.jpg",
    "mov11.jpg",
    "mov12.jpg",
    "mov13.jpg",
    "mov14.jpg",
    "mov15.jpg"
  ];

  /*-----start cleaning operational-----*/
  listCleaningImg:string[] = [
    "cln001.jpg",
    "cln002.jpg",
    "cln003.jpg",
    "cln004.jpg",
    "cln005.jpg",
    "cln006.jpg",
    "cln007.jpg",
    "cln008.jpg",
    "cln009.jpg",
    "cln010.jpg",
    "cln011.jpg",
    "cln012.jpg",
    "cln013.jpg",
    "cln014.jpg",
    "cln015.jpg",
    "cln016.jpg",
    "cln017.jpg",
    "cln018.jpg",
    "cln019.jpg",
    "cln020.jpg",
    "cln021.jpg"
  ];
  /*----end cleaning operational----*/

  /*-----start cleaning develop------*
  listCleaningImg:string[] = [
    "cln01.jpg",
    "cln02.jpg",
    "cln03.jpg",
    "cln04.jpg",
    "cln05.jpg",
    "cln06.jpg",
    "cln07.jpg",
    "cln08.jpg",
    "cln09.jpg",
    "cln10.jpg",
    "cln11.jpg",
    "cln12.jpg",
    "cln13.jpg",
    "cln14.jpg",
    "cln15.jpg",
    "cln16.jpg",
    "cln17.jpg",
    "cln18.jpg",
    "cln19.jpg",
    "cln20.jpg"
  ];
  /*----end cleaning develop------*/

  jsonLD: any = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    'name' : "خدمات آنلاین پالسین",
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '77735224 - 77743281',
      'contactType': 'خدمات آنلاین'
    },
    'aggregateRating': {
      "@type": "AggregateRating",
      'ratingValue': "4.82",
      'ratingCount': "12025",
      'bestRating': "5",
      'worstRating': "1"
    },
    'description' : "سرویس ها و خدمات آنلاین پالسین با قیمت مناسب و کیفیت عالی، شما میتوایند درخواست خود را به صورت آنلاین ثبت نمایید",
    'category': "خانه"
  };

  qa_json_ld: any = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [{
      '@type': 'Question',
      'name': 'سامانه خدمات آنلاین پالسین چیست؟',
      'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'سامانه خدمات آنلاین پالسین راهی نوین برای برطرف گردن نیاز های شماست. ثبت درخواست رایگان برای کارهایی چون نظافت منزل، اسباب کشی ، قالیشویی ، کارواش و ... به راحتی از طرف کاربران انجام می‌گیرد و متخصصین پالسین به کاربر اعلام قیمت می‌نمایند.'
       }
     }
    ]
  };

  json_nezafat = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    'name' : "نظافت منزل",
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '77735224 - 77743281',
      'contactType': 'خدمات آنلاین'
    },
    'aggregateRating': {
      "@type": "AggregateRating",
      'ratingValue': "4.83",
      'ratingCount': "6730",
      'bestRating': "5",
      'worstRating': "1"
    },
    'description' : "سرویس نظافت منزل و نظافت محل کار پالسین با قیمت مناسب و کیفیت عالی، شما میتوایند درخواست نظافت منزل خود را به صورت آنلاین ثبت نمایید",
    'category': "سرویس نظافت ساختمان" ,
    'offers' : {
      "@type": "AggregateOffer",
      'lowPrice': "750000",
      'highPrice': "1550000",
      'priceCurrency': "IRR"
    }
  };

  qa_json_ld_nezafat = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [{
      '@type': 'Question',
      'name': 'هزینه نظافت منزل چگونه محاسبه می‌شود؟',
      'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'هزینه نظافت منزل توسط متخصصین و به صورت پیشنهاد برای شما ارسال می‌شود. به طورکلی هزینه نظافت منزل به صورت میزان ساعت کار انجام شده است. به طور معمول، نظافتچی پالسین هزینه ساعت کار انجام شده را در بازه‌های ۴، ۶ و یا ۸ ساعته به شما پیشنهاد می‌دهد.'
       }
     },
     {
       '@type': 'Question',
       'name': 'هزینه نظافت منزل در مناطق مختلف تهران متفاوت است؟',
       'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'در اصل تفاوت قیمتی برای هزینه نظافت منزل در تهران وجود ندارد. مبنای تفاوت قیمت‌ها دوری و یا نزدیکی نظافتچی به مکان ثبت شده کاربر است'
       }
     },
     {
       '@type': 'Question',
       'name': 'چگونه بهترین نظافتچی را انتخاب کنیم و از کار نظافتچی مطمئن باشیم؟',
       'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'در اپلیکیشن و وب سایت پالسین امکان مشاهده امتیاز نظافتچی وجود دارد. این امتیاز میانگین امتیازهای کاربران برای سرویس نظافت منزل به یک نظافتچی است. بنابراین شما می‌توانید بر اساس این امتیاز نظافتچی برتر را انتخاب کنید.'
       }
     },
     {
       '@type': 'Question',
       'name': 'نظافت منزل شامل چه فعالیت هایی است که نظافتچی موظف به انجام آن ها می باشد؟',
       'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'اصل کار نظافت منزل ، شامل جاروکشی و گردگیری اتاق‌ها است. به طور کلی پاک کردن و گردگیری تمامی زوایا و گوشه کنار محیط داخلی خانه را سرویس نظافت منزل می‌نامیم. بنابراین نظافت سرویس بهداشتی ، نظافت آشپزخانه ، پاک کردن شیشه‌ و در و پنجره‌ها ، کشیدن جاروبرقی سالن و اتاق‌ها جزء وظایف نظافتچی است. به طور مثال نظافت آشپزخانه شامل نظافت و خشک کردن داخل یخچال نیز می‌باشد.'
       }
     },
     {
       '@type': 'Question',
       'name': 'آیا نظافتچی باید وسایل نظافت را با خود به محل کار ببرد؟',
       'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'همراه داشتن وسایل به عهده نظافتچی نیست. اما شما می‌توانید پیش از شروع انجام کار با متخصص پالسین هماهنگی لازم را به منظور تهیه لوازم نظافت انجام دهید. توجه داشته باشید که هزینه خرید لوازم شوینده به عهده شما می‌باشد.'
       }
     },
    ]
  };

  json_carpet = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    'name' : "قالیشویی",
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '77735224 - 77743281',
      'contactType': 'خدمات آنلاین'
    },
    'aggregateRating': {
      "@type": "AggregateRating",
      'ratingValue': "4.72",
      'ratingCount': "1513",
      'bestRating': "5",
      'worstRating': "1"
    },
    'description' : "سرویس قالیشویی پالسین با قیمت مناسب و کیفیت عالی، شما میتوایند درخواست قالیشویی خود را به صورت آنلاین ثبت نمایید",
    'category': "سرویس قالیشویی" ,
    'offers' : {
      "@type": "AggregateOffer",
      'lowPrice': "75000",
      'highPrice': "250000",
      'priceCurrency': "IRR"
    } 
  };

  qa_json_ld_carpet = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [{
      '@type': 'Question',
      'name': 'قیمت قالیشویی بر چه معیاری محاسبه می شود؟',
      'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'قیمت قالیشویی بر اساس نوع قالی ، متراژ فرش و نوع شستشوی قالی محاسبه می‌شود'
       }
     },
     {
       '@type': 'Question',
       'name': 'شستن فرش ها در قالیشویی چند روز زمان می برد؟',
       'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'در روزهای عادی سال ، از زمان جمع کردن قالی توسط نیروهای قالیشویی تا تحویل قالی ها به طور میانگین ۴۸ الی ۷۲ ساعت زمان می‌برد'
       }
     },
     {
       '@type': 'Question',
       'name': 'قالیشویی فرش های شسته شده را چگونه به مشتری تحویل می‌دهد؟',
       'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'پس از خشک شدن فرش ها، قالیشویی موظف است فرش را لوله کرده و بر روی آن روکش های پلاستیکی قرار دهد. قالی های لول شده با هماهنگی با مشتری به ایشان تحویل داده می‌شود.'
       }
     },
     {
       '@type': 'Question',
       'name': 'احتمال خرابی فرش در قالیشویی وجود دارد؟',
       'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'هنگام شستن فرش در قالیشویی ، برخی فرش ها مثل فرش فانتزی، اگر با دستگاه شسته شوند احتمال خرابی دارند. از این رو متخصصین قالیشویی پیش از شستن فرش نحوه شستشوی مناسب فرش را به کاربر اطلاع می‌دهند. '
       }
     },
     {
       '@type': 'Question',
       'name': 'هزینه رفو و تعمیر قالی چقدر است؟',
       'acceptedAnswer': {
         '@type': 'Answer',
         'text': 'بسته به میزان خرابی و پارگی فرش و همچنین نوع نخ فرش ، قیمت رفوی فرش متفاوت است ، شما می‌توانید با آپلود تصویر در زمان ثبت سفارش قالیشویی از متخصصین قالیشویی قیمت دقیق رفوی فرش را بگیرید.'
       }
     },
    ]
  };

  json_moveing = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    'name' : "اسباب کشی",
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '77735224 - 77743281',
      'contactType': 'خدمات آنلاین'
    },
    'aggregateRating': {
      "@type": "AggregateRating",
      'ratingValue': "4.75",
      'ratingCount': "2025",
      'bestRating': "5",
      'worstRating': "1"
    },
    'description' : "سرویس اسباب کشی و باربری پالسین با قیمت مناسب و کیفیت عالی، شما میتوایند درخواست اسباب کشی و باربری خود را به صورت آنلاین ثبت نمایید",
    'category': "سرویس باربری و اسباب کشی"
  };

  constructor(private httpService: HttpService,
    private webAppHttp: webappHttpService,
    private customFunction: CustomFunctionsService,
    private activeRoute: ActivatedRoute,
    public shared: SharedService,
    private urlRest: UrlRest,
    private router: Router,
    public titleSeo: Title,
    public meta: Meta,
    public storage: StorageService,
    private httpIqBaz: IqbazService,
    private location: LocationStrategy,
    private toastr: ToastrService,
    private toastMsg: ToastMessage,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) private platformId: Object) {
      this.shared.pagePath.next('categories3');
      this.shared.inPageDownload.next(false);
      this.shared.iqbazBanerShow.next(false);
      this.lottieConfig = {
        path: 'assets/webappPics/happy_gift.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
    }

  ngOnInit() {
    if(isPlatformBrowser(this.platformId)){
      window.scrollTo(0, 0);
      this.token = localStorage.getItem('userToken');
      this.path = document.URL;
      this.imagePath = this.urlRest.imagePath;
      /*
      if(this.path.indexOf('gAds') != -1){
        this.webAppHttp.getCountClickDiscount(this.storage.deviceType, this.cat3Ename+"_Ads").subscribe(res => {});
      }
      else{
        this.webAppHttp.getCountClickDiscount(this.storage.deviceType, this.cat3Ename).subscribe(res => {});
      }
      */
    } 
    this.init();
  }//end ngOnInit

  toggleState(index:number) {
    this.FAQList[index].state = this.FAQList[index].state === 'show' ? 'hide' : 'show';
  }//end toggleState

  init() {
    this.activeRoute.params.subscribe((param: Params) => {
      this.cat3Ename = param.cat3Ename;      
      this.httpService.getJobCat3ByEnameNew(this.cat3Ename, this.token).subscribe(data => {
        console.log("==اطلاعات صفحه jobcat3:==");
        console.log(data);        
        this.metaService.createCanonicalURL(this.metaService.webBasicUrl + "/categories3/" + this.cat3Ename);
        if(data.newStyle == true){
          this.flag = 2;
          this.titleSeo.setTitle(data.seoNewFormat.titleSeo);
          this.meta.updateTag({
            name: 'description',
            content: data.seoNewFormat.descriptionSeo
          });
          if(data.seoNewFormat.priceInfo){
            this.priceInfo = data.seoNewFormat.priceInfo;
          }
          this.otherDiscountList = data.seoNewFormat.otherDiscounts;
          this.jobcat3Selected = data.seoNewFormat.jobCategory3;
          this.cat3ID = this.jobcat3Selected.id;
          //console.log("cat3ID: " + this.cat3ID);
          this.h1Header = data.seoNewFormat.headerTxtH1;
          this.h2Header = data.seoNewFormat.headerTxtH2;
          this.imgHeader = this.imagePath + data.seoNewFormat.imageHeader;
          this.altImageHeader = data.seoNewFormat.altImage;
          this.jobCat3FarsiName = data.seoNewFormat.jobCategory3.name;
          this.btnText = "ثبت درخواست " + data.seoNewFormat.jobCategory3.name;
          this.introdouction = data.seoNewFormat.introductionTxt;
          this.h2TitleFAQ = data.seoNewFormat.questionsTitleH2;
          this.htmlList = data.seoNewFormat.htmlDataList;
          this.htmlIndexList = data.seoNewFormat.htmlIndexList;
          if(data.seoNewFormat.comments){
            this.userCommentList = data.seoNewFormat.comments;
            console.log("نظرات کاربران:");
            console.log(this.userCommentList);
          }
          
          //اسکیما مارک آپ برای نظافت = 163
          if(this.cat3ID == 163){
            this.jsonLD = this.json_nezafat;
            this.qa_json_ld = this.qa_json_ld_nezafat;
          }
          //اسکیما مارک آپ برای قالیشویی = 313
          else if(this.cat3ID == 313){
            this.jsonLD = this.json_carpet;
            this.qa_json_ld = this.qa_json_ld_carpet;
          }
          //اسکیما مارک آپ برای اسباب کشی = 322
          else if(this.cat3ID == 322){
            this.jsonLD = this.json_moveing;
          }
          //برای باقی کت ها
          else {
            this.jsonLD = null;
          }
          if(data.seoNewFormat.generalDiscount){
            this.haveGeneralOffCode = true;
            this.generalOffCode_code = data.seoNewFormat.generalDiscount.code;
            this.generalOffCode_Percent = this.customFunction.chanageNumbersToFarsi(data.seoNewFormat.generalDiscount.percent.toString());
            this.generalOffCode_maxPrice = this.customFunction.chanageNumbersToFarsi(data.seoNewFormat.generalDiscount.maxCredit.toString());
            this.generalOffCode_maxPrice = this.customFunction.formatAmountMoney(this.generalOffCode_maxPrice);
            this.imgMainDiscount = data.seoNewFormat.generalDiscount.image
          }
          if(data.seoNewFormat.firstUseDiscount){
            this.haveFirstUseOffCode = true;
            this.firstUseOffCode_code = data.seoNewFormat.firstUseDiscount.code;
            this.firstUseOffCode_Percent = this.customFunction.chanageNumbersToFarsi(data.seoNewFormat.firstUseDiscount.percent.toString());
            this.firstUseOffCode_maxPrice = this.customFunction.chanageNumbersToFarsi(data.seoNewFormat.firstUseDiscount.maxCredit.toString());
            this.firstUseOffCode_maxPrice = this.customFunction.formatAmountMoney(this.firstUseOffCode_maxPrice);
            this.imgMainDiscount = data.seoNewFormat.firstUseDiscount.image;
          }
          data.seoNewFormat.questions.forEach(item =>{
            let q:faqs = {
              question: item.question,
              response: item.answer,
              state: "hide"
            }
            this.FAQList.push(q);
          });
          /*
          if(this.haveFirstUseOffCode || this.haveGeneralOffCode){
            this.timerLoadingDiscount();
          }
          */
        }
        else if(data.newStyle == false){
          this.flag = 1;
          this.jobcat3Selected = data.seoLastFormat.jobCategory3;
          this.cat3ID = data.seoLastFormat.cat3Id;
          this.jobCat3FarsiName = data.seoLastFormat.name;
          this.txtRequest = "ثبت درخواست " + this.jobCat3FarsiName;
          this.googleAnalyticsCategory = this.cat3Ename;
          this.imageCat3 = this.imagePath + data.seoLastFormat.tumbnail;
          this.mobileImgCat3 = this.imagePath + data.seoLastFormat.tumbnail;
          this.descriptionForJobcat3 = data.seoLastFormat.paragraphs;
          this.seoDescription = data.seoLastFormat.info;
          this.titleSeo.setTitle("پالسین - " + this.jobCat3FarsiName);
          this.meta.updateTag({
            name: 'description',
            content: this.seoDescription 
          });
        }
      }, error => {
        //this.router.navigate(['/notFound']);
        console.log('صفحه مورد نظر یافت نشد');
        console.log("ممکن است تایم اوت رخ داده باشد");
        console.log(error);
      });

      this.shared.iqbazCat3LinkPoint.subscribe(res => {
        if(res){
          if(res == this.cat3Ename){
            this.timerCustom();
          }
        }
      });

    });
  }//end init

  onJobCat3(item:JobCategory3V){
    /*this.toastr.clear();
    this.toastr.warning(this.toastMsg.msgUpdateServer, this.toastMsg.title4UpdatServer);
    */
    /**/
    this.shared.showDescription = false;    
    this.isLoading = true;
    if(!item){
      //console.log("دسته3 داده ندارد!!!");
      this.isLoading = false;
    }
    else{
      this.webAppHttp.getGuestPreRegisterRequest(item.id).subscribe(res => {
        //console.log("اطلاعات پری رجیستر با توکن مهمان:");
        //console.log(res);
        this.isLoading = false;
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
            this.router.navigate([EnumUrls.requestRegister_selectCity]);
          }
          else if(!res.haveQuestion){
            //no question and go to descriptions request
            //module description
            this.router.navigate([EnumUrls.requestRegister_selectCity]);
          }
        }
      }, error => {
        this.isLoading = false;
        //console.log("خطای کاربر  مهمان");
        //console.log(error);
      });
    }
    /**/
  }//end onJobCat3

  /*---start iqbaz timer---*/
  intervalRemaind:any = null;
  second:number = 60;
  showTimerIqbaz:boolean = false;
  textSecond:string = '۶۰';
  timerIqBazFinish:boolean = false;
  timerCustom(){
    this.showTimerIqbaz = true;
    if(isPlatformBrowser(this.platformId)){
      this.intervalRemaind = setInterval(()=>{
        this.second--;
        if(this.second > 9){
          this.textSecond = this.customFunction.chanageNumbersToFarsi(this.second.toString());
        }
        else{
          this.textSecond = '۰'+ this.customFunction.chanageNumbersToFarsi(this.second.toString());
        }
        if(this.second <= 0){
          clearInterval(this.intervalRemaind); 
          this.httpIqBaz.getReadLink(this.token).subscribe(res => {
            this.timerIqBazFinish = true;
            this.shared.iqbazCat3LinkPoint.next(null);
          }, error => {
            //error
          });
        }
      }, 1000);
    }
  }//end timerCustom
  /*---end iqbaz timer---*/ 

  onLogo(){
    this.router.navigate([EnumUrls.address_home]);
  }//end onLogo

  onClose(){
    this.router.navigate([EnumUrls.address_home]);
  }//end onClose

  onBack(){
    this.location.back();
  }//end onBack

  onStart(item:JobCategory3V){
    this.onJobCat3(item);
    /*
    this.isLoading = true;
    if(!item){
      //console.log("دسته3 داده ندارد!!!");
      this.isLoading = false;
    }
    else{
      this.webAppHttp.getGuestPreRegisterRequest(item.id).subscribe(res => {
        this.isLoading = false;
        if(!res.haveActiveWorker){
          this.toastr.clear();
          this.toastr.warning(this.toastMsg.msg4NoWorker, this.toastMsg.title4NoWorker);
        }
        else{
          this.shared.reqRej_preRegister = res;
          this.shared.reqRej_jobcat3Select = item;
          if(res.haveQuestion){
            this.shared.jobcat3FromLandingPage = true;
            this.router.navigate([EnumUrls.requestRegister_questions]);
          }
          else if(!res.haveQuestion){
            this.router.navigate([EnumUrls.requestRegister_extraDescription]);
          }
        }
      }, error => {
        this.isLoading = false;
        //console.log("خطای کاربر  مهمان");
        //console.log(error);
      });
    }
    */
  }//end onStart


  copyGeneralOffCode(){
    if(isPlatformBrowser(this.platformId)){
      sessionStorage.setItem('discountCode',this.generalOffCode_code);
      this.onJobCat3(this.jobcat3Selected);
    }
  }

  copyFirstUseOffCode(){
    if(isPlatformBrowser(this.platformId)){
      sessionStorage.setItem('discountCode',this.firstUseOffCode_code);
      this.onJobCat3(this.jobcat3Selected);
    }
  }

  /*===start timer loading discount codes====*/
  intervalLoading:any = null;
  showLoadingDiscount:boolean = false;
  //textDiscountCodeLoading:string = ' ثانیه تا بارگذاری کدهای تخفیف شگفت‌انگیز...';
  showDiscountCodesAfterTimer:boolean = true;
  secondLoadingDiscount:number;
  countDownShowDiscountCode:string;

  changePercentFa(percentNumber:number):string{
    return this.customFunction.chanageNumbersToFarsi(percentNumber.toString());
  }//end changePercentFa

  changeMaxCreditFa(maxCreditNumber:number):string{
    let maxCreditFarsi:string = this.customFunction.chanageNumbersToFarsi(maxCreditNumber.toString());
    return this.customFunction.formatAmountMoney(maxCreditFarsi);
  }//end changeMaxCreditFa

  changePriceToFa(priceEn:number):string{
    let priceFarsi:string = this.customFunction.chanageNumbersToFarsi(priceEn.toString());
    return this.customFunction.formatAmountMoney(priceFarsi);
  }//end changePriceToFa

  onSliderDiscount(discount:CDashboardDiscount){
    this.selectedJobcatDiscount = discount;
    this.isLoading = true;
    if(isPlatformBrowser(this.platformId)){
      let numCountDown:number = 2;
      this.intervalLoading = setInterval(()=>{
        numCountDown--;
        if(numCountDown <= 0){
          clearInterval(this.intervalLoading); 
          this.isLoading = false;
          this.shared.showDiscountModal.next(true);
        }
      }, 1000);
    }
  }//end onSliderDiscount

  makeTextDiscount(percent:number , maxCredit:number):string{
    return this.changePercentFa(percent) + " درصد تخفیف تا سقف " + this.changeMaxCreditFa(maxCredit) + this.unitIranMoney;
  }//end makeTextDiscount

  emitSelectedJobcat(jobcat3Val:any){
    this.onJobCat3(jobcat3Val);
  }//end emitSelectedJobcat

  scroll(elID:number) {
    //console.log("click: " + elID);
    let el = document.getElementById(elID.toString());
    el.scrollIntoView({behavior:"smooth"});
  }//end scroll

  sendIdea(){
    let uc_cat3ID:number = 0;
    if(this.ans_cat3Id != null){
      uc_cat3ID = this.ans_cat3Id;
    }
    else{
      uc_cat3ID = this.cat3ID;
    }
    if(this.storage.isLogin.value){
      let userToken = localStorage.getItem("userToken");
      let data: userCat3CommentDto = {
        id: null,
        cat3Id: uc_cat3ID,
        parentId: this.ans_parentId,
        userName: "",
        mobileNumber: "",
        text: this.uesrIdeatext,
        registerTime: null,
        answers: null
      };
      //console.log(data);
      this.httpService.postUserIdea(userToken, data).subscribe(res =>{
        this.onCancelAnswer();
        this.toastr.clear();
        this.toastr.success(this.toastMsg.msgUserCommentRegisterSuccess, this.toastMsg.title4UserCommentRegisterSuccess);
      }, error =>{
        //console.log(error);
      });
    }
    else{
      let token:string = '';
      let uc_userName:string = 'ناشناس';
      if(this.userName.length > 1){
        uc_userName = this.userName;
      }
      if(this.userMobile.length == 0){
        this.userMobile = '';
        let data: userCat3CommentDto = {
          id: null,
          cat3Id: uc_cat3ID,
          parentId: this.ans_parentId,
          userName: uc_userName,
          mobileNumber: this.userMobile,
          text: this.uesrIdeatext,
          registerTime: null,
          answers: null
        };
        //console.log(data);
        this.httpService.postUserIdea(token, data).subscribe(res =>{
          this.toastr.clear();
          this.toastr.success(this.toastMsg.msgUserCommentRegisterSuccess, this.toastMsg.title4UserCommentRegisterSuccess);
          this.onCancelAnswer();
        }, error =>{
          //console.log(error);
        });
      }
      else if(this.userMobile.length > 0 && this.userMobile.length < 12){
        if(this.userMobile.length == 11){
          this.userMobile = this.customFunction.chanageNumbersToEnglish(this.userMobile);
          let splitInput = this.userMobile.split('');
          if(splitInput[0] == '0' && splitInput[1] == '9' && 
            (splitInput[2] == '0' || splitInput[2] == '1' || splitInput[2] == '2' || 
            splitInput[2] == '3' || splitInput[2] == '4' || splitInput[2] == '5' ||
            splitInput[2] == '6' || splitInput[2] == '7' || splitInput[2] == '8' || splitInput[2] == '9') &&
            (splitInput[3] == '0' || splitInput[3] == '1' || splitInput[3] == '2' || 
            splitInput[3] == '3' || splitInput[3] == '4' || splitInput[3] == '5' ||
            splitInput[3] == '6' || splitInput[3] == '7' || splitInput[3] == '8' || splitInput[3] == '9') &&
            (splitInput[4] == '0' || splitInput[4] == '1' || splitInput[4] == '2' || 
            splitInput[4] == '3' || splitInput[4] == '4' || splitInput[4] == '5' ||
            splitInput[4] == '6' || splitInput[4] == '7' || splitInput[4] == '8' || splitInput[4] == '9') &&
            (splitInput[5] == '0' || splitInput[5] == '1' || splitInput[5] == '2' || 
            splitInput[5] == '3' || splitInput[5] == '4' || splitInput[5] == '5' ||
            splitInput[5] == '6' || splitInput[5] == '7' || splitInput[5] == '8' || splitInput[5] == '9') &&
            (splitInput[6] == '0' || splitInput[6] == '1' || splitInput[6] == '2' || 
            splitInput[6] == '3' || splitInput[6] == '4' || splitInput[6] == '5' ||
            splitInput[6] == '6' || splitInput[6] == '7' || splitInput[6] == '8' || splitInput[6] == '9') &&
            (splitInput[7] == '0' || splitInput[7] == '1' || splitInput[7] == '2' || 
            splitInput[7] == '3' || splitInput[7] == '4' || splitInput[7] == '5' ||
            splitInput[7] == '6' || splitInput[7] == '7' || splitInput[7] == '8' || splitInput[7] == '9') &&
            (splitInput[8] == '0' || splitInput[8] == '1' || splitInput[8] == '2' || 
            splitInput[8] == '3' || splitInput[8] == '4' || splitInput[8] == '5' ||
            splitInput[8] == '6' || splitInput[8] == '7' || splitInput[8] == '8' || splitInput[8] == '9') &&
            (splitInput[9] == '0' || splitInput[9] == '1' || splitInput[9] == '2' || 
            splitInput[9] == '3' || splitInput[9] == '4' || splitInput[9] == '5' ||
            splitInput[9] == '6' || splitInput[9] == '7' || splitInput[9] == '8' || splitInput[9] == '9') &&
            (splitInput[10] == '0' || splitInput[10] == '1' || splitInput[10] == '2' || 
            splitInput[10] == '3' || splitInput[10] == '4' || splitInput[10] == '5' ||
            splitInput[10] == '6' || splitInput[10] == '7' || splitInput[10] == '8' || splitInput[10] == '9')){
              let data: userCat3CommentDto = {
                id: null,
                cat3Id: uc_cat3ID,
                parentId: this.ans_parentId,
                userName: uc_userName,
                mobileNumber: this.userMobile,
                text: this.uesrIdeatext,
                registerTime: null,
                answers: null
              };
              //console.log(data);
              this.httpService.postUserIdea(token, data).subscribe(res =>{
                this.toastr.clear();
                this.toastr.success(this.toastMsg.msgUserCommentRegisterSuccess, this.toastMsg.title4UserCommentRegisterSuccess);
                this.onCancelAnswer();
                //console.log("it is ok register success");
              }, error =>{
                //console.log(error);
              });
          }
          else{
            this.toastr.clear();
            this.toastr.error(this.toastMsg.msgErrorMobileNumber, this.toastMsg.title4ErroeMobile);
          }
        }
        else{
          this.toastr.clear();
          this.toastr.error(this.toastMsg.msgErrorMobileNumber, this.toastMsg.title4ErroeMobile);
        }
      }
      else if(this.userMobile.length >= 12){
        this.toastr.clear();
        this.toastr.error(this.toastMsg.msgErrorMobileNumber, this.toastMsg.title4ErroeMobile);
      }
    }
  }//end sendIdea

  onAnswer(commentID:number){
    this.uesrIdeatext = '';
    this.userMobile = '';
    this.userName = '';
    this.showMainIdeaBox = false;
    this.ans_cat3Id = 0;
    this.ans_parentId = commentID;
    this.ansID = commentID;
  }//end onAnswer

  onCancelAnswer(){
    this.uesrIdeatext = '';
    this.userMobile = '';
    this.userName = '';
    this.showMainIdeaBox = true;
    this.ans_cat3Id = null;
    this.ans_parentId = null;
    this.ansID = null;
  }//end onCancelAnswer

}
