import { UrlRest } from '../../class/urlRest.class';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../../services/http/http.service';
import { JobCategory2V } from '../../class/jobCategory2V.class';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { GetCat1Co } from '../../class/getCat1Co.class';
import { Meta, Title } from '@angular/platform-browser';
import { Message } from '../../class/mesage.class';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { SharedService } from '../../../services/shared/shared.service';
import { MetaService } from '../../../services/metaTag/meta.service';
const DATA_KEY = makeStateKey('dataKey');

@Component({
  selector: 'app-job-cat1',
  templateUrl: './job-cat1.component.html',
  styleUrls: ['./job-cat1.component.css']
})
export class JobCat1Component implements OnInit {

  cat1Id: number = 0;
  findCat1Id: boolean = false;
  enameCat1: string = '';
  isPC: boolean = true;
  topInfo: string = "تعمیرات و ارتقا دستگاه‌های کامپیوتری";
  mainTxtTitr: string = "پالسین چگونه کار می کند؟";
  txt1Titr: string = "انتخاب سرویس";
  txt2Titr: string = "زمان بندی";
  txt3Titr: string = "اجرای درخواست";
  categories1: JobCategory1V[] = [];
  categories2: Array<JobCategory2V[]> = [];
  categories3: Array<JobCategory3V[]> = [];
  xWindow: number = 1000;
  path: string = '';
  cat1Name: string = '';

  constructor(private rout: ActivatedRoute,
    public cat1cat2: GetCat1Co,
    private httpService: HttpService,
    private basicData: BasicDataService,
    private urlRest: UrlRest,
    private router: Router,
    public title: Title,
    public meta: Meta,
    private metaService: MetaService,
    private state: TransferState,
    public shared: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath());
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.modeInit();
      this.xWindow = window.innerWidth;
      this.path = this.urlRest.imagePath;

      if (localStorage.getItem("servicesJobCats") != null) {
          this.basicData.rtvCategoriesFromLocalStorage();
          this.categories1 = this.basicData.categories1;
          this.categories2 = this.basicData.categories2;
          this.categories3 = this.basicData.categories3;
          this.init();
      } 
    }

    if (this.categories1 == null || this.categories1.length == 0) {
      this.rtvDataFromBackend();
    }
    

  }//end ngOnInit

  
  initJobCategories(data: JobCategory1V[]) {
    this.categories1 = data;
    this.categories1.forEach(element => {
      this.categories2.push(element.jobCat2List);
      let jc2List = element.jobCat2List;
      jc2List.forEach(el => {
        this.categories3.push(el.jobCat3List);
      });
    });
  }

  rtvDataFromBackend() {
    this.httpService.getAllJobCat().subscribe(data => {
      this.state.set(DATA_KEY, data as JobCategory1V[]);
      this.initJobCategories(data);
      this.init();
    }, error => {
      let msg: Message = <Message>(error.error.error);
    });
  }

  init() {
    this.rout.params.subscribe((param: Params) => {
      this.enameCat1 = param.id;
      const JC_KEY = makeStateKey('jc1Key_' + this.enameCat1);
      this.categories1.forEach(eleman => {
        if (this.enameCat1 === eleman.ename) {
          this.cat1Id = eleman.id;

          this.cat1Name = eleman.name;
          this.findCat1Id = true;
          this.httpService.getCat1Cat2(this.cat1Id).subscribe(data => {
            this.cat1cat2 = data;
            this.title.setTitle("پالسین - " + this.cat1Name);
            this.meta.updateTag({
              name: 'description',
              content: data.googleInfo
            });
            this.metaService.createCanonicalURL(this.metaService.webBasicUrl + "/" + this.enameCat1);
          }, error => {
            //console.log(error);
          });
          return;
        }
      });
      if (!this.findCat1Id) {
        this.router.navigate(['/notFound']);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser(this.platformId)) {
      this.xWindow = window.innerWidth;
      if (this.xWindow <= 720) {
        this.isPC = false;
      }
      else {
        this.isPC = true;
      }
    }
  }

  modeInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.xWindow = window.innerWidth;
      if (this.xWindow <= 720) {
        this.isPC = false;
      }
      else {
        this.isPC = true;
      }
    }
  }

}

