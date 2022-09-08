import { SharedService } from './../../../services/shared/shared.service';
import { HttpService } from '../../../services/http/http.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { isPlatformBrowser } from '@angular/common';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { EnumTitle } from '../../enum/title.enum';
import { CDashboardCat3Info } from '../../webApp/class/backend/cDashboardCat3Info.class';

@Component({
  selector: 'useful-category',
  templateUrl: './useful-category.component.html',
  styleUrls: ['./useful-category.component.css']
})
export class UsefulCategoryComponent implements OnInit {

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

  usefulCategory: CDashboardCat3Info[] = [];
  mainTitle: string = "";
  imagePath: string = "";

  constructor(private basicData: BasicDataService,
    public sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.imagePath = this.sharedService.imgPath;
    this.sharedService.usefulJobcatList.subscribe(res => {
      if(res.length > 0){
        this.mainTitle = EnumTitle.usefulJobcats3;
        this.usefulCategory = res;
      }
    });
  }//end ngOnInit


  /*======*/
  goToPulseinApp(Jobcat3EName:string){
    if (isPlatformBrowser(this.platformId)){
      let selectedJobcat3: JobCategory3V;
      this.basicData.categories3.forEach(eleman => {
        eleman.forEach(item =>{
          if(item.ename == Jobcat3EName){
            selectedJobcat3 = item;
          }
        });
      });
      this.basicData.doActionForJobcat3(selectedJobcat3 , '');
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
