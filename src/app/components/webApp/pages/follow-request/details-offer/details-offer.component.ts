import { UrlRest } from '../../../../class/urlRest.class';
import { BasicDataService } from '../../../../../services/basicData/basic-data.service';
import { CustomFunctionsService } from '../../../../../services/functions/custom-functions.service';
import { OfferV } from '../../../class/backend/offerV.class';
import { SharedService } from '../../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumUrls } from '../../../enum/enumUrls.enum';
import { InvoiceV } from '../../../class/backend/invoiceV.class';
import { CatalogV } from '../../../class/backend/catalogV.class';
import { WorkerScoreV } from '../../../class/backend/workerScoreV.class';

@Component({
  selector: 'app-details-offer',
  templateUrl: './details-offer.component.html',
  styleUrls: ['./details-offer.component.css']
})
export class DetailsOfferComponent implements OnInit {

  isLoading:boolean = true;
  offer:OfferV = null;
  imgPath:string = "";
  workerImg:string = "";
  workerName:string = "";
  workerTotalScore:number = 0;
  workTitle:string = "";
  price:string = "توافقی";
  surveyRequiredText:string = "نیاز به بازدید: ";
  surveyRequired:boolean = false;
  workerDescription:string = "-";
  workerInvoice:InvoiceV = null;
  workerCode:string = "";
  workerCatalog:CatalogV[] = [];
  workerScore:WorkerScoreV = null;
  priceScore:number = 0;
  satisfactionScore:number = 0;
  timeScore:number = 0;
  srcPhotoPopUp:string = '';

  constructor(private router: Router,
    public basicData: BasicDataService,
    public customFunction: CustomFunctionsService,
    public shared: SharedService,
    private urlRest: UrlRest,) { }

  ngOnInit() {
    this.imgPath = this.urlRest.imagePath;
    if(this.shared.selectedOffer.value){
      this.offer = this.shared.selectedOffer.value;
      console.log(this.offer);
      this.setValues(this.offer);
    }
    else{
      this.router.navigate([EnumUrls.address_home]);
    }
  }//end ngOnInit


  setValues(offerInfo:OfferV){
    if(offerInfo.suggestion){
      if(offerInfo.suggestion.surveyRequired){
        this.surveyRequired = offerInfo.suggestion.surveyRequired;
      }
    }
    this.workerImg = this.imgPath + offerInfo.worker.user.personalData.photo;
    this.workerName = offerInfo.worker.user.personalData.firstName + " " + offerInfo.worker.user.personalData.lastName;
    this.workerTotalScore = offerInfo.worker.score.totalScore;
    this.workTitle = offerInfo.worker.workStation.info.title;
    this.workerInvoice = offerInfo.suggestion.invoice;
    this.workerCode = offerInfo.worker.code;
    this.workerScore = offerInfo.worker.score;
    this.priceScore = offerInfo.worker.score.priceScore;
    this.satisfactionScore = offerInfo.worker.score.satisfactionScore;
    this.timeScore = offerInfo.worker.score.timeScore;
    if(offerInfo.worker.workStation.catalogs){
      this.workerCatalog = offerInfo.worker.workStation.catalogs;
    }

    if(this.workerInvoice){
      if(this.workerInvoice.totalPrice){
        let price_fa = this.customFunction.chanageNumbersToFarsi(this.workerInvoice.totalPrice.toString());
        this.price = this.customFunction.formatAmountMoney(price_fa) + " تومان";
      }
    }
    if(offerInfo.suggestion){
      if(offerInfo.suggestion.info){
        this.workerDescription = offerInfo.suggestion.info;
      }
    }
    this.isLoading = false;
  }//end setValues

  onAcceptOffer(){
    this.shared.selectedOffer.next(this.offer);
    this.shared.showModalQuestionAcceptOffer.next(true);
    this.shared.noScroll.next(true);
    this.shared.selectedWorkerName.next(this.workerName);
  }//end onAcceptOffer

  closeOffer(){
    this.shared.selectedOffer.next(this.offer);
    this.shared.showModalQuestionRefuseOffer.next(true);
    this.shared.noScroll.next(true);
    this.shared.selectedWorkerName.next(this.workerName);
  }//end closeOffer

  goToListOffer(){
    this.shared.selectedOffer.next(null);
    this.shared.selectedWorkerName.next(null);
    this.router.navigate(["/followRequest/waitToOffer"]);
  }

  onPhoto(val:string){
    this.srcPhotoPopUp = this.imgPath + val;
    this.basicData.activeModalPhoto.next(true);
  }//end onPhoto

}
