import { SharedService } from './../../../services/shared/shared.service';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { CDashboardCat3Info } from '../../webApp/class/backend/cDashboardCat3Info.class';
import { EnumTitle } from '../../enum/title.enum';


@Component({
  selector: 'app-jobfavor',
  templateUrl: './jobfavor.component.html',
  styleUrls: ['./jobfavor.component.css']
})

export class JobfavorComponent implements OnInit {

  customOptions: any = {
    rtl:true,
    loop: true,
    autoplay:true,
    autoplayTimeout:5000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      450: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  jobListCat: CDashboardCat3Info[] = [];
  mainTitle: string = '';
  imagePath: string = "";
 
  constructor(private basicData: BasicDataService,
    public sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.imagePath = this.sharedService.imgPath;
    this.sharedService.favoriteJobcatList.subscribe(res => {
      if(res.length > 0){
        this.mainTitle = EnumTitle.favoriteJobcats3;
        this.jobListCat = res;
      }
    });
  }
  
/*======*/
  goToPulseinApp(Jobcat3EName:string){
    if (isPlatformBrowser(this.platformId)){
      let jobcat3:JobCategory3V
      this.basicData.categories3.forEach(eleman => {
        eleman.forEach(item =>{
          if(item.ename == Jobcat3EName){
            jobcat3 = item;
          }
        });
      });
      this.basicData.doActionForJobcat3(jobcat3 , '');
    }
  }

  noWorker(){
    this.basicData.noWorker();
  }

  checkMap(jobcat3Ename:string){
    return this.basicData.mapx.get(jobcat3Ename);
  }
  /*=====*/
}
