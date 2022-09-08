import { QuestionAnswer } from './../../../class/backend/questionAnswer.class';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/shared/shared.service';
import { UrlRest } from '../../../../class/urlRest.class';
import { Router } from '@angular/router';
import { EnumUrls } from '../../../enum/enumUrls.enum';
import { CheckDiscountRequest } from '../../../class/backend/checkDiscountRequest.class';
import { StorageService } from '../../../../../services/storage/storage.service';
import { webappHttpService } from '../../../services/http/webapp-http.service';
import { RequestTime } from '../../../class/backend/requestTime.class';
import { RequestGeo } from '../../../class/backend/requestGeo.class';
import { RequestV } from '../../../class/backend/requestV.class';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from '../../../../class/toastMessage.class';
import { LocationStrategy } from '@angular/common';
import { Message } from '../../../../class/mesage.class';


@Component({
  selector: 'app-request-summary',
  templateUrl: './request-summary.component.html',
  styleUrls: ['./request-summary.component.css']
})
export class RequestSummaryComponent implements OnInit {

  isLoading:boolean = false;
  userToken:string = '';
  imgUrlsList:string[] = [];
  imagePath:string = '';

  jobcat3EName:string = '';
  jobcat3Name:string = '';
  jobcat3Id:number = 0;
  jobcat3Icon:string = '';

  discountText:string = null;
  hasDiscountCode:boolean = false;
  discountIsChecked:boolean = false;
  farsiPercent:string = '';
  farsiMaxCredit:string = '';

  blank: string = "ندارد";
  reqTitle:string = '';
  reqDescription:string = '';
  haveQuestion:boolean = false;
  answerQuestionList:QuestionAnswer[] = [];
  emergancy:boolean = false;

  RulesIsOK:boolean = false;
  rulesHref:string = '';
  errorRulesAccept:boolean = false;

  constructor(public shared: SharedService,
    private urlRest: UrlRest,
    private location: LocationStrategy,
    public storage: StorageService,
    private toastr: ToastrService,
    private toastMsg: ToastMessage,
    private webapphttpService: webappHttpService,
    private router: Router){
      if(shared.reqRej_preRegister && shared.reqRej_jobcat3Select && (shared.savePalceID || shared.address != '')){
        this.shared.stepNumber.next(6);
        this.shared.stepNumberMobile.next(4);
        this.jobcat3EName = shared.reqRej_jobcat3Select.ename;
        this.jobcat3Name = shared.reqRej_jobcat3Select.name;
        this.jobcat3Id = shared.reqRej_jobcat3Select.id;
        this.jobcat3Icon = urlRest.imagePath + shared.reqRej_jobcat3Select.icon;
        this.imgUrlsList = [];
        if (shared.reqRej_photoList.length > 0) {
          shared.reqRej_photoList.forEach(eleman => {
            let s: number = eleman.lastIndexOf('msg');
            let e: number = eleman.lastIndexOf('"');
            this.imgUrlsList.push(eleman.substring(s + 6, e));
          });
          //console.log(this.imgUrlsList);
        }
        this.imagePath = this.urlRest.imagePath;
        this.reqTitle = shared.reqRej_title;
        this.reqDescription = shared.reqRej_description;
        this.emergancy = shared.reqRej_emergancy;
        this.rulesHref = EnumUrls.rulesUrl;
        this.haveQuestion = shared.reqRej_preRegister.haveQuestion;
        if(this.haveQuestion){
          this.answerQuestionList = shared.listQuestionAnswer;
        }
        else{
          shared.listAnswerV = null;
        }
        this.isLoading = false;
      }
      else{
        router.navigate([EnumUrls.address_home]);
      }  
  }//end constructor

  ngOnInit() {
    if(sessionStorage.getItem("discountCode")){
      this.discountText = sessionStorage.getItem("discountCode");
      this.hasDiscountCode = true;
    }
  }//end ngOnInit

  inputDiscount(inputText:string){
    this.toastr.clear();
    this.discountText = inputText;
    if(this.discountText.length > 2){
      this.hasDiscountCode = true;
    }
    else{
      this.hasDiscountCode = false;
    }
  }//end inputDiscount

  onDiscountCkeck(){
    this.toastr.clear();
    this.userToken = localStorage.getItem("userToken");
    let code:string = this.discountText;
    let cat3Id:number = this.jobcat3Id;
    let areaId:number = null;
    let candidateId:number = null;
    //console.log("city: " + this.shared.selectedArea.value);
    //console.log(this.shared.citySelected.name);
    //console.log(this.shared.citySelected.id);
    if (this.shared.isSavePlace) {
      candidateId = this.shared.savePalceID;
      areaId = null;
    }
    else {
      this.shared.savePalceID = null;
      areaId = this.shared.areaID;
    }
	     
    let data:CheckDiscountRequest = {
      code: code,
      cat3Id: cat3Id,
      areaId: areaId,
      candidateId: candidateId
    }

    if(this.storage.isLogin.value){
      this.shared.isLoadingFullPageLatti.next(true);
      this.webapphttpService.checkDiscount(data, this.userToken).subscribe(res => {
        this.shared.isLoadingFullPageLatti.next(false);
        this.shared.checkDiscountValue(res.code, res.percent, res.maxCredit);
        this.discountIsChecked = true;
      }, error =>{
        this.discountText = null;
        this.shared.isLoadingFullPageLatti.next(false);
      });
    }
    else{
      this.shared.checkDiscountInLogin.next(true);
      sessionStorage.setItem("infoDiscountRequest", JSON.stringify(data));
      this.storage.showModalLogin.next(true);
      this.shared.resDiscountCheckWithLogin.subscribe(res => {
        if(res){
          this.discountIsChecked = true;
          this.shared.resDiscountCheckWithLogin.next(false);
        }
      });
    }
    
  }//end onDiscountCkeck

