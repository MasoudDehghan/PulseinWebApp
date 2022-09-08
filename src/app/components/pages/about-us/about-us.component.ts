import { UrlRest } from '../../class/urlRest.class';
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { JobCategory2V } from '../../class/jobCategory2V.class';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { isPlatformBrowser } from '@angular/common';
import { SharedService } from '../../../services/shared/shared.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  title:string = "درباره پالسین";
  aboutUs:string = "اپلیکیشن پالسین به عنوان یک پلتفرم جامع خدمات منزل و دفاتر اداری، در سال ۱۳۹۷ و به صورت یک سامانه جامع از امکانات متنوع برای کاربران و متخصصین راه اندازی شد. هدف از راه اندازی پالسین، فراهم سازی فضای رقابتی برای کسب و کارهایی است که تلاش می کنند با استفاده از مهارت های فنی و توانایی های هنری خود، خدمات خود را بصورت آنلاین به مشتریان ارائه دهند. در عین حال،‌ پالسین با بهرمندی از امکانات گسترده ای که اینترنت و راه های ارتباطی نوین فراهم آورده، به کاربران این قدرت را می دهد تا خدمات و نیازمندی های منزل خود را از طریق اپلیکیشن مرتفع کنند و هزینه‌ی خدمات انتخابی را از میان فهرستی از متخصصین، با قیمت های رقابتی پرداخت نمایند. امکان ویژه پالسین برای کسب و کارهای آفلاین، فراهم سازی فضای منحصربفردی است که علاوه بر مشتریان جدید، امکانات تازه‌ای برای معرفی و جذب درآمدهای تازه دراختیار آنها قرار می دهد. همین موضوع پالسین را به یک اکوسیستم جامع از خدمات تبدیل می‌کند که بخش زیادی از نیازهای کاربران را به کمک تخصص‌های متنوع نیروهای فنی و هنری برطرف می‌سازد. فارغ از تشریفات، عناوین شغلی و مراتب سازمانی، پالسین از متخصصان و کارشناسان حوزه تجارت الکترونیک، مدیریت و IT تشکیل شده است که با تمرکز بر روی یک سرویس و یا نیاز مشتری، هم در تسهیل فرایند انتخاب، و هم با استفاده از قدرت فضای آنلاین، خدمت مورد‌نظر را به شیوه و قیمتی عرضه می‌کند که به سختی می‌توان از دریافت آن صرف‌نظر نمود.";
  
  isPC:boolean = true;
  categories1: JobCategory1V[];
  categories2: Array<JobCategory2V[]>;
  categories3: Array<JobCategory3V[]>;
  xWindow:number = 1000;
  path:string = '';

  constructor(private basicData: BasicDataService,
              private urlRest: UrlRest,
              public titleSeo:Title,
              public meta:Meta,
              public shared: SharedService,
              @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.path = this.urlRest.imagePath;
    this.titleSeo.setTitle("پالسین :: درباره ما");
    this.meta.updateTag({
      name: 'description',
      content: "درباره پالسین"
    });

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.modeInit();

      this.basicData.setCategories.subscribe(res => {
        if(res){
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
  
}

