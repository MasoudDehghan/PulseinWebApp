import { SharedService } from '../../../services/shared/shared.service';
import { UrlRest } from '../../class/urlRest.class';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpService } from '../../../services/http/http.service';
import { AllServices } from '../../class/allServices.class';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { JobCategory2V } from '../../class/jobCategory2V.class';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { Title, Meta } from '@angular/platform-browser';
//import { Message } from '../../class/mesage.class';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.css']
})
export class AllServicesComponent implements OnInit {

  public service0: AllServices;
  public service1: AllServices;
  public service2: AllServices;
  public service3: AllServices;
  public service4: AllServices;
  public service5: AllServices;
  public service6: AllServices;
  public service7: AllServices;

  categories1: JobCategory1V[] = [];
  categories2: Array<JobCategory2V[]> = [];
  categories3: Array<JobCategory3V[]> = [];
  xWindow: number = 1000;
  yWindow: number = 800;
  mainTitle: string = 'سرویس‌ها و خدمات پالسین';
  cat1Name: string = '';
  cat1Ename: string = '';
  showMore: boolean = false;
  description: string = '';
  backColor1: string = '#FFFFFF';
  backColor2: string = '#EEEEEE';
  path:string = '';
  service0length: number = 0;
  service1length: number = 0;
  service2length: number = 0;
  service3length: number = 0;
  service4length: number = 0;
  service5length: number = 0;
  service6length: number = 0;
  service7length: number = 0;

  constructor(private httpService: HttpService,
    private urlRest: UrlRest,
    private basicData: BasicDataService,
    public title: Title,
    public shared: SharedService,
    public meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.path = this.urlRest.imagePath;

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.xWindow = window.innerWidth;
      this.yWindow = window.innerHeight;

      this.basicData.setCategories.subscribe(res => {
        if(res){
          //console.log("all services *******");
          this.categories1 = this.basicData.categories1;
          this.categories2 = this.basicData.categories2;
          this.categories3 = this.basicData.categories3;
          this.getAllServices();
        }
      });
    }

    this.title.setTitle(this.mainTitle);
    this.meta.updateTag({
      name: 'description',
      content: "پالسین ارائه دهنده خدمات و سرویس‌های مورد نیاز زندگی روزانه"
    });

  }//end onInit

  getAllServices() {
    this.httpService.getAllServices().subscribe((data) => {
      this.service0 = data[0];
      this.service1 = data[1];
      this.service2 = data[2];
      this.service3 = data[3];
      this.service4 = data[4];
      this.service5 = data[5];
      this.service6 = data[6];
      this.service7 = data[7];
      this.service0length = this.service0.cat2CoList.length;
      this.service1length = this.service1.cat2CoList.length;
      this.service2length = this.service2.cat2CoList.length;
      this.service3length = this.service3.cat2CoList.length;
      this.service4length = this.service4.cat2CoList.length;
      this.service5length = this.service5.cat2CoList.length;
      this.service6length = this.service6.cat2CoList.length;
      this.service7length = this.service7.cat2CoList.length;
      this.init();
      this.limitText(this.service0.topInfo);
    }, error => {
      //console.log(error);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser(this.platformId))
      this.xWindow = window.innerWidth;
  }

  isShowJobCat2:boolean = false;
  isShowJobCat3:boolean = false;
  isShowJobCat4:boolean = false;
  isShowJobCat5:boolean = false;
  isShowJobCat6:boolean = false;
  isShowJobCat7:boolean = false;
  isShowJobCat8:boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const limitPositionJobcat2 = 100;
      const limitPositionJobcat3 = 200;
      const limitPositionJobcat4 = 300;
      const limitPositionJobcat5 = 400;
      const limitPositionJobcat6 = 500;
      const limitPositionJobcat7 = 600;
      const limitPositionJobcat8 = 700;
      const scrollPosition = window.pageYOffset;

      if (scrollPosition >= limitPositionJobcat2) {
        this.isShowJobCat2 = true;
      }

      if (scrollPosition >= limitPositionJobcat3) {
        this.isShowJobCat3 = true;
      }

      if (scrollPosition >= limitPositionJobcat4) {
        this.isShowJobCat4 = true;
      }

      if (scrollPosition >= limitPositionJobcat5) {
        this.isShowJobCat5 = true;
      }

      if (scrollPosition >= limitPositionJobcat6) {
        this.isShowJobCat6 = true;
      }


      if (scrollPosition >= limitPositionJobcat7) {
        this.isShowJobCat7 = true;
      }

      if (scrollPosition >= limitPositionJobcat8) {
        this.isShowJobCat8 = true;
      }
    }
  }

  init() {
    this.categories1.forEach(item => {
      if (this.service0.cat1Id == item.id) {
        this.cat1Name = item.name;
        this.cat1Ename = item.ename;
        return;
      }
    });
  }

  onMore() {
    this.showMore = true;
  }

  limitText(inputText) {
    if (isPlatformBrowser(this.platformId)) {
      if (this.xWindow < 720) {
        let Len = inputText.length;
        if (Len > 130) {
          this.description = inputText.substring(0, 120) + '...';
        }
        else {
          this.description = inputText;
        }
      }
      else {
        this.description = inputText;
      }
    } 
  }//end linitText

}