  onCloseDiscountRes(){
    this.discountIsChecked = false;
    this.discountText = null;
    this.hasDiscountCode = false;
    this.discountText = null;
    this.shared.removeReserveDiscountCode();
  }//end onCloseDiscountRes

  onCheckBoxRules(){
    this.toastr.clear();
    this.RulesIsOK = !this.RulesIsOK;
    if(this.RulesIsOK){
      this.errorRulesAccept = false;
    }
    else{
      this.errorRulesAccept = true;
    }
  }//end onCheckBoxRules

  onRegisterRequest() {
    /*
    this.toastr.clear();
    this.toastr.warning(this.toastMsg.msgUpdateServer, this.toastMsg.title4UpdatServer);
    */
    /* */
    this.toastr.clear();
    if(this.RulesIsOK){
      this.userToken = localStorage.getItem("userToken");
      this.isLoading = true;
      let imageList: string[] = [];
      if (this.shared.reqRej_photoList.length > 0) {
        this.shared.reqRej_photoList.forEach(eleman => {
          let s: number = eleman.lastIndexOf('msg');
          let e: number = eleman.lastIndexOf('"');
          imageList.push(eleman.substring(s + 6, e));
        });
      }

      let isEmergancy: boolean = false;

      let dayId = this.shared.selectedIndexOfDateList;
      let listIdTimePeriodSelected: number[] = [];

      for (let i = 0; i < this.shared.listTimesPeriodBox.length; i++) {
        if (this.shared.arrCheckBoxTimePeriod[i]) {
          listIdTimePeriodSelected.push(this.shared.listTimesPeriodBox[i].id);
        }
      }

      if (this.emergancy) {
        isEmergancy = true;
        dayId = null;
        listIdTimePeriodSelected = null;
      }

      let requestTime: RequestTime = {
        emergency: isEmergancy,
        startTimeD: null,
        endTimeD: null,
        expireTimeD: null,
        startTime: null,
        endTime: null,
        newStyle: true,
        dayId: dayId,
        periods: listIdTimePeriodSelected
      };

      if (this.shared.isSavePlace) {
        this.shared.address = null;
        this.shared.reqReg_lat = null;
        this.shared.reqReg_lng = null;
      }
      else {
        this.shared.savePalceID = null;
      }

      let requestGeo: RequestGeo = {
        candidateId: this.shared.savePalceID,
        address: this.shared.address,
        areaId: this.shared.areaID,
        lat: this.shared.reqReg_lat,
        longg: this.shared.reqReg_lng,
        postalCode: null,
        destinationAddress: this.shared.destination
      };

      let requestInfo: RequestV = {
        id: null,
        cat3Id: this.shared.reqRej_jobcat3Select.id,
        code: null,
        client: null,
        title: this.reqTitle,
        info: this.reqDescription,
        geoData: requestGeo,
        timeData: requestTime,
        photos: imageList,
        cancelCause: null,
        discountCode: this.discountText,
        answers: this.shared.listAnswerV,
        cancelCauseIds: null,
        takhfifanToken: this.shared.takhfifanToken
      };

      if (this.storage.isLogin.value) {
        //console.log("---user is Login and request register is runing---");
        //console.log(requestInfo);
        //=======user is login=========/
        this.webapphttpService.postUserNewRequest(requestInfo, this.userToken).subscribe(res => {
          this.shared.requestRegister = res;
          this.shared.hasActiveRequest.next(true);
          //console.log("نتیجه ثبت درخواست");
          //console.log(res);
          this.router.navigate([EnumUrls.requestRegister_requestResult]);
        }, error => {
          this.discountText = null;
          this.isLoading = false;
          this.shared.removeReserveDiscountCode();
          this.shared.userToken = this.userToken;
          //console.log("خطای ثبت درخواست کاربر لاگین");
          //console.log(error);
          let msgError = <Message>(error.error.error);
          //console.log(msgError);
          msgError.msg.forEach(eleman =>{
            if(eleman.code == 180){
              this.webapphttpService.getUserInfoWithToken(this.shared.userToken).subscribe(res => {
                this.storage.subject_userDataLogin.next(res);
                if(res.inProgressRequests){
                    if(res.inProgressRequests.length > 0){
                      this.shared.hasActiveRequest.next(true);
                      this.router.navigate([EnumUrls.address_home]);
                    }
                }
              }, error => {
                //console.log(error);
              });
            }
          });
        }); 
      }
      else if (!this.storage.isLogin.value) {
        //=======user is guest=========/
        sessionStorage.setItem('requestInfo', JSON.stringify(requestInfo));
        this.storage.isLoginWithRequest.next(true);
        this.storage.showModalLogin.next(true);
        this.isLoading = false;
      }
    }
    else{
      this.toastr.clear()
      this.toastr.error(this.toastMsg.msgAcceptRules, this.toastMsg.title4AcceptRules);
      this.errorRulesAccept = true;
    }
    /**/

  }//end onRegisterRequest

  onBack() {
    this.toastr.clear();
    this.location.back();
  }//end onBack

}
