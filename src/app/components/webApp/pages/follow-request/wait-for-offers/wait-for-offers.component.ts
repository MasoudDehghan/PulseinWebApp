import { CustomFunctionsService } from './../../../../../services/functions/custom-functions.service';
import { UrlRest } from '../../../../class/urlRest.class';
import { SharedService } from '../../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { webappHttpService } from '../../../services/http/webapp-http.service';
import { Router } from '@angular/router';
import { EnumUrls } from '../../../enum/enumUrls.enum';
import { PulseV } from '../../../class/backend/pulseV.class';
import { OfferV } from '../../../class/backend/offerV.class';

@Component({
  selector: 'app-wait-for-offers',
  templateUrl: './wait-for-offers.component.html',
  styleUrls: ['./wait-for-offers.component.css']
})
export class WaitForOffersComponent implements OnInit {

  token:string = "";
  imgPath:string = "";
  requestID:number = 0;
  activeRequest:PulseV = null;
  lottieConfig: Object;
  anim: any;

  constructor(public shared: SharedService,
    private webappHttp: webappHttpService,
    private urlRest:UrlRest,
    private router: Router,
    public customFunction: CustomFunctionsService){
      this.lottieConfig = {
        path: 'assets/webappPics/loading.json',
        renderer: 'canvas',
        autoplay: true,
        loop: true
      };
    }

  ngOnInit() {
    this.token = localStorage.getItem("userToken");
    this.imgPath = this.urlRest.imagePath;

    if(!this.token){
      this.router.navigate([EnumUrls.address_home]);
    }
    else if(this.token == ''){
      this.router.navigate([EnumUrls.address_home]);
    }
    else if(this.shared.requestID == 0 || !this.shared.requestInfo){
      this.shared.requestInfo = null;
      this.shared.requestID = 0;
      this.webappHttp.getOnProgressRequests(this.token).subscribe(res =>{
        console.log("wait to offer page: getOnProgressRequests is call on ");
        console.log(res);
        if(res.length > 0){
          if(res[0].state){
            this.activeRequest = res[0];
            this.setValues(res[0]);
          }
          else{
            //---state object not exist
            console.log("شی وضعیت درخواست وجود ندارد: برود به صفحه اصلی");
            this.router.navigate([EnumUrls.address_home]);
          }
        }
        else{
          //---request list is empty
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
      this.setValues(this.activeRequest);
    }   
  }//end ngOnInit

  setValues(requestInfo:PulseV){
    this.shared.routingByStateRequest(requestInfo.state.id);
    this.requestID = requestInfo.request.id;
    if(requestInfo.offers){
      this.shared.offerList = requestInfo.offers;
      //this.offerList[0].worker.user.personalData.photo
    }
  }//end setValues

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  closeOffer(offer:OfferV){
    this.shared.selectedOffer.next(offer);
    this.shared.showModalQuestionRefuseOffer.next(true);
    this.shared.noScroll.next(true);
    this.shared.selectedWorkerName.next(offer.worker.user.personalData.firstName + " " + offer.worker.user.personalData.lastName);
  }//end closeOffer

  onAcceptOffer(offer:OfferV){
    this.shared.selectedOffer.next(offer);
    this.shared.showModalQuestionAcceptOffer.next(true);
    this.shared.noScroll.next(true);
    this.shared.selectedWorkerName.next(offer.worker.user.personalData.firstName + " " + offer.worker.user.personalData.lastName);
  }


  showDetailsOffer(offer:OfferV){
    this.shared.selectedOffer.next(offer);
    this.router.navigate(["/followRequest/offerDetails"]);
    console.log("click in details");
  }//end showDetailsOffer



}
