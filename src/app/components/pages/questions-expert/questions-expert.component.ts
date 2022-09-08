import { SharedService } from '../../../services/shared/shared.service';
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { JobCategory2V } from '../../class/jobCategory2V.class';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { isPlatformBrowser } from '@angular/common';
import { UrlRest } from '../../class/urlRest.class';
import { MetaService } from '../../../services/metaTag/meta.service';

@Component({
  selector: 'app-questions-expert',
  templateUrl: './questions-expert.component.html',
  styleUrls: ['./questions-expert.component.css'],
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
        transform: 'rotate(-90deg)'
      })),
      transition('hide <=> show', animate('200ms ease-in'))
    ])
  ]
})
export class QuestionsExpertComponent implements OnInit {

  ExpertFAQs = [
    {
      id:"1",
      question:"اپلیکیشن را نصب کرده ام، اما فعال نشده. برای فعال کردن اپلیکیشن چه کاری باید انجام دهم؟",
      response:"پس از نصب و ثبت نام، کارشناسان واحد پشتیبانی با شما تماس می‌گیرند و در خصوص مدارک مورد نیاز شما را راهنمایی خواهند کرد. پس از ارائه مدارک مورد نیاز، اپلیکیشن متخصصین پالسین بر روی گوشی شما فعال خواهد شد.",
      state:"hide"
    },
    {
      id:"2",
      question:"همه‌ی مدارک را ارائه داده ام، اما اپلیکیشن هنوز برای من فعال نشده است!",
      response:"پس از ارائه مدارک، لازم است تا موقعیت مکانی و آدرس دقیق خود را در اپلیکیشن وارد کنید تا روند فعال سازی نهایی شود.",
      state:"hide"
    },
    {
      id:"3",
      question:"چرا با وجود فعال شدن اپلیکیشن، درخواستی برای من نمی آید؟",
      response:"بهترین پیشنهاد ما به شما این است که مناطق سرویس‌دهی خود را به کل شهر تهران گسترش دهید تا از سرتاسر شهر درخواست داشته باشید. در عین حال اگر اعتبار شما کمتر از ده هزار تومان باشد درخواست کار برای شما ارسال نمی شود. با پیشتبانی تماس بگیرید. یا از بخش افزایش اعتبار نسبت به افزایش موجودی خود اقدام فرمایید.",
      state:"hide"
    },
    {
      id:"4",
      question:"مناطق خدمات رسانی را به تمام تهران گسترش داده ام، اما هنوز درخواستی برای من ارسال نمی‌شود.",
      response:"اگر اپلیکیشن خود را در حالت استراحت قرار داده باشید، درخواست‌های کاربران برای شما ارسال نمی‌شود.",
      state:"hide"
    },
    {
      id:"5",
      question:"چگونه مدارک خود را برای شما ارسال کنم؟",
      response:"برای ارسال مدارک اولیه لازم است که از بخش حساب من وارد بخش مدارک شوید!",
      state:"hide"
    },
    {
      id:"6",
      question:"می‌خواهم نمونه کارها را وارد کنم، اما نمی‌دانم که به کدام بخش اپلیکیشن وارد شوم؟",
      response:"سریع‌ترین راه برای ارسال مدارک، آپلود آنها در اپلیکیشن است. به حساب من وارد شوید و به بخش مدارک بروید.",
      state:"hide"
    },
    {
      id:"7",
      question:"آدرس را چطور اضافه کنم؟",
      response:"به حساب من وارد شوید و آدرس خود را به موقعیت مکانی اضافه کنید.",
      state:"hide"
    },
    {
      id:"8",
      question:"از کجا می‌توانم درخواست‌های خود را ببینم؟",
      response:"از بخش پالس‌ها وارد درخواست‌های ورودی شوید.",
      state:"hide"
    },
    {
      id:"9",
      question:"چطور می توانم پیشنهادات خود را ویرایش کنم؟",
      response:"برای اینکار می‌بایست به بخش پالس‌ها وارد شوید و به پاسخ‌های من بروید.",
      state:"hide"
    },
    {
      id:"10",
      question:"چگونه می‌توانم درخواست‌هایی را که مورد تایید کاربران قرار گرفته مشاهده کنم؟",
      response:"از بخش پالس ها وارد فعالیت‌های جاری شوید.",
      state:"hide"
    },
    {
      id:"11",
      question:" از کجا بفهمم کاربر هزینه‌ی انجام‌کار را پرداخت کرده است؟",
      response:"اگر کاربر پرداخت خود را بصورت آنلاین انجام دهد، ما شما را از طریق یک اعلان (نوتیفیکیشن) باخبر می‌کنیم.",
      state:"hide"
    },
    {
      id:"12",
      question:" چگونه سوابق کاری خود را ببینم؟",
      response:"از بخش گزارش‌ها، وارد سوابق شوید.",
      state:"hide"
    },
    {
      id:"13",
      question:" آیا می‌توانم گزارش های مالی گذشته را مشاهده کنم؟",
      response:"بله. تنها کافی است که از بخش گزارش ها وارد بخش مالی شوید.",
      state:"hide"
    },
    {
      id:"14",
      question:"چگونه با پشتیبانی تماس بگیریم؟",
      response:"در صفحه‌ی اصلی، از گزینه‌های موجود در بالای صفحه، گزینه‌ی تماس با پشتیبانی را انتخاب کنید.",
      state:"hide"
    },
    {
      id:"15",
      question:"نمی‌خواهم درخواست کار جدید بگیریم!",
      response:"به صفحه‌ی اصلی اپلیکیشن وارد شوید و دکمه‌ی استراحت را لمس کنید.",
      state:"hide"
    },
    {
      id:"16",
      question:"چطور می‌توانم به مهارت‌های شغلی اضافه یا کم کنم؟",
      response:"از بخش حساب من، وارد مهارت های شغلی شوید، از طریق جستجو و یا افزودن دسته بندی شغلی، نسبت به حذف یا اضافه کردن مهارت مورد نظر اقدام کنید.",
      state:"hide"
    },
    {
      id:"17",
      question:"چگونه پروفایل خود را تکمیل کنم؟",
      response:"از بخش حساب من وارد اطلاعات فردی شوید.",
      state:"hide"
    },
    {
      id:"18",
      question:"آیا می‌توانم برای درخواست‌های ارسال شده پیش فاکتور ارسال نکنم؟",
      response:"بله تا قبل از شروع کار می توانید فاکتور ارسال نکنید و با این کار هزینه‌ی کار را توافقی اعلام نمایید.",
      state:"hide"
    },
    {
      id:"19",
      question:"آیا می‌توانم در موقع ارسال فاکتور در مرحله‌ی ارائه‌ی پیشنهاد درخواست بازدید از کار را داشته باشم؟",
      response:"بله می‌توانید در زمان ارائه پیشنهادات، گزینه‌ی نیاز به بازدید را روشن کنید.",
      state:"hide"
    },
    {
      id:"20",
      question:"بعد از صدور فاکتور نهایی، آیا امکان ویرایش آن وجود دارد؟",
      response:"بله! با کلیک روی دکمه ویرایش فاکتور نهایی در لیست درخواست‌های جاری، می‌توانید آخرین پیشنهاد خود را ویرایش کنید.",
      state:"hide"
    },
    {
      id:"21",
      question:"دربخش فعالیت‌های جاری، چگونه با کاربری که پیشنهادم را پذیرفته است تماس بگیرم؟",
      response:"در لیست فعالیت های جاری، می‌توانید با کلیک روی دکمه‌ی تماس با کاربر، با کاربر تماس بگیرید!",
      state:"hide"
    }
  ];


