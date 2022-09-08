import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { AllServices } from '../../class/allServices.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { UrlRest } from '../../class/urlRest.class';

@Component({
  selector: 'app-cat1cat2',
  templateUrl: './cat1cat2.component.html',
  styleUrls: ['./cat1cat2.component.css']
})
export class Cat1cat2Component implements OnInit {

  @Input() serviceCat1: AllServices;
  @Input() color;
  @Input() winWidth: number;

  showMore: boolean = false;
  description: string = '';
  cat1Name: string = '';
  cat1Ename: string = '';
  leng: number = 0;
  categories1: JobCategory1V[] = [];
  path: string = '';

  constructor(private urlRest: UrlRest,
    //private httpService: HttpService,
    private basicData: BasicDataService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.path = this.urlRest.imagePath;
    this.leng = this.serviceCat1.cat2CoList.length;
    this.limitText(this.serviceCat1.topInfo);

    if (isPlatformBrowser(this.platformId)) {

      this.basicData.setCategories.subscribe(res => {
        if(res){
          //console.log("cat1 cat2 *******");
          this.categories1 = this.basicData.categories1;
          this.categories1.forEach(item => {
            if (this.serviceCat1.cat1Id == item.id) {
              this.cat1Name = item.name;
              this.cat1Ename = item.ename;
              return;
            }
          });
        }
      });
    }

  }//end ngOnInit

  onMore() {
    this.showMore = true;
  }

  limitText(inputText) {
    if (isPlatformBrowser(this.platformId)) {
      //console.log(inputText);
      if (this.winWidth < 720) {
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
