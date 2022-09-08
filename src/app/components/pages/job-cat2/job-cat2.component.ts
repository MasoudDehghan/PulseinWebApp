import { SharedService } from '../../../services/shared/shared.service';
import { UrlRest } from '../../class/urlRest.class';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpService } from '../../../services/http/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { JobCategory2V } from '../../class/jobCategory2V.class';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { GetCat2Co } from '../../class/getCat2Co.class';
import { Title, Meta } from '@angular/platform-browser';
import { Message } from '../../class/mesage.class';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { MetaService } from '../../../services/metaTag/meta.service';
const DATA_KEY = makeStateKey('dataKey');

@Component({
  selector: 'app-job-cat2',
  templateUrl: './job-cat2.component.html',
  styleUrls: ['./job-cat2.component.css']
})
export class JobCat2Component implements OnInit{

  listJobcat3HavePage:string[] = [];
  categories1: JobCategory1V[] = [];
  categories2: Array<JobCategory2V[]> = [];
  categories3: Array<JobCategory3V[]> = [];
  path: string = '';
  cat2Id: number;
  findCat2Id: boolean = false;
  cat2Name: string;
  cat1Ename: string = '';
  cat2Ename: string = '';
  xWindow: number = 1000;
  showMore: boolean = false;
  leng: number = 0;
  jobCat2: GetCat2Co = null;

  constructor(private httpService: HttpService,
    private activeRoute: ActivatedRoute,
    private basicData: BasicDataService,
    private urlRest: UrlRest,
    private router: Router,
    private shared: SharedService,
    public title: Title,
    public meta: Meta,
    private metaService: MetaService,
    private state: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.path = this.urlRest.imagePath;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.xWindow = window.innerWidth;

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

  
  rtvDataFromBackend() {
    this.httpService.getAllJobCat().subscribe(data => {
      this.state.set(DATA_KEY, data as JobCategory1V[]);
      this.initJobCategories(data);
      this.init();
    }, error => {
      let msg: Message = <Message>(error.error.error);
    });
  }
  
  onMore() {
    this.showMore = true;
  }

  init() {
    this.activeRoute.params.subscribe((param: Params) => {
      this.cat1Ename = param.cat1;
      this.cat2Ename = param.cat2;

      this.categories1.forEach(eleman => {
        if (this.cat1Ename === eleman.ename) {
          eleman.jobCat2List.forEach(item => {
            if (item.ename === this.cat2Ename) {
              this.cat2Id = item.id;
              this.findCat2Id = true;
              this.cat2Name = item.name;
              this.httpService.getCat2Cat3(this.cat2Id).subscribe(data => {
                this.jobCat2 = data;
                this.leng = this.jobCat2.cat3List.length;
                this.title.setTitle("پالسین - " + this.cat2Name);
                this.meta.updateTag({
                  name: 'description',
                  content: data.googleInfo
                });
                this.metaService.createCanonicalURL(this.metaService.webBasicUrl + "/" + this.cat1Ename + "/" + this.cat2Ename);
              }, error => {});
              return;
            }
          });
          return;
        }
      });
      if (!this.findCat2Id) {
        this.router.navigate(['/notFound']);
      }
    });
  }

 
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
  

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser(this.platformId)) {
      this.xWindow = window.innerWidth;
    }
  }//end OnResize

  /*======*/
  goToPulseinApp(Jobcat3EName){
    if (isPlatformBrowser(this.platformId)){
      let cat3ID;
      this.basicData.categories3.forEach(eleman => {
        eleman.forEach(item =>{
          if(item.ename == Jobcat3EName){
            cat3ID = item.id;
          }
        });
      });
      this.basicData.doActionForJobcat3(cat3ID , '');
    } 
  }

  noWorker(){
    this.basicData.noWorker();
  }

  checkMap(jobcat3Ename){
    return this.basicData.mapx.get(jobcat3Ename);
  }
  /*=====*/

}

