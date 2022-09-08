import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PaymentRequestV } from '../../class/backend/paymentRequestV.class';
import { Message } from '../../class/backend/mesage.class';
import { webappHttpService } from '../../services/http/webapp-http.service';
import { webappConstValue } from '../../class/webappConstVal';
import { CustomFunctionsService } from '../../../../services/functions/custom-functions.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { BasicDataService } from '../../../../services/basicData/basic-data.service';


@Component({
  selector: 'modal-add-credit',
  templateUrl: './modal-add-credit.component.html',
  styleUrls: ['./modal-add-credit.component.css']
})
export class ModalAddCreditComponent implements OnInit {

  @Input() userToken:string;
  @Input() credit:number;
  @Input() dicountCode:string;
  @Input() requestID:number;

  xWindow:number = 0;
  yWindow:number = 0;
  urlPayment:string = '';

  displayModalAddCredit:boolean = false;
  TextAddCredit:string = "";
  moneyPayment:string = '';
  isMoney:boolean = false;
  moneyAdded:number = 0;
  modalBoxPositionTop:string = '0px';
  modalBoxPositionRight:string = '0px';
  modalBoxSizeX:string = '0px';
  modalBoxSizey:string = '0px';

  constructor(private httpService: webappHttpService,
    public constVal: webappConstValue,
    private customFunction: CustomFunctionsService,
    private basicData: BasicDataService,
    private customFunctions: CustomFunctionsService,
    private storage: StorageService) { }

  ngOnInit() {
    this.displayModalAddCredit = true;
    this.TextAddCredit = this.constVal.textAddCredit;

    if(this.storage.userDataLogin){
      this.urlPayment = this.storage.userDataLogin.urlPayment;
      //console.log(this.urlPayment);
    } 

    if(this.credit > 0){
      this.moneyPayment = this.customFunctions.formatAmountMoney(this.credit.toString());
      this.isMoney = true;
      this.moneyAdded = this.credit;
    }
    this.xWindow = window.innerWidth;
    this.yWindow = window.innerHeight;
    this.setPositionModalAddCredit();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.xWindow = window.innerWidth;
    this.yWindow = window.innerHeight;
    this.setPositionModalAddCredit();
  }

  showModalStyle(val:number){
    //modal for add credit: val = 1
    if(val == 1){
     let style = {
       'top': this.modalBoxPositionTop,
       'right': this.modalBoxPositionRight,
       'width': this.modalBoxSizeX,
       'height': this.modalBoxSizey
     }
     return style;
    }
  }

  hideModalStyle(){
    this.modalBoxPositionTop = '0px';
    this.modalBoxPositionRight = '0px';
    this.modalBoxSizeX = '0px';
    this.modalBoxSizey = '0px';
    let style = {
      'top': '0px',
      'right': '0px',
      'width': '0px',
      'height': '0px'
    }
    return style;
  }

  onCloseModalAddCredit(){
    this.displayModalAddCredit = false;
    this.basicData.activeModalAddCredit.next(false);
  }

  onInputCreditChange(val:string){
    val = val.trim();
    val = this.customFunction.chanageNumbersToEnglish(val);
    this.moneyPayment = this.customFunctions.formatAmountMoney(val);
    let money = Number(val);
    
    if(isNaN(money)){
      this.isMoney = false;
    }
    else{
      if(money < this.constVal.minAddCredit){
        this.isMoney = false;
      }
      else{
        this.isMoney = true;
        this.moneyAdded = money;
      }
    }
  }


  onPayment(){
    // state: 1 => (add credit & payment) , 0 => just (add credit)
    let payment:PaymentRequestV = {
      amount: this.moneyAdded,
      description:null,
      callbackURL:null,
      email:null,
      mobile:null,
      status:null,
      authority:null,
      error:null,
      paymentLink:null
    }
    this.httpService.postUserAddCredit(payment, this.userToken).subscribe(res => {
      console.log(res);
      if(res){
        window.location.href = res.paymentLink;
        //window.location.href = this.urlPayment + res.authority;
        ////window.open(this.urlPayment + res.authority,'_blank');
      }
    }, error => {
      console.log("error");
      let msgError:Message = <Message>(error.error.error);
      console.log(msgError);
    });

  }//end onPayment

  setPositionModalAddCredit(){
    if(this.xWindow > 500){
      this.modalBoxSizeX = '500px';
      this.modalBoxPositionRight = ((this.xWindow / 2) - (500 / 2))+'px';
    }
    else{
      this.modalBoxSizeX = this.xWindow+'px';
      this.modalBoxPositionRight = '0px';
    }
    if(this.yWindow > 180){
      this.modalBoxSizey = '180px';
      this.modalBoxPositionTop = ((this.yWindow / 2) - (180 / 2))+'px';
    }
    else{
      this.modalBoxSizey = '180px';
      this.modalBoxPositionTop = '0px';
    }
  }

}
