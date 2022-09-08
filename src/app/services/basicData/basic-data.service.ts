import { EnumConstData } from './../../components/enum/constData.enum';
import { EnumTitle } from './../../components/enum/title.enum';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpService } from '../http/http.service';
import { JobCategory1V } from '../../components/class/jobCategory1V.class';
import { JobCategory2V } from '../../components/class/jobCategory2V.class';
import { JobCategory3V } from '../../components/class/jobCategory3V.class';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from '../../components/class/toastMessage.class';
import { isPlatformBrowser } from '@angular/common';
import { webappHttpService } from '../../components/webApp/services/http/webapp-http.service';
import { ProvinceV } from '../../components/webApp/class/backend/provinceV.class';
import { Subject } from 'rxjs';
import { AreaV } from '../../components/webApp/class/backend/areaV.class';
import { SharedService } from '../shared/shared.service';
import { EnumUrls } from '../../components/webApp/enum/enumUrls.enum';

@Injectable({
  providedIn: 'root'
})
export class BasicDataService {

  endTimer = new BehaviorSubject(false);
  categories1: JobCategory1V[] = [];
  categories2: Array<JobCategory2V[]> = [];
  categories3: Array<JobCategory3V[]> = [];
  year: number = new Date().getFullYear();
  month: number = new Date().getMonth() + 1;
  day: number = new Date().getDate();
  hour: number = new Date().getHours();
  setCategories = new BehaviorSubject(false);
  activeModalAddCredit = new BehaviorSubject(false);
  activeModalPhoto = new BehaviorSubject(false);
  activeModalInvite = new BehaviorSubject(false);
  triggerRefreshRequest:Subject<number> = new Subject<number>();
  triggerRefreshDashboard:Subject<boolean> = new Subject<boolean>();
  triggerRefreshDashboardMain:Subject<boolean> = new Subject<boolean>();

  constructor(private httpService: HttpService, 
    private shared: SharedService,
    private webappHttp: webappHttpService,
    private storage: StorageService,
    private router: Router,
    private toastr: ToastrService,
    private toastMsg: ToastMessage,
    @Inject(PLATFORM_ID) private platformId: Object) { }


  initLocalStorage() {
    this.clearCategoriesVar();
    localStorage.setItem("servicesJobCats", JSON.stringify(this.categories1));
    localStorage.setItem("servicesJobCats2", JSON.stringify(this.categories2));
    localStorage.setItem("servicesJobCats3", JSON.stringify(this.categories3));
    localStorage.setItem("setYearCategories", this.year.toString());
    localStorage.setItem("setMonthCategories", this.month.toString());
    localStorage.setItem("setDayCategories", this.day.toString());
    localStorage.setItem("setHourCategories", this.hour.toString());
  }


