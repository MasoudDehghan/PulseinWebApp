import { StorageService } from '../../../../../services/storage/storage.service';
import { PulseV } from '../../../class/backend/pulseV.class';
import { webappHttpService } from '../../../services/http/webapp-http.service';
import { SharedService } from '../../../../../services/shared/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnumUrls } from '../../../enum/enumUrls.enum';
import { Vote } from '../../../class/vote.class';
import { RequestScoreV } from '../../../class/backend/requestScoreV.class';
import { RequestV } from '../../../class/backend/requestV.class';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  token: string = '';
  activeRequest: PulseV = null;
  requestID: number = 0;
  isLoading:boolean = true;

  votePrice:number = 3;
  voteTiming:number = 3;
  voteQuality:number = 3;
  listVote:Vote[]=[
    { imageDefault:"assets/webappPics/vote/marvelDef.png", imageSelect:"assets/webappPics/vote/marvel.png", text:"عالی", color:"#039BE5" },
    { imageDefault:"assets/webappPics/vote/goodDef.png", imageSelect:"assets/webappPics/vote/good.png", text:"خوب", color:"#039BE5" },
    { imageDefault:"assets/webappPics/vote/averageDef.png", imageSelect:"assets/webappPics/vote/average.png", text:"متوسط", color:"#039BE5" },
    { imageDefault:"assets/webappPics/vote/badDef.png", imageSelect:"assets/webappPics/vote/bad.png", text:"بد", color:"#039BE5" },
    { imageDefault:"assets/webappPics/vote/verybadDef.png", imageSelect:"assets/webappPics/vote/verybad.png", text:"خیلی بد", color:"#039BE5" }
  ];

  constructor(private router: Router, 
    private storage: StorageService,
    public shared: SharedService,
    private webappHttp: webappHttpService) { }

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
          console.log("in survey page mode 1");
          console.log(this.activeRequest);
          this.shared.stateNameRequest.next(this.activeRequest.state.name);
          this.shared.stateIdRequest.next(this.activeRequest.state.id);
          this.isLoading = false;
          //this.setValues(this.activeRequest);
          this.shared.routingByStateRequest(this.activeRequest.state.id);
        }
        else{
          //---request list is empty
          console.log("in page survey");
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
      this.isLoading = false;
      console.log("in survey page mode 2");
      console.log(this.activeRequest);
      //this.setValues(this.activeRequest);
      this.shared.routingByStateRequest(this.activeRequest.state.id);
    }
  }//end ngOnInit

  onVote(){
    let score:RequestScoreV={
      priceScore: this.votePrice,
	    satisfactionScore: this.voteQuality,
	    timeScore: this.voteTiming
    };

    let requestData:RequestV ={
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

    let vote: PulseV={
      request:requestData,
	    state:null,
	    stateHistory:null,
	    offers:null,
	    initialOffer:null,
	    selectedOffer:null,
	    proformaInvoice:null,
	    finalInvoice:null,
	    score:score,
	    summary:null,
	    transactions:null,
	    workingStartTime:null,
	    workingEndTime:null,
      discountInfo:null, 
      cashEnable:null,
      reservedDiscount:null,
	    paymentInfo:null
    };

    this.webappHttp.postUserVote(vote, this.token).subscribe(res => {
      if(res.code == 0){
        this.storage.clearWorkerMsg();
        this.shared.hasActiveRequest.next(false);
        this.storage.userDataLogin.inProgressRequests = [];
        this.storage.subject_userDataLogin.next(this.storage.userDataLogin);
        this.shared.showModalFolloweRequest.next(false);
        this.shared.firstTimeShowModalFolloweRequest.next(false);
        this.router.navigate([EnumUrls.address_home]);
      }
    }, error => {});
  }

  vote(key:string, cost:number){
    if(key == 'price'){
      this.votePrice = cost;
    }
    else if(key == 'quality'){
      this.voteQuality = cost;
    }
    else if(key == 'timing'){
      this.voteTiming = cost;
    }
  }

}
