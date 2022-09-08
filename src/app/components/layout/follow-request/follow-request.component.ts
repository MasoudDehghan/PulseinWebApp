import { Subscription } from 'rxjs';
import { RequestStateEnum } from './../../webApp/enum/requestState.enum';
import { PulseV } from './../../webApp/class/backend/pulseV.class';
import { Router } from '@angular/router';
import { JobCategory3V } from './../../class/jobCategory3V.class';
import { UrlRest } from './../../class/urlRest.class';
import { BasicDataService } from './../../../services/basicData/basic-data.service';
import { CustomFunctionsService } from './../../../services/functions/custom-functions.service';
import { HttpService } from './../../../services/http/http.service';
import { webappHttpService } from './../../webApp/services/http/webapp-http.service';
import { EnumUrls } from './../../webApp/enum/enumUrls.enum';
import { SharedService } from './../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { RequestV } from '../../webApp/class/backend/requestV.class';
import { DiscountCV } from '../../webApp/class/backend/discountCV.class';
import { webappConstValue } from '../../webApp/class/webappConstVal';
import { DeviceDetectorService } from 'ngx-device-detector';
import { PushNotificationsService } from '../../webApp/services/pushNotification.service';

@Component({
  selector: 'app-follow-request',
  templateUrl: './follow-request.component.html',
  styleUrls: ['./follow-request.component.css']
})
export class FollowRequestComponent implements OnInit {

  loadingJobcats:boolean = true;
  loadingData:boolean = false;
  token:string = "";
  jobCat3:JobCategory3V = null;
  jobCat3List:Array<JobCategory3V[]> = [];
  imgPath:string = "";
  iconJobcat:string;
  jobcat3ID:number = 0;
  jobcat3Name:string = "";
  requestID:number = 0;
  requestTitle:string = "";
  requestCode:string = "";
  requestState:string = "";
  requestInfo:PulseV = null;
  requestInfoList:string[] = [];
  isDiscountWithPercent:boolean = false;
  textDiscoutnWithoutPercent:string = "تخفیف شما در آخر کار بر روی فاکتور اعمال خواهد شد.";
  txtDiscountWithPercent1:string = " درصد تخفیف تا سقف ";
  txtDiscountWithPercent2:string = " تومان بر فاکتور شما اعمال خواهد شد.";
  isEmergency:boolean = false;
  emergencyText:string = "در کوتاه ترین زمان ممکن انجام شود";
  requestStartTimeSplit:string[] = [];
  requestEndTimeSplit:string[] = [];
  requestStartDateSplit:string[] = [];
  fa_mounth:string = '';
  fa_day:string = "";
  fa_year:string = "";
  startTime:string = "";
  endTime:string = "";
  requestImgeList:string[] = [];
  addressText:string = "";
  showModalRefuseOffer:boolean = false;
  showModalAcceptOffer:boolean = false;
  showModalStartDoAck:boolean = false;
  discountCodeText:string = '';
  isMobile:boolean = false;

  triggerRefreshRequestSubscription:Subscription;

  constructor(public shared:SharedService,
    private basicData: BasicDataService,
    private urlRest:UrlRest,
    private router: Router,
    public constVal: webappConstValue,
    private webappHttp: webappHttpService,
    private httpService: HttpService,
    private deviceService: DeviceDetectorService,
    private _pushNotificationService: PushNotificationsService,
    public customFunction: CustomFunctionsService) {
      this.shared.isWebAppPage.next(true);
      shared.iqbazBanerShow.next(false);
      this.isMobile = this.deviceService.isMobile();
      if(!this.isMobile)
        this._pushNotificationService.requestPermission();
    }

