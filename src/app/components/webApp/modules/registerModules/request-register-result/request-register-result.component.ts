import { EnumConstData } from './../../../../enum/constData.enum';
import { CustomFunctionsService } from './../../../../../services/functions/custom-functions.service';
import { StorageService } from './../../../../../services/storage/storage.service';
import { EnumUrls } from './../../../enum/enumUrls.enum';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/shared/shared.service';
import { Router } from '../../../../../../../node_modules/@angular/router';
import { webappHttpService } from '../../../services/http/webapp-http.service';

@Component({
  selector: 'app-request-register-result',
  templateUrl: './request-register-result.component.html',
  styleUrls: ['./request-register-result.component.css']
})
export class RequestRegisterResultComponent implements OnInit {

  msgWaitForOffers: string = "منتظر اعلام قیمت از طرف متخصصین پالسین باشید.";
  subMsgWaitForOffers: string = "در کمتر از ۲۰ دقیقه قیمت‌های پیشنهادی از طرف متخصصین به شما اعلام خواهد شد.";
  textFolloweRequest:string = "پیگیری درخواست";
  textCodeRequest:string = "کد درخواست ثبت شده : ";
  requestCode:string = '';
  isLoading:boolean = true;
  discountCode:string = '';
  percentDiscount:number = 0;
  faPercentDiscount:string = '';
  maxCreditDiscount:number = 0;
  faMaxCreditDiscount:string = '';
  tel1:string = '';
  mobile1:string = '';
  

  constructor(public shared:SharedService,
    private customFunction: CustomFunctionsService,
    private router:Router,
    public storage: StorageService,
    private httpService: webappHttpService,) {
    if(shared.requestRegister){
      this.requestCode = shared.requestRegister.request.code;
      this.shared.stepNumber.next(7);
    }
    else{
      router.navigate([EnumUrls.address_home]);
    }
  }//end constructor

  ngOnInit() {
    sessionStorage.removeItem("discountCode");
    let token = localStorage.getItem('userToken');
    this.tel1 = EnumConstData.suportTel1;
    this.mobile1 = EnumConstData.suportmobile1;
    this.httpService.getUserInfoWithToken(token).subscribe(res => {
      this.storage.subject_userDataLogin.next(res);
      this.isLoading = false;
      if(res.inProgressRequests[0].reservedDiscount){
        this.discountCode = res.inProgressRequests[0].reservedDiscount.code;
        this.faPercentDiscount = this.customFunction.chanageNumbersToFarsi(res.inProgressRequests[0].reservedDiscount.percent.toString());
        this.faMaxCreditDiscount = this.customFunction.formatAmountMoney(this.customFunction.chanageNumbersToFarsi(res.inProgressRequests[0].reservedDiscount.maxCredit.toString()));
      }
    }, error => {
      //console.log(error);
    });
  }//end ngOnInit

  onFollowRequest() {
    this.router.navigate([EnumUrls.address_WebappCurrentRequest]);
  }//end onFollowRequest

}
