import { CustomFunctionsService } from '../../../../services/functions/custom-functions.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PulseV } from '../../class/backend/pulseV.class';
import { InvoiceV } from '../../class/backend/invoiceV.class';
import { StateV } from '../../class/backend/stateV.class';
import { DocumentV } from '../../class/backend/documentV.class';
import { CatalogV } from '../../class/backend/catalogV.class';
import { BasicDataService } from '../../../../services/basicData/basic-data.service';

@Component({
  selector: 'finish-request-details',
  templateUrl: './finish-request-details.component.html',
  styleUrls: ['./finish-request-details.component.css']
})
export class FinishRequestDetailsComponent implements OnInit {

  @Input() inputRequestInfo:PulseV;
  @Input() jobcatIcon:string;
  @Input() jobcatName:string;
  @Input() imgPath:string;
  @Input() xWindow:number;
  @Output() back = new EventEmitter();

  dropdownSelectedText:string = 'اطلاعات درخواست';
  dropdownTextList:string[] = [];
  blankData:string = "ندارد";
  srcPhotoPopUp:string = '';
  photos:string[] = [];
  offer_workerImage:string = '';
  offer_workerFirstName: string = '';
  offer_workerLastName: string = '';
  offer_workerCode: string = '';
  offer_startWorkYear: string = '';
  offer_workerMobile: string = '';
  stateList: StateV[] = [];

  offer_invoice:InvoiceV = null;
  offer_stars:number[] = [];
  offer_workerScore:number = 0;
  offer_workerDocumentList:DocumentV[] = [];
  offer_workerCatalogList:CatalogV[] = [];

  btn1ShowRequestInfo:boolean = true;
  btn2ShowWorkerInfo:boolean = false;
  btn3ShowHistoryStates:boolean = false;
  btn4ShowInvoice:boolean = false;

  constructor(public basicData: BasicDataService, private customFunction: CustomFunctionsService) { }

  ngOnInit() {

    this.dropdownTextList.push('اطلاعات درخواست');
    
    this.photos = this.inputRequestInfo.request.photos;
    if(this.inputRequestInfo.selectedOffer){
      this.dropdownTextList.push('اطلاعات متخصص');
      this.offer_workerImage = this.inputRequestInfo.selectedOffer.worker.user.personalData.photo;
      this.offer_workerFirstName = this.inputRequestInfo.selectedOffer.worker.user.personalData.firstName;
      this.offer_workerLastName = this.inputRequestInfo.selectedOffer.worker.user.personalData.lastName;
      this.offer_workerCode = this.inputRequestInfo.selectedOffer.worker.code;
      this.offer_startWorkYear = this.inputRequestInfo.selectedOffer.worker.experienceStart;
      this.offer_workerMobile = this.inputRequestInfo.selectedOffer.worker.user.personalData.mobileNumber;
      this.offer_workerScore = this.inputRequestInfo.selectedOffer.worker.score.totalScore;
      this.offer_stars = this.customFunction.makeStarScore(this.offer_workerScore);
      this.offer_workerDocumentList = this.inputRequestInfo.selectedOffer.worker.documents;
      this.offer_workerCatalogList = this.inputRequestInfo.selectedOffer.worker.workStation.catalogs;
    }

    this.dropdownTextList.push('وضعیت های درخواست');

    if(this.inputRequestInfo.finalInvoice){
      this.dropdownTextList.push('فاکتور');
      this.offer_invoice = this.inputRequestInfo.finalInvoice;
    }

    this.stateList = this.inputRequestInfo.stateHistory;
  }

  onPhoto(val:string){
    this.srcPhotoPopUp = this.imgPath + val;
    this.basicData.activeModalPhoto.next(true);
  }

  onBackToAllFinishRequest(){
    this.back.emit(true);
  }

  onTabInPayment(inputVal:number){
    this.btn1ShowRequestInfo = false;
    this.btn2ShowWorkerInfo = false;
    this.btn3ShowHistoryStates = false;
    this.btn4ShowInvoice = false;
    if(inputVal == 1){
      this.btn1ShowRequestInfo = true;
    }
    else if(inputVal == 2){
      this.btn2ShowWorkerInfo = true;
    }
    else if(inputVal == 3){
      this.btn3ShowHistoryStates = true;
    }
    else if(inputVal == 4){
      this.btn4ShowInvoice = true;
    }
  }

  onClickDropDow(){
    this.btn1ShowRequestInfo = false;
    this.btn2ShowWorkerInfo = false;
    this.btn3ShowHistoryStates = false;
    this.btn4ShowInvoice = false;
    if('اطلاعات درخواست' == this.dropdownSelectedText){
      this.btn1ShowRequestInfo = true;
    }
    else if('اطلاعات متخصص' == this.dropdownSelectedText){
      this.btn2ShowWorkerInfo = true;
    }
    else if('وضعیت های درخواست' == this.dropdownSelectedText){
      this.btn3ShowHistoryStates = true;
    }
    else if('فاکتور' == this.dropdownSelectedText){
      this.btn4ShowInvoice = true;
    }
  }

}
