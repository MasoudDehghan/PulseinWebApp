import { BasicDataService } from '../../../../../services/basicData/basic-data.service';
import { InvoiceV } from '../../../class/backend/invoiceV.class';
import { CustomFunctionsService } from './../../../../../services/functions/custom-functions.service';
import { UrlRest } from '../../../../class/urlRest.class';
import { PulseV } from '../../../class/backend/pulseV.class';
import { Router } from '@angular/router';
import { webappHttpService } from '../../../services/http/webapp-http.service';
import { SharedService } from '../../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { EnumUrls } from '../../../enum/enumUrls.enum';
import { OfferV } from '../../../class/backend/offerV.class';
import { CatalogV } from '../../../class/backend/catalogV.class';
import { WorkerScoreV } from '../../../class/backend/workerScoreV.class';
import { WsContact } from '../../../class/backend/wsContact.class';

@Component({
  selector: 'app-wait-do-ack',
  templateUrl: './wait-do-ack.component.html',
  styleUrls: ['./wait-do-ack.component.css']
})
export class WaitDoAckComponent implements OnInit {

  token:string = "";
  activeRequest:PulseV = null;
  requestID:number = 0;
  imgPath:string = "";
  workerImg:string = "";
  workerName:string = "";
  workerTotalScore:number = 0;
  workTitle:string = "";
  price:string = "توافقی";
  surveyRequiredText:string = "نیاز به بازدید: ";
  surveyRequired:boolean = false;
  workerDescription:string = "-";
  workerMobile:string = "";
  mobileHref:string = "tel:";
  workerInvoice:InvoiceV = null;
  workerCode:string = "";
  workerCatalog:CatalogV[] = [];
  workerScore:WorkerScoreV = null;
  priceScore:number = 0;
  satisfactionScore:number = 0;
  timeScore:number = 0;
  workerContact:WsContact = null;
  workerEmail:string = '';
  workerInstagram:string = '';
  workerTelegram:string = '';
  workerWebsite:string = '';
  workerAddress:string = '';
  workerLat:number = 0;
  workerlng:number = 0;
  srcPhotoPopUp:string = '';

  constructor(private shared: SharedService,
    private webappHttp: webappHttpService,
    private router: Router,
    private urlRest: UrlRest,
    public basicData: BasicDataService,
    public customFunction: CustomFunctionsService) { }

  ngOnInit() {
    this.imgPath = this.urlRest.imagePath;
    this.token = localStorage.getItem("userToken");
    if(!this.token){
      this.router.navigate([EnumUrls.address_home]);
    }
    else if(this.token == ''){
      this.router.navigate([EnumUrls.address_home]);
    }
    else if(this.shared.requestID == 0 || !this.shared.requestInfo){
      this.shared.requestInfo = null;
      this.shared.requestID = 0;
      this.webappHttp.getOnProgressRequests(this.token).subscribe(res => {
        if(res.length > 0){
          this.activeRequest = res[0];
          this.requestID = this.activeRequest.request.id;
          console.log("in do ack page mode 1");
          console.log(this.activeRequest);
          this.shared.stateNameRequest.next(this.activeRequest.state.name);
          this.shared.stateIdRequest.next(this.activeRequest.state.id);
          this.setValues(this.activeRequest);
        }
        else{
          //---request list is empty
          console.log("in page wait-do-ack");
          console.log("لیست درخواست کاربر خالی است: برود به صفحه اصلی");
          this.router.navigate([EnumUrls.address_home]);
        }
      });
    }
    else{
      this.activeRequest = this.shared.requestInfo;
      this.requestID = this.shared.requestID;
      this.shared.requestID = 0;
      this.shared.requestInfo = null;
      console.log("in do ack page mode 2");
      console.log(this.activeRequest);
      this.setValues(this.activeRequest);
    }
  }//end ngOnInit

  setValues(requestInfo:PulseV){
    this.shared.routingByStateRequest(requestInfo.state.id);
    if(requestInfo.selectedOffer.suggestion){
      if(requestInfo.selectedOffer.suggestion.surveyRequired){
        this.surveyRequired = requestInfo.selectedOffer.suggestion.surveyRequired;
      }
    }
    this.workerImg = this.imgPath + requestInfo.selectedOffer.worker.user.personalData.photo;
    this.workerName = requestInfo.selectedOffer.worker.user.personalData.firstName + " " + requestInfo.selectedOffer.worker.user.personalData.lastName;
    this.workerTotalScore = requestInfo.selectedOffer.worker.score.totalScore;
    this.workTitle = requestInfo.selectedOffer.worker.workStation.info.title;
    this.workerMobile = requestInfo.selectedOffer.worker.user.personalData.mobileNumber;
    this.mobileHref = "tel:" + this.workerMobile;
    this.workerInvoice = requestInfo.proformaInvoice;
    this.workerCode = requestInfo.selectedOffer.worker.code;
    this.workerScore = requestInfo.selectedOffer.worker.score;
    this.priceScore = requestInfo.selectedOffer.worker.score.priceScore;
    this.satisfactionScore = requestInfo.selectedOffer.worker.score.satisfactionScore;
    this.timeScore = requestInfo.selectedOffer.worker.score.timeScore;
    this.workerContact = requestInfo.selectedOffer.worker.workStation.contactInfo;
    this.workerAddress = requestInfo.selectedOffer.worker.workStation.geoInfo.address;
    this.workerLat = requestInfo.selectedOffer.worker.workStation.geoInfo.lat;
    this.workerlng = requestInfo.selectedOffer.worker.workStation.geoInfo.longg;
    this.workerCatalog = requestInfo.selectedOffer.worker.workStation.catalogs;
    
    if(this.workerContact){
      if(this.workerContact.email){
        this.workerEmail = this.workerContact.email;
      }
      if(this.workerContact.instagram){
        this.workerInstagram= this.workerContact.instagram;
      }
      if(this.workerContact.telegram){
        this.workerTelegram = this.workerContact.telegram;
      }
      if(this.workerContact.website){
        this.workerWebsite = this.workerContact.website;
      }
    }
    if(this.workerInvoice){
      if(this.workerInvoice.totalPrice){
        let price_fa = this.customFunction.chanageNumbersToFarsi(this.workerInvoice.totalPrice.toString());
        this.price = this.customFunction.formatAmountMoney(price_fa) + " تومان";
      }
    }
    if(requestInfo.selectedOffer.suggestion){
      if(requestInfo.selectedOffer.suggestion.info){
        this.workerDescription = requestInfo.selectedOffer.suggestion.info;
      }
    }
  }//end setValues

  closeOffer(){
    let offer: OfferV = this.activeRequest.selectedOffer;
    this.shared.selectedOffer.next(offer);
    this.shared.showModalQuestionRefuseOffer.next(true);
    this.shared.noScroll.next(true);
    this.shared.selectedWorkerName.next(this.workerName);
  }//end closeOffer

  onPhoto(val:string){
    this.srcPhotoPopUp = this.imgPath + val;
    this.basicData.activeModalPhoto.next(true);
  }//end onPhoto

  onStartDoAck(){
    let offer: OfferV = this.activeRequest.selectedOffer;
    this.shared.selectedOffer.next(offer);
    this.shared.showModalQuestionStartDoAck.next(true);
    this.shared.noScroll.next(true);
    this.shared.selectedWorkerName.next(this.workerName);
  }//end onStartDoAck

}