  //DATA_KEY
  rtvCategoriesFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)){
      this.categories1 = JSON.parse(localStorage.getItem("servicesJobCats"));
      this.categories2 = JSON.parse(localStorage.getItem("servicesJobCats2"));
      this.categories3 = JSON.parse(localStorage.getItem("servicesJobCats3"));
    }
  }

  getjobCats() {
    //console.log("گرفتن جاب کت ها اتفاق افتاد- مرحله 1");
    this.clearCategoriesVar();
    if (localStorage.getItem("servicesJobCats") === null || 
      localStorage.getItem("servicesJobCats2") === null || 
      localStorage.getItem("servicesJobCats3") === null) {
      this.httpService.getAllJobCat().subscribe(data => {
        //console.log("گرفتن جاب کت ها اتفاق افتاد- مرحله 2");
        //console.log(data);
        this.categories1 = data;
        this.categories1.forEach(element => {
          this.categories2.push(element.jobCat2List);
          let jc2List = element.jobCat2List;
          jc2List.forEach(el => {
            this.categories3.push(el.jobCat3List);
          });
        });

        localStorage.setItem("servicesJobCats", JSON.stringify(this.categories1));
        localStorage.setItem("servicesJobCats2", JSON.stringify(this.categories2));
        localStorage.setItem("servicesJobCats3", JSON.stringify(this.categories3));
        localStorage.setItem("setYearCategories", this.year.toString());
        localStorage.setItem("setMonthCategories", this.month.toString());
        localStorage.setItem("setDayCategories", this.day.toString());
        localStorage.setItem("setHourCategories", this.hour.toString());

        this.makeMap4Jobcat3();
        this.MakeMapJobcat3IdAndName();
        this.MakeMapJobcat3IdAndEName();
        this.setCategories.next(true);
      }, error => {
        //console.log(error);
        //let msg: Message = <Message>(error.error.error);
      });
    }
    else{
      this.categories1 = JSON.parse(localStorage.getItem("servicesJobCats"));
      this.categories2 = JSON.parse(localStorage.getItem("servicesJobCats2"));
      this.categories3 = JSON.parse(localStorage.getItem("servicesJobCats3"));
      this.makeMap4Jobcat3();
      this.MakeMapJobcat3IdAndName();
      this.MakeMapJobcat3IdAndEName();
      this.setCategories.next(true);
    }

  }//end of getjobCats


  clearCategoriesVar(){
    this.categories1 = [];
    this.categories2 = [];
    this.categories3 = [];
  }

  onRegisterRequestInMenu(Jobcat3E_Name:string, cat3ID:number){
    let selectedJobcat3:JobCategory3V = null;
    if (isPlatformBrowser(this.platformId)){
      this.categories3.forEach(eleman => {
        eleman.forEach(item => {
          if(item.id == cat3ID){
            selectedJobcat3 = item;
          }
        });
      });

      if(!selectedJobcat3.haveWorker){
        this.noWorker();
      }
      else{
        if(selectedJobcat3.haveNewSeo || selectedJobcat3.haveSeo){
          this.router.navigate(["categories3", Jobcat3E_Name]);
        }
        else{
          this.doActionForJobcat3(selectedJobcat3 , '');
        }
      }
    }
  }

  mapx:Map<string,string> = new Map<string,string>();
  makeMap4Jobcat3(){
    this.categories3.forEach(eleman => {
      eleman.forEach(item =>{
        let hasworker:boolean = item.haveWorker;
        let hasPage:boolean = item.haveSeo;
        if(hasPage){
          this.mapx.set(item.ename,'2');//jobcat3 has page
          //console.log("cat3 has Page: "+item.ename);
        }
        else{
          if(hasworker){
            this.mapx.set(item.ename,'1');//jobcat3 has worker without page
            //console.log("no Page but has worker: "+item.ename);
          }
          else{
            this.mapx.set(item.ename,'0');//jobcat3 no worker and no page
            //console.log("no Page no worker: "+item.ename);
          }
        }
      });
    });
  }


  jobcat3IdMapJobcat3Name:Map<number,string> = new Map<number,string>();
  MakeMapJobcat3IdAndName(){
    this.categories3.forEach(eleman => {
      eleman.forEach(item => {
        this.jobcat3IdMapJobcat3Name.set(item.id,item.name);
      })
    });
  }
  jobcat3IdMapJobcat3EName:Map<number,string> = new Map<number,string>();
  MakeMapJobcat3IdAndEName(){
    this.categories3.forEach(eleman => {
      eleman.forEach(item => {
        this.jobcat3IdMapJobcat3EName.set(item.id,item.ename);
      })
    });
  }  


  doActionForJobcat3(selectedJobcat3:JobCategory3V, path:string){
    if (isPlatformBrowser(this.platformId)){
      //sessionStorage.setItem("jobcat3ID",jobcat3Id.toString()); 
      if(this.storage.userDataLogin.inProgressRequests){
        //sessionStorage.removeItem('jobcat3ID');
        if(this.storage.userDataLogin.inProgressRequests.length > 0){
          this.toastr.clear();
          this.toastr.warning(this.toastMsg.msgNotAllowForNewRequest, this.toastMsg.title4NotAllowForNewRequest);
          if(path != ''){
            this.router.navigate([path]);
          }
        }
        else{
          if(this.shared.onResultModalSearch.value){
            this.router.navigate([EnumUrls.requestRegister_loading]);
          }
          else{
            this.preRegisterOfRequest(selectedJobcat3);
          }
        }
      }
      else{
        if(this.shared.onResultModalSearch.value){
          this.router.navigate([EnumUrls.requestRegister_loading]);
        }
        else{
          this.preRegisterOfRequest(selectedJobcat3);
        }
      }
    }
  }//end hasActiveRequest

  preRegisterOfRequest(jobcat3:JobCategory3V){
    //console.log("it is preeee registerrrr");
    this.shared.clearVareablesForRequestRegister();
    this.webappHttp.getGuestPreRegisterRequest(jobcat3.id).subscribe(res => {
      if(!res.haveActiveWorker){
        this.toastr.clear();
        this.toastr.warning(this.toastMsg.msg4NoWorker, this.toastMsg.title4NoWorker);
        if(this.shared.onResultModalSearch.value){
          this.shared.onResultModalSearch.next(false);
          this.router.navigate([EnumUrls.address_home]);
        }
      }
      else{
        if(this.shared.onResultModalSearch.value){
          this.shared.onResultModalSearch.next(false);
        }
        this.shared.reqRej_preRegister = res;
        if(this.shared.reqRej_preRegister.descriptions && !jobcat3.haveSeo){
          this.shared.showDescription = true;
        }
        this.shared.reqRej_jobcat3Select = jobcat3;
        if(res.haveQuestion){
          //go to questions module
          //console.log("go to requestRegister_questions");
          this.router.navigate([EnumUrls.requestRegister_questions]);
        }
        else if(!res.haveQuestion){
          //no question and go to descriptions request
          //module description
          //console.log("go to extra Description");
          this.router.navigate([EnumUrls.requestRegister_extraDescription]);
        }
      }
    }, error => {
      //console.log("Error: preregister error in basic data...");
      //console.log(error);
    });
  }//end preRegisterOfRequest

  noWorker(){
    if (isPlatformBrowser(this.platformId)){
      this.toastr.clear();
      this.toastr.warning(this.toastMsg.msg4NoWorker, this.toastMsg.title4NoWorker);
    }
  }

  clearLocalStorage(){
    localStorage.removeItem("servicesJobCats");
    localStorage.removeItem("servicesJobCats2");
    localStorage.removeItem("servicesJobCats3");
    localStorage.removeItem("setDayCategories");
    localStorage.removeItem("setHourCategories");
    localStorage.removeItem("setMonthCategories");
    localStorage.removeItem("setYearCategories");
  }


  initData(){
    let userToken = localStorage.getItem("userToken");
    let localDbVersion:number = Number(EnumConstData.dbVersionDefault);
    if(localStorage.getItem('dbVersion')){
      localDbVersion = Number(localStorage.getItem('dbVersion'));
    }
    if(userToken){
      this.storage.token.next(userToken);
      this.webappHttp.getUserInfoWithToken(userToken).subscribe(res => {
        this.storage.userDataLogin = res;
        this.storage.subject_userDataLogin.next(res);
        if(res.contents){
          if(res.contents.length > 0){
            res.contents.forEach(eleman => {
              //type == 3 :=> discount code list
              if(eleman.type == 3){
                this.shared.discountList.next(eleman.discountList);
              }
              //type == 2 :=> jobcats list
              else if(eleman.type == 2){
                //لیست محبوب ها
                if(eleman.title == EnumTitle.favoriteJobcats3){
                  this.shared.favoriteJobcatList.next(eleman.cat3List);
                }
                //لیست پرکاربردها
                else if(eleman.title == EnumTitle.usefulJobcats3){
                  this.shared.usefulJobcatList.next(eleman.cat3List);
                }
              }
              //type == 1 :=> baner header home
              else if(eleman.type == 1){
                this.shared.bannerList.next(eleman.bannerList);
              }
            });
          }
        }
        if(!this.storage.isLogin.value){
          this.storage.isLogin.next(true);
        }
        if( (res.dbVersion != localDbVersion) && (localDbVersion != Number(EnumConstData.dbVersionDefault)) ){
          this.clearLocalStorage();
          localStorage.setItem('dbVersion', res.dbVersion.toString());
          this.getjobCats();
          document.location.reload();
        }
        else if(localDbVersion == Number(EnumConstData.dbVersionDefault)){
          localStorage.setItem('dbVersion', res.dbVersion.toString());
          this.getjobCats();
        }
        else if(res.dbVersion == localDbVersion){
          if(localStorage.getItem("servicesJobCats") === null || 
            localStorage.getItem("servicesJobCats2") === null || 
            localStorage.getItem("servicesJobCats3") === null){
              this.getjobCats();
            }
          else{
            this.categories1 = JSON.parse(localStorage.getItem("servicesJobCats"));
            this.categories2 = JSON.parse(localStorage.getItem("servicesJobCats2"));
            this.categories3 = JSON.parse(localStorage.getItem("servicesJobCats3"));
            this.makeMap4Jobcat3();
            this.MakeMapJobcat3IdAndName();
            this.MakeMapJobcat3IdAndEName();
            this.setCategories.next(true);
          }
        }
      });
    }
    else{
      if(this.storage.isLogin.value){
        this.storage.isLogin.next(false);
      }
      this.webappHttp.getGuestInfo().subscribe(res => {
        this.storage.userDataLogin = res;
        if(res.contents){
          if(res.contents.length > 0){
            res.contents.forEach(eleman => {
              //type == 3 :=> discount code list
              if(eleman.type == 3){
                this.shared.discountList.next(eleman.discountList);
              }
              //type == 2 :=> jobcats list
              else if(eleman.type == 2){
                //لیست محبوب ها
                if(eleman.title == EnumTitle.favoriteJobcats3){
                  this.shared.favoriteJobcatList.next(eleman.cat3List);
                }
                //لیست پرکاربردها
                else if(eleman.title == EnumTitle.usefulJobcats3){
                  this.shared.usefulJobcatList.next(eleman.cat3List);
                }
              }
              //type == 1 :=> baner header home
              else if(eleman.type == 1){
                this.shared.bannerList.next(eleman.bannerList);
              }
            });
          }
        }
        if( (res.dbVersion != localDbVersion) && (localDbVersion != Number(EnumConstData.dbVersionDefault)) ){
          this.clearLocalStorage();
          localStorage.setItem('dbVersion', res.dbVersion.toString());
          this.getjobCats();
          document.location.reload();
        }
        else if(localDbVersion == Number(EnumConstData.dbVersionDefault)){
          localStorage.setItem('dbVersion', res.dbVersion.toString());
          this.getjobCats();
        }
        else if(res.dbVersion == localDbVersion){
          if(localStorage.getItem("servicesJobCats") === null || 
            localStorage.getItem("servicesJobCats2") === null || 
            localStorage.getItem("servicesJobCats3") === null){
              this.getjobCats();
          }
          else{
            this.categories1 = JSON.parse(localStorage.getItem("servicesJobCats"));
            this.categories2 = JSON.parse(localStorage.getItem("servicesJobCats2"));
            this.categories3 = JSON.parse(localStorage.getItem("servicesJobCats3"));
            this.makeMap4Jobcat3();
            this.MakeMapJobcat3IdAndName();
            this.MakeMapJobcat3IdAndEName();
            this.setCategories.next(true);
          }
        }
      });
    }
  }//end initData

  getCityArea(inputCity:ProvinceV):AreaV[]{
    let area:AreaV[] = [];
    inputCity.townships.forEach(elemanTown => {
      elemanTown.cities.forEach(elemanCity => {
        elemanCity.regions.forEach(elemanRegion => {
          elemanRegion.areas.forEach(elemanArea => {
            area.push(elemanArea)
          })
        })
      })
    });
    return area;
  }//end getCityArea


  getUserLocations(token:string){
    this.webappHttp.getCandidateLocations(token).subscribe(res => {
      this.storage.candidateLocationList = res;
    }, error => {
      //console.log('خطای گرفتن مکان های منتخب');
      //console.log(error);
    });
  }

}//end of class
