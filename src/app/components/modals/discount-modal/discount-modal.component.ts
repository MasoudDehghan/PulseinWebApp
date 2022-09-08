import { CustomFunctionsService } from './../../../services/functions/custom-functions.service';
import { BasicDataService } from './../../../services/basicData/basic-data.service';
import { SharedService } from './../../../services/shared/shared.service';
import { Component, OnInit, Input, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { CDashboardDiscount } from '../../class/CDashboardDiscount.class';
import { isPlatformBrowser } from '@angular/common';
import { JobCategory3V } from '../../class/jobCategory3V.class';

@Component({
  selector: 'app-discount-modal',
  templateUrl: './discount-modal.component.html',
  styleUrls: ['./discount-modal.component.css']
})
export class DiscountModalComponent implements OnInit {

  @Output() outputJobcat = new EventEmitter();
  @Input() discountInfo: CDashboardDiscount;
  @Input() imgPath: string;
  jobcat3Selected:JobCategory3V = null;
  jobcat3FarsiName:string = "";
  imgDiscount:string = "";
  txtDiscount:string = "";
  discountCode:string = "";

  constructor(public shared: SharedService, 
    private basicData: BasicDataService, 
    private customFunction: CustomFunctionsService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.shared.noScroll.next(true);
    this.imgDiscount = this.discountInfo.image;
    this.discountCode = this.discountInfo.code;
    this.txtDiscount = this.makeTextDiscount(this.discountInfo.percent, this.discountInfo.maxCredit);
    if(this.basicData.jobcat3IdMapJobcat3Name.get(this.discountInfo.cat3Id)){
      this.jobcat3FarsiName = this.basicData.jobcat3IdMapJobcat3Name.get(this.discountInfo.cat3Id);
    }
    else{
      if(this.basicData.categories3.length > 0){
          this.basicData.MakeMapJobcat3IdAndName();
          this.basicData.MakeMapJobcat3IdAndEName();
          this.basicData.makeMap4Jobcat3();
          this.basicData.categories3.forEach(eleman => {
            eleman.forEach(item => {
              this.jobcat3FarsiName = item.name;
            })
          });
      }
      else{
        this.basicData.getjobCats();
        this.jobcat3FarsiName = this.basicData.jobcat3IdMapJobcat3Name.get(this.discountInfo.cat3Id);
      }
    }
    this.basicData.categories3.forEach(eleman => {
      eleman.forEach(item => {
        if(item.id == this.discountInfo.cat3Id){
          this.jobcat3Selected = item;
        }
      })
    });
  }//end ngOnInit

  closeModal(){
    this.shared.noScroll.next(false);
    this.shared.showDiscountModal.next(false);
  }//end closeModal()

  onStartRequest(){
    if(isPlatformBrowser(this.platformId)){
      sessionStorage.setItem('discountCode',this.discountInfo.code);
      this.outputJobcat.emit(this.jobcat3Selected);
      this.closeModal();
    }
  }//end onStartRequest

  changePercentFa(percentNumber:number):string{
    return this.customFunction.chanageNumbersToFarsi(percentNumber.toString());
  }//end changePercentFa

  changeMaxCreditFa(maxCreditNumber:number):string{
    let maxCreditFarsi:string = this.customFunction.chanageNumbersToFarsi(maxCreditNumber.toString());
    return this.customFunction.formatAmountMoney(maxCreditFarsi);
  }//end changeMaxCreditFa

  makeTextDiscount(percent:number , maxCredit:number):string{
    return this.changePercentFa(percent) + " درصد تخفیف تا سقف " + this.changeMaxCreditFa(maxCredit) + " تومان ";
  }//end makeTextDiscount

}