  ngOnInit() {

    this.shared.showModalQuestionRefuseOffer.subscribe(res =>{
      console.log(res+":******");
      if(res){
        this.showModalRefuseOffer = true;
        console.log("show modal is true");
      }
      else{
        this.showModalRefuseOffer = false;
        console.log("show modal is false");
      }
    });

    this.shared.showModalQuestionAcceptOffer.subscribe(res =>{
      console.log(res+":******");
      if(res){
        this.showModalAcceptOffer = true;
        console.log("show modal is true");
      }
      else{
        this.showModalAcceptOffer = false;
        console.log("show modal is false");
      }
    });

    this.shared.showModalQuestionStartDoAck.subscribe(res =>{
      console.log(res+":******");
      if(res){
        this.showModalStartDoAck = true;
        console.log("show modal is true");
      }
      else{
        this.showModalStartDoAck = false;
        console.log("show modal is false");
      }
    });


    this.token = localStorage.getItem("userToken");
    this.imgPath = this.urlRest.imagePath;
    if(this.token && this.token != ""){
      //-----start get list categories3-------
      if(this.basicData.categories3.length > 0){
        this.jobCat3List = this.basicData.categories3;
        this.loadingJobcats = false;
      }
      else if(localStorage.getItem("servicesJobCats3")){
        this.jobCat3List = JSON.parse(localStorage.getItem("servicesJobCats3"));
        this.loadingJobcats = false;
      }
      else{
        this.httpService.getAllJobCat().subscribe( data =>{
          let categories2:any;
          data.forEach(element => {
            categories2.push(element.jobCat2List);
            let jc2List = element.jobCat2List;
            jc2List.forEach(el => {
              this.jobCat3List.push(el.jobCat3List);
            });
          });
          this.loadingJobcats = false;
        });
      }
      //-----end get list categories3-------
      if(this.shared.requestID == 0 || !this.shared.requestInfo){
        this.shared.requestInfo = null;
        this.shared.requestID = 0;
        this.webappHttp.getOnProgressRequests(this.token).subscribe(res =>{
          console.log("getOnProgressRequests is call");
          console.log(res);
          if(res.length > 0){
            this.setValue(res[0]);
          }
          else{
            //---request list is empty
            console.log("لیست درخواست کاربر خالی است: برود به صفحه اصلی");
            this.router.navigate([EnumUrls.address_home]);
          }
        });
      }//end if
      else{
        this.setValue(this.shared.requestInfo);
      }
    }
    else{
      //---token not exist
      console.log("توکن وجود ندارد: کاربر لاگین نیست: برو به صفحه اصلی");
      this.router.navigate([EnumUrls.address_home]);
    }

    this.triggerRefreshRequestSubscription = this.basicData.triggerRefreshRequest.subscribe(response=>{
      let notificationID:number = response;
      //this.getRequestInfo();

      this.requestInfoLookUpByID();
    });
    
  }//end ngOnInit

  ngOnDestroy(){
    if(this.triggerRefreshRequestSubscription){
      this.triggerRefreshRequestSubscription.unsubscribe();
    }
  }//end ngOnDestroy

