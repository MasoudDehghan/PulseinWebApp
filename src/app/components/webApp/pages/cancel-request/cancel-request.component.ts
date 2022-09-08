import { EnumUrls } from './../../enum/enumUrls.enum';
import { JobCategory3V } from './../../../class/jobCategory3V.class';
import { PulseV } from './../../class/backend/pulseV.class';
import { TypeInfo } from './../../class/backend/typeInfo.class';
import { webappHttpService } from './../../services/http/webapp-http.service';
import { SharedService } from './../../../../services/shared/shared.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UrlRest } from '../../../class/urlRest.class';
import { RequestV } from '../../class/backend/requestV.class';
import { StorageService } from '../../../../services/storage/storage.service';
import { Router } from '../../../../../../node_modules/@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.css']
})
export class CancelRequestComponent implements OnInit {

  isLoading:boolean = true;
  userToken:string = '';
  listCancelCause:TypeInfo[] = [];
  requestInfo:PulseV = null;
  jobcat3Info:JobCategory3V = null;
  reqCode:string = '';
  reqTitle:string = '';
  jobcat3Img:string = '';
  jobcat3Name:string = '';
  description:string = '';
  listIdCancelCause:number[] = [];
  showTextNoSelectCheckBox:boolean = false;
  textNoSelectCheckBox:string = "هیچ یکی از گزینه های لغو درخواست انتخاب نشده است. لطفا دلایل لغو درخواست را از میان گزینه های زیر انتخاب نمایید. ";
  address_currentRequest:string = '';

  constructor(public shared:SharedService, 
    private httpService: webappHttpService,
    private router: Router,
    public storage:StorageService,
    private urlRest: UrlRest,
    @Inject(PLATFORM_ID) private platformId: Object) {
      this.address_currentRequest = EnumUrls.address_WebappCurrentRequest;
  }//end constructor

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    
    if(this.shared.cancelRequestInfo == null || this.shared.cancelRequest_jobcat3 == null){
      this.router.navigate([EnumUrls.address_home]);
    }
    else{
      this.requestInfo = this.shared.cancelRequestInfo;
      this.jobcat3Info = this.shared.cancelRequest_jobcat3;
      this.shared.cancelRequestInfo = null;
      this.shared.cancelRequest_jobcat3 = null;
      this.reqCode = this.requestInfo.request.code;
      this.reqTitle = this.requestInfo.request.title;
      this.jobcat3Name = this.jobcat3Info.name;
      this.jobcat3Img = this.urlRest.imagePath + this.jobcat3Info.icon
  
      this.userToken = localStorage.getItem('userToken');
      this.httpService.getCancelCauseList(this.userToken).subscribe(res => {
        this.listCancelCause = res;
        res.forEach(eleman=>{
          this.listIdCancelCause.push(-1);
        });
        this.isLoading = false;
      }, error => {
        //console.log("خطا به هنگام دریافت لیست دلایل لغو درخواست");
        //console.log(error);
      });
    }
  }//end ngOnInit

  onCause(item:TypeInfo, index:number){
    this.showTextNoSelectCheckBox = false;
    if(this.listIdCancelCause[index] == -1){
      this.listIdCancelCause[index] = item.id;
    }
    else{
      this.listIdCancelCause[index] = -1;
    }
    //console.log(this.listIdCancelCause);
  }//end onCause

  onCancelRequest(){
    let isCheckBoxSelected:boolean = false;
    for(let i=0; i<this.listIdCancelCause.length; i++){
      if(this.listIdCancelCause[i] != -1){
        isCheckBoxSelected = true;
      }
    }
    if(isCheckBoxSelected){
      this.isLoading = true;
      this.userToken = localStorage.getItem('userToken');
      let selectedCancelcauseIds:number[] = [];
      
      this.listIdCancelCause.forEach(item => {
        if(item != -1){
          selectedCancelcauseIds.push(item);
        }
      });
      
      let request:RequestV = {
        id:this.requestInfo.request.id,
        cat3Id: null,
        code: null,
        client: null,
        title: null,
        info: null,
        geoData: null,
        timeData: null,
        photos: null,
        cancelCause: this.description,
        discountCode: null,
        answers: null,
        cancelCauseIds: selectedCancelcauseIds,
        takhfifanToken:null
      }

      this.httpService.postCancelRequest(request, this.userToken).subscribe(res =>{
        if(res.code == 0){
          this.storage.currentRequestInfo.next(null);
          //this.isCancelRequestResultOK = true;
          this.storage.clearWorkerMsg();
          this.shared.hasActiveRequest.next(false);
          this.httpService.getUserInfoWithToken(this.userToken).subscribe(data => {
            this.storage.subject_userDataLogin.next(data);
            this.shared.removeReserveDiscountCode();
            this.isLoading = false;
            this.shared.showModalFolloweRequest.next(false);
            this.router.navigate([EnumUrls.address_home]);
          },error=>{
            //console.log('خطای گرفتن اطلاعات کاربر از بک اند به هنگام لغو درخواست');
            //console.log(error);
          });
        }
      }, error => {
        this.isLoading = false;
        //console.log("خطای حذف درخواست");
        //console.log(error);
      });
    }
    else{
      this.showTextNoSelectCheckBox = true;
    }
  }//end onCancelRequest

}
