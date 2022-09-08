import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared/shared.service';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BasicDataService } from '../../services/basicData/basic-data.service';
import { JobCategory1V } from '../class/jobCategory1V.class';
import { JobCategory2V } from '../class/jobCategory2V.class';
import { JobCategory3V } from '../class/jobCategory3V.class';
import { HttpService } from '../../services/http/http.service';
import { Title, Meta } from '@angular/platform-browser';
import { UserIdea } from '../class/userIdea.class';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { MetaService } from '../../services/metaTag/meta.service';
import { Slider } from '../class/slider.class';
import { CookieService } from 'ngx-cookie-service';

const DATA_KEY = makeStateKey('dataKey');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  slidList:Slider[]=[
    {srcImage:"assets/image/header/slid0.png", linkPage:"https://pulsein.app/categories3/home-cleaning", alt:"نظافت منزل پالسین"},
    {srcImage:"assets/image/header/slid1.png", linkPage:"https://pulsein.app/categories3/Movers", alt:"اسباب کشی و حمل بار پالسین"},
    //{srcImage:"assets/image/header/slid2.png", linkPage:"https://pulsein.app/categories3/water-coolers", alt:"کولر آبی | تعمیر کولر آبی پالسین"},
    //{srcImage:"assets/image/header/slid3.png", linkPage:"https://pulsein.app/categories3/air-conditioners", alt:"کولر گازی | تعمیر کولر دوتیکه پالسین"},
    {srcImage:"assets/image/header/slid2.png", linkPage:"https://pulsein.app/categories3/heating-and-cooling-packages", alt:"تعمیر سیستم گرمایشی"},
    {srcImage:"assets/image/header/slid3.png", linkPage:"https://pulsein.app/categories3/furniture-cleaning", alt:"مبلشویی"},
    {srcImage:"assets/image/header/slid4.png", linkPage:"https://pulsein.app/categories3/carwash-at-home", alt:"کارواش نانو | کارواش سیار پالسین"}
  ];

  fixTimerValue:number = 4;
  timeSec:number = 0;
  interval: any = null;
  index:number = 0;

  categories1: JobCategory1V[] = [];
  categories2: Array<JobCategory2V[]> = [];
  categories3: Array<JobCategory3V[]> = [];

  user: string = 'client';
  ideasList:UserIdea[] = [];
  titleH1:string = "تمامی خدمات منزل را از پالسین بخواهید";
  subTitle1:string = "پالسین همه اینها رو به سادگی و با کیفیت عالی برای شما انجام میده";
  subTitle2:string = "خونه‌ات نامرتبه، وقت تمیزکاری نداری >> ";
  subTitle3:string = "دنبال قالیشویی مطمئن و حرفه‌ای هستی >> ";
  subTitle4:string = "ماشینت کثیفه اما نمی‌تونی ببریش کارواش >> ";
  subTitle5:string = "اثاث کشی دارید، باربری مطمئن می‌خوای >> ";
  linkTitleText1:string = "نظافت منزل پالسین";
  linkTitleText2:string = "قالیشویی پالسین";
  linkTitleText3:string = "کارواش پالسین";
  linkTitleText4:string = "اسباب کشی پالسین";
  linkTitlePath1:string = "/categories3/home-cleaning";
  linkTitlePath2:string = "/categories3/carpet-cleaning";
  linkTitlePath3:string = "/categories3/carwash-at-home";
  linkTitlePath4:string = "/categories3/Movers";
  mobDownloadText:string = "اپلیکیشن پالسین را نصب کنید";
  token:string = '';
  showPart1:boolean = false;
  showPart1_2:boolean = false;
  showPart2:boolean = false;
  showGoDownIcon:boolean = true;

  /*search*/
  listSearch: object[] = [];
  btnSearchState: string = 'show';
  showSearchResult: boolean = false;
  inputValue: string='';
  checkMousePosition: string = 'out';
  cat1Ename: string = '';
  cat2Ename: string = '';

  constructor(private basicData: BasicDataService,
    private httpService: HttpService,
    public titleSeo: Title,
    public shared: SharedService,
    public meta: Meta,
    private state: TransferState,
    private metaService: MetaService,
    private route: ActivatedRoute,
    private cookieService:CookieService,
    @Inject(PLATFORM_ID) private platformId: Object) {}  

  ngOnInit() {
    this.shared.iqbazBanerShow.next(true);
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath()); 
    if(this.shared.yWindow.value > 600){
      //console.log("showPart1: true");
      this.showPart1 = true;
    }
    if(this.shared.yWindow.value > 800){
      //console.log("showPart1_2: true");
      this.showPart1_2 = true;
    }

    this.metaService.createCanonicalURL(this.metaService.webBasicUrl);

    this.titleSeo.setTitle("پالسین ارائه دهنده خدمات منزل");
    this.meta.updateTag({
      name: 'description',
      content:"پالسین سرویس درخواست خدمات در محل است. بهترین و راحت ترین راه برای انتخاب متخصص با قیمت مناسب."
    });

    if (isPlatformBrowser(this.platformId)){
      this.timeSec = this.fixTimerValue;
      this.interval = setInterval(()=>{
        this.timeSec--;
        if(this.timeSec <= 0){
          this.timeSec = this.fixTimerValue;
          if(this.index < this.slidList.length-1){
            this.index++;
          }
          else{
            this.index = 0;
          }
        }   
      }, 1000);

      window.scrollTo(0, 0);      
      if (localStorage.getItem("servicesJobCats") != null) {
          this.basicData.rtvCategoriesFromLocalStorage();
          this.categories1 = this.basicData.categories1;
          this.categories2 = this.basicData.categories2;
          this.categories3 = this.basicData.categories3;
      }
      
      if (this.basicData.categories1 == null || this.basicData.categories1.length == 0) {
        this.rtvDataFromBackend();   
      }
      
      this.basicData.setCategories.subscribe(resSetCategories => {
        if(resSetCategories){
          this.categories1 = this.basicData.categories1;
        }
      });
    }

    this.shared.takhfifanToken = null;
    this.cookieService.set("tatoken",null,30);

    this.route.queryParams.subscribe(params=>{
      // console.log(params);
      // console.log(params.tatoken);
      this.shared.takhfifanToken = params.tatoken;
      this.cookieService.set("tatoken",this.shared.takhfifanToken,30);
      //Now Set Cookies
    });
  
  }//end ngOnInit


  rtvDataFromBackend(){
    if (this.state.hasKey(DATA_KEY)) {
      let data = this.state.get(DATA_KEY, null as any);
      this.categories1 = this.basicData.categories1;
      this.categories2 = this.basicData.categories2;
      this.categories3 = this.basicData.categories3;
    }
    else {
      this.httpService.getAllJobCat().subscribe(data => {

        this.categories1 = this.basicData.categories1;
        this.categories2 = this.basicData.categories2;
        this.categories3 = this.basicData.categories3;
        this.state.set(DATA_KEY, data as JobCategory1V[]);
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll(){
    this.showGoDownIcon = false;
    if (isPlatformBrowser(this.platformId)){
      const limitPositionPart1 = 1;
      const limitPositionPart2 = 200;
      const scrollPosition = window.pageYOffset;

      if (scrollPosition >= limitPositionPart1) {
        this.showPart1 = true;
        this.showPart1_2 = true;
        this.httpService.getUserIdea().subscribe(data => {
          this.ideasList = data;
        });
      }

      if (scrollPosition >= limitPositionPart2) {
        this.showPart2 = true;
      }
    }
  }


  onFocus(){
    this.btnSearchState = 'hide';
    this.showSearchResult = true;
    this.shared.showFab.next(false);
  }

  onBlur(){
    this.shared.showFab.next(true);
    if(this.inputValue == ''){
      this.btnSearchState = 'show';
    }
    if(this.checkMousePosition=='out'){
      this.showSearchResult = false;
    }
  }

  onChange(val:string){
    this.listSearch = [];
    this.inputValue = val;
    val = val.trim();
    if(val.length > 2){
      this.categories3.forEach(item =>{
        item.forEach(eleman => {
          if (eleman.name.indexOf(val) != -1){
            this.listSearch.push(eleman); 
          }
        });
      });
    }
  }//end onChange

  onMuseEnter(){
    this.checkMousePosition = 'enter';
  }
  
  onMuseOut(){
    this.checkMousePosition = 'out';
  }

  onkeySearch(ename:string, id:number){
    this.basicData.onRegisterRequestInMenu(ename, id);
  }//end onkeySearch

  /*:::
  onBanerIqBaz(){
    this.router.navigate([EnumLinkGame.layoutGame]);
  }
  :::*/

  

}