  setValue(info:PulseV){
    console.log(info);
    this.requestInfo = info;
    if(info.state){
      if(info.state.id == 1 || info.state.id == 14 || info.state.id == 10 || info.state.id == 12 || info.state.id == 5){
        sessionStorage.setItem("requset", JSON.stringify(info));
        this.requestID = info.request.id;
        this.requestTitle = info.request.title;
        this.jobcat3ID = info.request.cat3Id;
        this.jobCat3List.forEach(item=>{
          item.forEach(jobcat =>{
            if(this.jobcat3ID == jobcat.id){
              this.iconJobcat = this.urlRest.imagePath + jobcat.icon;
              this.jobcat3Name = jobcat.name;
              sessionStorage.setItem("reqJobcat3ID", this.jobcat3ID.toString());
              sessionStorage.setItem("reqJobcat3Name", this.jobcat3Name);
              sessionStorage.setItem("reqJobcat3Icon", this.iconJobcat);
              this.jobCat3 = jobcat;
            }
          });
        });
        this.requestCode = info.request.code;
        this.shared.stateIdRequest.next(info.state.id);
        this.shared.stateNameRequest.next(info.state.name);
        this.shared.stateNameRequest.subscribe(res => {
          this.requestState = res;
        });
        if(info.reservedDiscount){
          if(info.reservedDiscount.code){
            this.shared.discountCode.next(info.reservedDiscount.code);
            if(info.reservedDiscount.percent){
              this.isDiscountWithPercent = true;
              //this.shared.btnTextCheckDiscount.next('مشاهده کد تخفیف');
              this.shared.checkDiscountValue(info.reservedDiscount.code, info.reservedDiscount.percent, info.reservedDiscount.maxCredit);
            }
          }
        }
        this.requestInfoList = info.request.info.split('\n');
        this.isEmergency = info.request.timeData.emergency;
        if(!this.isEmergency){
          this.requestStartTimeSplit = info.request.timeData.startTime.split(" ");
          this.requestEndTimeSplit = info.request.timeData.endTime.split(" ");
          this.requestStartDateSplit = this.requestStartTimeSplit[0].split("-");
          this.fa_mounth = this.customFunction.farsiStringMonth(this.requestStartDateSplit[1]);
          this.fa_year = this.customFunction.chanageNumbersToFarsi(this.requestStartDateSplit[0]);
          this.fa_day = this.customFunction.chanageNumbersToFarsi(this.requestStartDateSplit[2]);
          this.startTime = this.requestStartTimeSplit[1];
          this.endTime = this.requestEndTimeSplit[1];
          if(info.request.photos){
            if(info.request.photos.length > 0){
              this.requestImgeList = info.request.photos;
            }
          }
          this.addressText = info.request.geoData.address;
        }
      }
    }
    else{
      //---state object not exist
      console.log("شی وضعیت درخواست وجود ندارد: برود به صفحه اصلی");
      this.router.navigate([EnumUrls.address_home]);
    }
  }//end setValue

  onNoModalRefuseOffer(){
    this.shared.showModalQuestionRefuseOffer.next(false); 
    this.shared.noScroll.next(false);
    this.shared.selectedWorkerName.next("");
    this.shared.selectedOffer.next(null);
  }//end onNoModalRefuseOffer

  onYesModalRefuseOffer(){
    this.loadingData = true;
    this.shared.showModalQuestionRefuseOffer.next(false);
    this.shared.noScroll.next(false);
    this.shared.selectedWorkerName.next("");
    let offerID:number = this.shared.selectedOffer.value.suggestion.id;     

    console.log(offerID);
    console.log(this.shared.selectedOffer.value);
    
    if(this.shared.stateIdRequest.value == RequestStateEnum.waitToOffer){
      this.webappHttp.getUserRejectOffer(offerID , this.token).subscribe(res => {
        console.log("rejectOffer is run");
        console.log(res);
        this.shared.selectedOffer.next(null);
        if(res.code == 0){
          this.rejectOfferLookupByID();
        }
        else{
          this.router.navigate([EnumUrls.address_home]);
        }
      }, error => {});
    }
    else{
      this.webappHttp.getUserRejectOffer2(offerID , this.token).subscribe(res => {
        console.log("rejectOffer2 is run");
        console.log(res);
        this.shared.selectedOffer.next(null);
        if(res.code == 0){
          this.rejectOfferLookupByID();
        }
        else{
          this.router.navigate([EnumUrls.address_home]);
        }
      }, error => {});
    }    
  }//end onYesModalRefuseOffer

  rejectOfferLookupByID(){
    this.shared.offerList = [];
    this.webappHttp.getLockupByIdRequest(this.token, this.requestID).subscribe(data => {
      this.requestInfoLookUpByID();
    });
  }//end rejectOfferLookupByID

  onCancelRequest(){
    this.shared.cancelRequestInfo = this.requestInfo;
    this.shared.cancelRequest_jobcat3 = this.jobCat3;
    this.router.navigate([EnumUrls.canselrequestPage]);
  }//end onCancelRequest

  onNoModalAcceptOffer(){
    this.shared.showModalQuestionAcceptOffer.next(false); 
    this.shared.noScroll.next(false);
    this.shared.selectedWorkerName.next("");
    this.shared.selectedOffer.next(null);
  }//end onNoModalAcceptOffer

