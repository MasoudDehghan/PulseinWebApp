import { StorageService } from '../../../../../services/storage/storage.service';
import { InvoiceV } from '../../../class/backend/invoiceV.class';
import { CustomFunctionsService } from './../../../../../services/functions/custom-functions.service';
import { PulseV } from '../../../class/backend/pulseV.class';
import { webappHttpService } from '../../../services/http/webapp-http.service';
import { SharedService } from '../../../../../services/shared/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnumUrls } from '../../../enum/enumUrls.enum';
import { PaymentV } from '../../../class/backend/paymentV.class';
import { RequestV } from '../../../class/backend/requestV.class';
import { PaymentRequestDto } from '../../../class/backend/paymentRequestDto.class';

@Component({
  selector: 'app-wait-to-payment',
  templateUrl: './wait-to-payment.component.html',
  styleUrls: ['./wait-to-payment.component.css']
})
export class WaitToPaymentComponent implements OnInit {

  loading:boolean = false;
  token: string = '';
  activeRequest: PulseV = null;
  requestID: number = 0;
  finalInvoice: InvoiceV = null;
  finalPrice: number = 0;
  txtFinalPrice: string = '';
  showTxtUseableCredit:boolean = false;
  useableCredit: number = 0;
  txtUseableCredit: string = '';
  slectedOnlinePayment:boolean = true;
  cashEnable:boolean = false;
  activeDiscount:boolean = false;

  constructor(private router: Router,
    private storage: StorageService,
    public shared:SharedService,
    private webappHttp: webappHttpService,
    public customFunction: CustomFunctionsService) {
      shared.sharedFinalInvoice.subscribe(res => {
        if(res){
          this.ngOnInit();
        }
      });
    }

  ngOnInit() {
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
          console.log("in wait to payment page mode 1");
          console.log(this.activeRequest);
          this.shared.stateNameRequest.next(this.activeRequest.state.name);
          this.shared.stateIdRequest.next(this.activeRequest.state.id);
          this.setValues(this.activeRequest);
        }
        else{
          //---request list is empty
          console.log("in page wait to payment");
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
      console.log("in wait to payment page mode 2");
      console.log(this.activeRequest);
      this.setValues(this.activeRequest);
    }

    this.shared.discountCode.subscribe(res=>{
      if(res){
        this.slectedOnlinePayment = true;
        this.activeDiscount = true;
      }
      else{
        this.activeDiscount = false;
      }
    });

  }//end ngOnInit


  setValues(requestInfo:PulseV){
    this.shared.routingByStateRequest(requestInfo.state.id);
    console.log(requestInfo);

    this.finalInvoice = requestInfo.finalInvoice;
    this.finalPrice = requestInfo.paymentInfo.finalPrice;
    let price_fa = this.customFunction.chanageNumbersToFarsi(this.finalPrice.toString());
    this.txtFinalPrice = this.customFunction.formatAmountMoney(price_fa) + " تومان";
    if(requestInfo.paymentInfo.usableCredit){
      if(requestInfo.paymentInfo.usableCredit > 0){
        this.showTxtUseableCredit = true;
        this.useableCredit = requestInfo.paymentInfo.usableCredit;
        let useableCredit_fa = this.customFunction.chanageNumbersToFarsi(this.useableCredit.toString());
        this.txtUseableCredit = this.customFunction.formatAmountMoney(useableCredit_fa) + " تومان";
      }
    }
    if(requestInfo.paymentInfo){
      this.cashEnable = requestInfo.paymentInfo.cashEnable;
    }
  }//end setValues


  onOnlineBox(){
    if(!this.slectedOnlinePayment){
      this.slectedOnlinePayment = true;
    }
  }//end onOnlineBox

  onCashBox(){
    if(this.slectedOnlinePayment){
      this.slectedOnlinePayment = false;
    }
  }//end onCashBox

  cashPayment(){
    this.loading = true;
    let payment:PaymentV = {
      requestId: this.requestID,
	    discountCode: '',
	    cash: true
    }
    this.webappHttp.postUserPayment(payment, this.token).subscribe(res => {
      this.loading = false;
      if(res.reqPayment == 0){
        this.shared.removeReserveDiscountCode();
        this.router.navigate(["/followRequest/survey"]);
      }
    }, error => {
      this.loading = false;
    });
  }//end cashPayment

  onlinePayment(){
    this.loading = true;
    let objRequest:RequestV ={
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
     takhfifanToken:null
    }
 
    let payment:PaymentRequestDto ={
     amount: null,
     description:null,
     callbackURL:null,
     email:null,
     mobile:null,
     status:null,
     authority:null,
     request:objRequest,
     discountCode:this.shared.discountCode.value,
     error:null,
     paymentLink:null,
     paymentDone:null,
     user:null
    } 
 
    console.log(":داده ارسالی پرداخت");
    console.log(payment);
 
    this.webappHttp.postUserAddCreditAndPayment(payment, this.token).subscribe(res => {
      if(res.paymentDone){
        this.webappHttp.getUserInfoWithToken(this.token).subscribe(data => {
          this.storage.subject_userDataLogin.next(data);
          this.shared.removeReserveDiscountCode();
          this.router.navigate(["/followRequest/survey"]);
          this.loading = false;
        });
      }
      else{
        //this.shared.removeReserveDiscountCode();
        this.loading = false;
        console.log(res.paymentLink);
        window.location.href = res.paymentLink;
      }
    }, error => {
      this.loading = false;
    });
  }//end onlinePayment

}
