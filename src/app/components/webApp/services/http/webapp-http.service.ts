import { DiscountCV } from './../../class/backend/discountCV.class';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobCategory1V } from '../../../class/jobCategory1V.class';
import { UserV } from '../../class/backend/userV.class';
import { Message } from '../../../class/mesage.class';
import { UserLoginData } from '../../class/backend/userLoginData.class';
import { CDashboardEV } from '../../class/backend/cDashboardEV.class';
import { ProvinceV } from '../../class/backend/provinceV.class';
import { RequestV } from '../../class/backend/requestV.class';
import { PulseV } from '../../class/backend/pulseV.class';
import { OfferV } from '../../class/backend/offerV.class';
import { PaymentV } from '../../class/backend/paymentV.class';
import { paymentResult } from '../../class/backend/paymentResult.class';
import { CandidateLocationV } from '../../class/backend/candidateLocationV.class';
import { PaymentRequestV } from '../../class/backend/paymentRequestV.class';
import { PaymentRequestDto } from '../../class/backend/paymentRequestDto.class';
import { UserPersonalData } from '../../class/backend/userPersonalData.class';
import { ClientStatData } from '../../class/backend/clientStatData.class';
import { BooleanDataV } from '../../class/backend/booleanDataV.class';
import { Transaction } from '../../class/backend/transaction.class';
import { PreRegisterRequestResult } from '../../class/backend/preRegisterRequestResult.class';
import { UrlRest } from '../../../class/urlRest.class';
import { CheckDiscountRequest } from '../../class/backend/checkDiscountRequest.class';
import { TypeInfo } from '../../class/backend/typeInfo.class';
import { Cat3AnswerV } from '../../class/backend/cat3AnswerV.class';
import { QuestionAnswer } from '../../class/backend/questionAnswer.class';
import { CityV } from '../../class/backend/cityV.class';
import { ActiveLocationsDto } from '../../../class/ActiveLocationsDto.class';
import { ActiveAreasDto } from '../../class/backend/activeAreasDto.class';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class webappHttpService {

  tokenGuest:string = "";
  mainPath:string = '';
  serverPath:string = "";
  serverPathUser:string = "";
  serverPathRequest:string = "";
  serverPathFinancial:string = "";
  serverPathBasicData:string = "";
  serverPathCandidateLocation:string = "";
  serverPathPayment:string = "";
  serverPathStatistic:string = "";
  serverPathWebClient:string = "";

  constructor(private http:HttpClient, private urlRest: UrlRest) {
    this.mainPath = urlRest.mainPath;
    this.tokenGuest = urlRest.tokenGest;
    this.serverPath = urlRest.serverPath;
    this.serverPathUser = urlRest.serverPathUser;
    this.serverPathRequest = urlRest.serverPathRequest;
    this.serverPathFinancial = urlRest.serverPathFinancial;
    this.serverPathBasicData = urlRest.serverPathBasicData;
    this.serverPathCandidateLocation = urlRest.serverPathCandidateLocation;
    this.serverPathPayment = urlRest.serverPathPayment;
    this.serverPathStatistic = urlRest.serverPathStatistic;
    this.serverPathWebClient = urlRest.serverPathWebClient;
  }

  getAllJobCat():Observable<JobCategory1V[]>{
    let url:string = this.mainPath + this.serverPath + "getCatList/" + this.tokenGuest;
    return this.http.get<JobCategory1V[]>(url);
  }

  getUserInfoWithToken(userToken:string):Observable<CDashboardEV>{
    let url:string = this.mainPath + this.serverPathUser + "getMyDashEC/" + userToken;
    return this.http.get<CDashboardEV>(url);
  }

  getAreaByCityID(userToken:string , cityID:number):Observable<ActiveAreasDto>{
    if(userToken == ""){
      userToken = this.tokenGuest;
    }
    let url:string = this.mainPath + this.serverPathRequest + "activeAreas/" + userToken + "/" + cityID;
    return this.http.get<ActiveAreasDto>(url);
  }

  getActiveCities(userToken:string):Observable<CityV[]>{
    if(userToken == ""){
      userToken = this.tokenGuest;
    }
    let url:string = this.mainPath + this.serverPathBasicData + "getActiveCities/" + userToken;
    return this.http.get<CityV[]>(url);
  }

  getSupportedLocations(userToken:string, jobcat3ID:number):Observable<ActiveLocationsDto>{
    if(userToken == ""){
      userToken = this.tokenGuest;
    }
    let url:string = this.mainPath + this.serverPathRequest + "supportedLocations/" + userToken + '/' + jobcat3ID;
    console.log("getSupportedLocations URL: "+ url);
    return this.http.get<ActiveLocationsDto>(url);
  }

/*----start request rest-----*/
  postUserNewRequest(request:RequestV, userToken:string):Observable<PulseV>{
    let url:string = this.mainPath + this.serverPathRequest + "register/" +userToken;
    return this.http.post<PulseV>(url, request, httpOptions);
  }

  /*
  getUserPreRegisterRequest(userToken:string, jobCat3ID:number):Observable<PreRegisterRequestResult>{
    let url:string = this.mainPath + this.serverPathRequest + "preRegister/" + userToken + '/' + jobCat3ID;
    return this.http.get<PreRegisterRequestResult>(url);
  }
  */
 
  getGuestPreRegisterRequest(jobCat3ID:number):Observable<PreRegisterRequestResult>{
    let url:string = this.mainPath + this.serverPathRequest + "preRegister/" + this.tokenGuest + '/' + jobCat3ID;
    return this.http.get<PreRegisterRequestResult>(url);
  }

  getOnProgressRequests(userToken:string):Observable<PulseV[]>{
    let url:string = this.mainPath + this.serverPathRequest + "onProgressList/" + userToken;
    return this.http.get<PulseV[]>(url);
  }

  getLockupByIdRequest(userToken:string, requestID:number):Observable<PulseV>{
    let url:string = this.mainPath + this.serverPathRequest + "id/" + userToken + '/' + requestID;
    return this.http.get<PulseV>(url);
  }

  postCancelRequest(request:RequestV, userToken:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPathRequest + "cancel/" + userToken;
    return this.http.post<Message>(url, request, httpOptions);
  }

  getUserListOfOffers(requestID:number, userToken:string):Observable<OfferV[]>{
    let url:string = this.mainPath + this.serverPathRequest + "suggestionList/" + userToken + '/' + requestID;
    return this.http.get<OfferV[]>(url);
  }

  getUserOfferDetail(offerID:number, userToken:string):Observable<OfferV>{
    let url:string = this.mainPath + this.serverPathRequest + "suggestionDetail/" + userToken + '/' + offerID;
    return this.http.get<OfferV>(url);
  }

  getUserRejectOffer(offerID:number, userToken:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPathRequest + "rejectSuggestion/" + userToken + '/' + offerID;
    return this.http.get<Message>(url);
  }

  getUserRejectOffer2(offerID:number, userToken:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPathRequest + "rejectAndActivateOthers/" + userToken + '/' + offerID;
    return this.http.get<Message>(url);
  }

  getUserAcceptOffer(offerID:number, userToken:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPathRequest + "acceptSuggestion/" + userToken + '/' + offerID;
    return this.http.get<Message>(url);
  }

  getUserRejectInvoice(requestID:number, userToken:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPathRequest + "rejectStart/" + userToken + '/' + requestID;
    return this.http.get<Message>(url);
  }

  getUserAcceptInvoice(requestID:number, userToken:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPathRequest + "acceptStart/" + userToken + '/' + requestID;
    return this.http.get<Message>(url);
  }

  postUserPayment(payment:PaymentV, userToken:string):Observable<paymentResult>{
    let url:string = this.mainPath + this.serverPathRequest + "payment/" + userToken;
    return this.http.post<paymentResult>(url, payment, httpOptions);
  }

  postUserVote(vote:PulseV, userToken:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPathRequest + "finishRequest/" + userToken;
    return this.http.post<Message>(url, vote, httpOptions);
  }
  /*----End request rest-----*/

  /*----start candidate location-----*/
  getCandidateLocations(userToken:string):Observable<CandidateLocationV[]>{
    let url:string = this.mainPath + this.serverPathCandidateLocation + "myLocations/" + userToken;
    console.log("getCandidateLocations URL: "+ url);
    return this.http.get<CandidateLocationV[]>(url);
  }

  postAddCandidateLocation(location:CandidateLocationV, userToken:string):Observable<CandidateLocationV>{
    let url:string = this.mainPath + this.serverPathCandidateLocation + "add/" +userToken;
    return this.http.post<CandidateLocationV>(url, location, httpOptions);
  }

  getDeleteCandidateLocation(userToken:string, locationID:number):Observable<CandidateLocationV[]>{
    let url:string = this.mainPath + this.serverPathCandidateLocation + "delete/" + userToken + "/" + locationID;
    return this.http.get<CandidateLocationV[]>(url);
  }

  postEditCandidateLocation(location:CandidateLocationV, userToken:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPathCandidateLocation + "edit/" +userToken;
    return this.http.post<Message>(url, location, httpOptions);
  }
  /*----end candidate location-----*/

  /*---start payment-----*/
  postUserAddCredit(payment:PaymentRequestV, userToken:string):Observable<PaymentRequestV>{
    let url:string = this.mainPath + this.serverPathPayment + "addCredit/" + userToken;
    return this.http.post<PaymentRequestV>(url, payment, httpOptions);
  }

  
  postUserAddCreditAndPayment(payment:PaymentRequestDto, userToken:string):Observable<PaymentRequestDto>{
    let url:string = this.mainPath + this.serverPathRequest + "addCreditAndPaymentRequest/" + userToken;
    return this.http.post<PaymentRequestDto>(url, payment, httpOptions);
  }
  /*---end payment-----*/


  /*---start Profile---*/
  postEditUserInfo(userInfo:UserPersonalData, userToken:string):Observable<UserPersonalData>{
    let url:string = this.mainPath + this.serverPathUser + "editc/" + userToken;
    return this.http.post<UserPersonalData>(url, userInfo, httpOptions);
  }
  /*---end Profile---*/
  

  /*----start Statistics-----*/
  getUserStatistics(timePeriodId:number, userToken:string):Observable<ClientStatData>{
    let url:string = this.mainPath + this.serverPathStatistic + "clientStat/" + userToken + "/" + timePeriodId;
    return this.http.get<ClientStatData>(url);
  }
  /*----end Statistics-----*/

  /*----start LogOut-----*/
  getUserLogout(userToken:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPathUser + "logout/" + userToken;
    return this.http.get<Message>(url);
  }
  /*----start LogOut-----*/

  getFinishedRequests(userToken:string):Observable<PulseV[]>{
    let url:string = this.mainPath + this.serverPathRequest + "myFinishedList/" + userToken;
    return this.http.get<PulseV[]>(url);
  }

  getCheckOtherSuggestionsValid(suggestionID:number, userToken:string):Observable<BooleanDataV>{
    let url:string = this.mainPath + this.serverPathRequest + "otherSuggestionValid/" + userToken + '/' + suggestionID;
    return this.http.get<BooleanDataV>(url);
  }

  getTransactionsList(timePeriod:number, userToken:string):Observable<Transaction[]>{
    //timePeriod => (1:one weak, 2:one month, 3:three month, 4:six month, 5:one year)
    let url:string = this.mainPath + this.serverPathFinancial + "myTransactions/" + userToken + '/' + timePeriod;
    return this.http.get<Transaction[]>(url);
  }

  getGuestInfo():Observable<CDashboardEV>{
    let url:string = this.mainPath + this.serverPathWebClient + "guestDashboard/" + this.tokenGuest;
    return this.http.get<CDashboardEV>(url);
  }

  checkDiscount(data:CheckDiscountRequest, token:string):Observable<DiscountCV>{
    let url:string = this.mainPath + this.serverPathRequest + "checkDiscount/" + token;
    return this.http.post<DiscountCV>(url, data, httpOptions);
  }

  getCancelCauseList(token:string):Observable<TypeInfo[]>{
    let url:string = this.mainPath + this.serverPathBasicData + "getCCTList/" + token;
    return this.http.get<TypeInfo[]>(url);
  }

  postConvertAnswers(data:Cat3AnswerV, token:string):Observable<QuestionAnswer[]>{
    if(!token){
      token = this.tokenGuest;
    }
    let url:string = this.mainPath + this.serverPathRequest + "convertAnswer/" + token;
    return this.http.post<QuestionAnswer[]>(url, data, httpOptions);
  }

  getCountClickDiscount(cat3ID:number, siteName:string):Observable<any>{
    let url:string = this.mainPath + "taftan/rest/website/landingCnt/" + this.tokenGuest + "/" + cat3ID + "/" + siteName;
    return this.http.get<any>(url);
  }

}