  onYesModalAcceptOffer(){
    this.loadingData = true;
    this.shared.showModalQuestionAcceptOffer.next(false);
    this.shared.noScroll.next(false);
    this.shared.selectedWorkerName.next("");
    let offerID:number = this.shared.selectedOffer.value.suggestion.id;

    this.webappHttp.getUserAcceptOffer(offerID, this.token).subscribe(res => {
      console.log("مرحله قبول پیشنهاد");
      if(res.code == 0){
        console.log("رد کردن مرحله قبول پیشنهاد");
        this.requestInfoLookUpByID();
      }
    }, error => {});
    
  }//end onYesModalAcceptOffer

  onNoModalStartDoAck(){
    this.shared.showModalQuestionStartDoAck.next(false); 
    this.shared.noScroll.next(false);
    this.shared.selectedWorkerName.next("");
    this.shared.selectedOffer.next(null);
  }//end onNoModalStartDoAck

  onYesModalStartDoAck(){
    this.loadingData = true;
    this.shared.showModalQuestionStartDoAck.next(false);
    this.shared.noScroll.next(false);
    this.shared.selectedWorkerName.next("");
    //let offerID:number = this.shared.selectedOffer.value.suggestion.id;

    this.webappHttp.getUserAcceptInvoice(this.requestID, this.token).subscribe(res => {
      console.log("مرحله تأیید شروع");
      if(res.code == 0){
        console.log("رد کردن مرحله تأیید شروع");
        this.requestInfoLookUpByID();
      }
    }, error =>{});   
  }//end onYesModalStartDoAck

  requestInfoLookUpByID(){
    this.shared.offerList = [];
    this.webappHttp.getLockupByIdRequest(this.token, this.requestID).subscribe(data => {
      console.log("getLockupByIdRequest is run");
      console.log(data);
      this.loadingData = false;
      if(data.offers){
        this.shared.offerList = data.offers;
      }
      if(data.finalInvoice){
        this.shared.sharedFinalInvoice.next(data.finalInvoice);
      }
      console.log("data.state.id: " + data.state.id);
      this.shared.routingByStateRequest(data.state.id);
    });
  }//end requestInfoLookUpByID


  onInputDiscount(val:string){
    this.discountCodeText = val;
  }//end onInputDiscount

  onCheckDiscount(){
    let request: RequestV = {
      id: this.requestID,
      cat3Id: null,
      code: null,
      client: null,
      title: null,
      info: null,
      geoData: null,
      timeData: null,
      photos: null,
      cancelCause: null,
      discountCode: null,
      answers: null,
      cancelCauseIds: null,
      takhfifanToken: null
    }

    let discountCV:DiscountCV = {
      code: this.discountCodeText,
      percent: null,
      maxCredit: null
    }

    let data: PulseV = {
      request:request, 
      state:null,
      stateHistory:null,
      offers:null,
      initialOffer:null,
      selectedOffer:null,
      proformaInvoice:null,
      finalInvoice:null,
      score:null,
      summary:null,
      transactions:null,
      workingStartTime:null,
      workingEndTime:null,
      discountInfo:null,
      cashEnable:null,
      reservedDiscount:discountCV,
      paymentInfo:null
    }
    this.httpService.reserveDiscount(data, this.token).subscribe(res => {
      console.log("reserve discount");
      console.log(res);
      this.shared.discountCode.next(res.reservedDiscount.code);
      if(res.reservedDiscount.percent){
        this.isDiscountWithPercent = true;
        this.shared.checkDiscountValue(res.reservedDiscount.code, res.reservedDiscount.percent, res.reservedDiscount.maxCredit);
      }
      else{
        this.isDiscountWithPercent = false;
      }
    });
  }//end onCheckDiscount

  deleteDiscount(){
    this.httpService.removeDiscount(this.requestInfo , this.token).subscribe(res => {
      console.log("delete discount code");
      console.log(res);
      this.shared.removeReserveDiscountCode();
      this.discountCodeText = '';
    });
  }//end deleteDiscount

  detailsRequest(){
    sessionStorage.setItem("requestInfo", JSON.stringify(this.requestInfo));
    this.router.navigate(["/followRequest/detailsRequest"]);
  }//end detailsRequest


}
