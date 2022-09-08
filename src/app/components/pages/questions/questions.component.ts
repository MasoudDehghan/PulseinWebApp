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
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
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

export class QuestionsComponent implements OnInit {

  mainDescrip:string = 'تیم پالسین نهایت دقت را به خرج داده تا کاربران و متخصصین به سادگی با اپلیکیشن و خدمات ما ارتباط برقرار کنند. در هر صورت برای روشن شدن پاسخ های عمومی کاربران و متخصصین، تیم پشتیبانی در این صفحه نسبت به پاسخگویی سوآلاتی که بیشترین دفعات مراجعه را داشته اند اقدام کرده است.';
  clientFAQs = [
    {
      id:'1',
      question:'چگونه می توانم درخواست خود را ثبت کنم؟',
      response:'می‌توان از بخش ثبت درخواست یا جستجوی سرویس ها، درخواست خود را ثبت کنید. به این نکته توجه داشته باشید که برای ثبت درخواست، ابتدا می بایست ثبت نام کرده باشید.',
      state:'hide'
    },
    {
      id:'2',
      question:'چگونه ثبت نام کنم؟',
      response:'از منوی کشویی گزینه‌ی ”ورود یا ثبت نام“ را لمس کنید.',
      state:'hide'
    },
    {
      id:'3',
      question:'بعد از ثبت یک درخواست، چگونه مراحل اجرای سفارشم را دنبال کنم؟',
      response:'در صفحه‌ی اصلی گزینه‌ی درخواست‌ها را لمس کنید و از بخش درخواست جاری مراحل اجرای کار را دنبال نمایید.',
      state:'hide'
    },
    {
      id:'4',
      question:'درخواست خود را ثبت کرده ام اما هیچ پیشنهادی نیامده است! چرا؟',
      response:'یکی از اصلی‌ترین علل این موضوع، به ویژگی‌هایی برمی گردد که شما برای درخواست خود ثبت کرده اید. ممکن است اطلاعات ورودی برای اجرای این کار کافی نباشد و یا اطلاعات مورد نیاز متخصص را در اختیار او قرار نداده باشید.',
      state:'hide'
    },
    {
      id:'5',
      question:'چرا برخی از پیشنهادات ارسال شده قیمت ندارند؟',
      response:'احتمالا متخصص نتوانسته هزینه و زمان مورد نیاز برای اجرای کار را تخمین بزند.',
      state:'hide'
    },
    {
      id:'6',
      question:'چرا پیشنهاد متخصصین دارای قیمت های بالایی است؟',
      response:'پیشنهاد اولیه در واقع نوعی پیش فاکتور است. ممکن است بعد از تماس اولیه و رویت کار از نزدیک و چانه زنی، قیمت ها کاهش پیدا کنند.',
      state:'hide'
    },
    {
      id:'7',
      question:'آیا می‌توانم بعد از پذیرش یک متخصص آن را رد و پشنهادات دیگر را دوباره بررسی کنم؟',
      response:'بله در صورتی که درخواست شما اورژانسی نباشد و روی درخواست شما بیش از یک پیشنهاد ارسال شده باشد.',
      state:'hide'
    },
    {
      id:'8',
      question:'آیا می‌توانم بعد از پذیرش یک متخصص پیشنهاد خود را لغو کنم؟',
      response:'بله، تا پیش از مرحله‌ی شروع کار می‌توانید درخواست خود را لغو کنید.',
      state:'hide'
    },
    {
      id:'9',
      question:'در مرحله‌ی منتظر تایید شروع، چگونه شروع کار را تایید کنم؟',
      response:'از بخش درخواست‌ها، وارد جزئیات درخواست ثبت شده شوید، اگر فاکتور جدید و شروع کار را تایید می‌کنید، دکمه تایید را لمس نمایید.',
      state:'hide'
    },
    {
      id:'10',
      question:'آیا با پرداخت نقدی یک درخواست، بازهم می‌توانم از تخفیف ها یا بسته های ویژه‌ی اپلیکیشن استفاده کنم؟',
      response:'خیر! در صورت پرداخت اعتباری یا آنلاین می‌توانید از تخفیف‌های اپ استفاده کنید.',
      state:'hide'
    },
    {
      id:'11',
      question:'بعد از پذیرش یک متخصص چگونه با او تماس بگیرم؟',
      response:'از بخش درخواست‌ها وارد جزئیات درخواست ثبت شده شوید، و روی دکمه‌ی تماس کلیک کنید.',
      state:'hide'
    }
  ];

  isPC:boolean = true;
  categories1: JobCategory1V[];
  categories2: Array<JobCategory2V[]>;
  categories3: Array<JobCategory3V[]>;
  xWindow:number = 1000;
  path:string = '';

  constructor(private basicData: BasicDataService,
    private urlRest: UrlRest,
    public titleSeo:Title,
    public meta: Meta,
    private metaService: MetaService,
    public shared: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.path = this.urlRest.imagePath;
    
    this.titleSeo.setTitle("پالسین - سوالات کاربران");
    this.meta.updateTag({
      name: 'description',
      content: "پاسخ به سوالات رایجی که ممکن است برای کاربران پالسین بوجود آمده باشد."
    });

    this.metaService.createCanonicalURL(this.metaService.webBasicUrl + "/FAQs");

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.modeInit();

      this.basicData.setCategories.subscribe(res => {
        if(res){
          //console.log("question ***");
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
    this.xWindow = window.innerWidth;
    if(this.xWindow <= 720){
     this.isPC = false;
    }
    else{
     this.isPC = true;
    } 
  }


  toggleState(index:number) {
    this.clientFAQs[index].state = this.clientFAQs[index].state === 'show' ? 'hide' : 'show';
  }

}
