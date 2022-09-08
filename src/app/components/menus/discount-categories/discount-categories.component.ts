import { CustomFunctionsService } from './../../../services/functions/custom-functions.service';
import { SharedService } from './../../../services/shared/shared.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { isPlatformBrowser } from '@angular/common';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { CDashboardDiscount } from '../../class/CDashboardDiscount.class';
import { EnumTitle } from '../../enum/title.enum';

@Component({
  selector: 'discount-categories',
  templateUrl: './discount-categories.component.html',
  styleUrls: ['./discount-categories.component.css']
})
export class DiscountCategoriesComponent implements OnInit {

  customOptions: any = {
    rtl:true,
    loop: true,
    autoplay:true,
    autoplayTimeout:7000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      430: {
        items: 2
      },
      600: {
        items: 3
      },
      900: {
        items: 4
      }
    },
    nav: false
  }

  discountCategoryList: CDashboardDiscount [] = [];
  mainTitle: string = "";
  imagePath: string = "";

  constructor(private basicData: BasicDataService,
    public sharedService: SharedService,
    private customFunction: CustomFunctionsService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.imagePath = this.sharedService.imgPath;
    this.sharedService.discountList.subscribe(res => {
      if(res.length > 0){
        this.mainTitle = EnumTitle.discounts;
        this.discountCategoryList = res;
      }
    });
  }//end ngOnInit


  /*======*/
  goToPulseinApp(Jobcat3EName: string){
    if (isPlatformBrowser(this.platformId)){
      let cat3Selected: JobCategory3V;
      this.basicData.categories3.forEach(eleman => {
        eleman.forEach(item =>{
          if(item.ename == Jobcat3EName){
            cat3Selected = item;
          }
        });
      });
      this.basicData.doActionForJobcat3(cat3Selected , '');
    }
  }
  /*=====*/


  changePercentFa(percentNumber:number):string{
    return this.customFunction.chanageNumbersToFarsi(percentNumber.toString());
  }

  changeMaxCreditFa(maxCreditNumber:number):string{
    let maxCreditFarsi:string = this.customFunction.chanageNumbersToFarsi(maxCreditNumber.toString());
    return this.customFunction.formatAmountMoney(maxCreditFarsi);
  }

}