  isPC:boolean = true;
  categories1: JobCategory1V[];
  categories2: Array<JobCategory2V[]>;
  categories3: Array<JobCategory3V[]>;
  path:string = '';
  xWindow:number = 1000;

  constructor(private basicData: BasicDataService,
    private urlRest: UrlRest,
    public titleSeo:Title,
    public meta:Meta,
    private metaService: MetaService,
    public shared: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.shared.inPageDownload.next(true);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.path = this.urlRest.imagePath;
    this.titleSeo.setTitle("پالسین - سوالات متخصصین");
    this.meta.updateTag({
      name: 'description',
      content: "پاسخ به سوالات رایجی که ممکن است برای متخصصین پالسین بوجود آمده باشد."
    });

    this.metaService.createCanonicalURL(this.metaService.webBasicUrl + "/FAQs-expert");

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.modeInit();

      this.basicData.setCategories.subscribe(res => {
        if(res){
          //console.log("question-Expert ***");
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
      if(this.xWindow <= 760){
       this.isPC = false;
      }
      else{
       this.isPC = true;
      }
    } 
  }

  modeInit(){
    this.xWindow = window.innerWidth;
    if(this.xWindow <= 760){
     this.isPC = false;
    }
    else{
     this.isPC = true;
    } 
  }

  toggleState(index) {
    this.ExpertFAQs[index].state = this.ExpertFAQs[index].state === 'show' ? 'hide' : 'show';
  }

}
