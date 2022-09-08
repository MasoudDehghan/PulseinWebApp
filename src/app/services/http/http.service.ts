import { userCat3CommentDto } from './../../components/class/UserCat3Comment.class';
import { JobCategory1V } from '../../components/class/jobCategory1V.class';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AllServices } from '../../components/class/allServices.class';
import { GetCat1Co } from '../../components/class/getCat1Co.class';
import { GetCat2Co } from '../../components/class/getCat2Co.class';
import { SiteCommentV } from '../../components/class/siteCommentV.class';
import { Message } from '../../components/class/mesage.class';
import { UserIdea } from '../../components/class/userIdea.class';
import { LandingV } from '../../components/class/landing.class';
import { InvitationV } from '../../components/class/invitationV.class';
import { UrlRest } from '../../components/class/urlRest.class';
import { PulseV } from '../../components/webApp/class/backend/pulseV.class';
import { cat3SeoDto } from '../../components/class/Cat3SeoDto.class';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 
  mainPath:string = '';
  serverPath:string = "";
  serverPathRequest:string = "";
  inventionPath:string = "";
  tokenGest:string = "";

  constructor(private http: HttpClient, private urlRest: UrlRest) {
    this.mainPath = urlRest.mainPath;
    this.serverPath = urlRest.serverPath;
    this.serverPathRequest = urlRest.serverPathRequest;
    this.inventionPath = urlRest.inventionPath;
    this.tokenGest = urlRest.tokenGest;
  }

  getUserIdea():Observable<UserIdea[]>{
    let url:string = "assets/data/usersIdea.json";
    return this.http.get<UserIdea[]>(url);
  }

  getCat3():Observable<object>{
    let url:string = "assets/data/jobcat3.json";
    return this.http.get(url);
  }

  getAllJobCat():Observable<JobCategory1V[]>{
    let url:string = this.mainPath + this.serverPath + "getCatList/" + this.tokenGest;
    return this.http.get<JobCategory1V[]>(url);
  }

  getAllServices():Observable<AllServices[]>{
    let url:string = this.mainPath + this.serverPath + "allServices/" + this.tokenGest;
    return this.http.get<AllServices[]>(url, httpOptions);
  }

  getCat1Cat2(cat1Id):Observable<GetCat1Co>{
    let url:string = this.mainPath + this.serverPath + "getCat1Co/"+this.tokenGest+"/"+cat1Id;
    return this.http.get<GetCat1Co>(url, httpOptions);
  }

  getCat2Cat3(cat2Id):Observable<GetCat2Co>{
    let url:string = this.mainPath + this.serverPath + "getCat2Co/"+this.tokenGest+"/"+cat2Id;
    return this.http.get<GetCat2Co>(url, httpOptions);
  }

  /*
  getCat3Page(cat3Ename:string):Observable<Cat3CoV>{
    let url:string = this.mainPath + this.serverPath + "getCat3Co/" + this.tokenGest + "/" + cat3Ename;
    return this.http.get<Cat3CoV>(url, httpOptions);
  } 
  */

  postContactUsForm(objForm:SiteCommentV):Observable<Message>{
    let url:string = this.mainPath + this.serverPath + "sendComment/"+this.tokenGest;
    return this.http.post<Message>(url, objForm, httpOptions);
  }

  getClienMobile(mobileNumber:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPath + "sendDownloadLinkC/"+this.tokenGest+"/"+mobileNumber;
    return this.http.get<Message>(url, httpOptions);
  }

  getExpertMobile(mobileNumber:string):Observable<Message>{
    let url:string = this.mainPath + this.serverPath + "sendDownloadLinkW/"+ this.tokenGest + "/" + mobileNumber;
    return this.http.get<Message>(url, httpOptions);
  }

  getLanding():Observable<LandingV[]>{
    let url:string = this.mainPath + this.serverPath +"getLandingList/"+ this.tokenGest;
    return this.http.get<LandingV[]>(url);
  }

  /*---start Invention---*/
  getPresenterInfo(presenterID:string):Observable<InvitationV>{
    let url:string = this.mainPath + this.inventionPath + "info/" + presenterID;
    return this.http.get<InvitationV>(url);
  }

  postRegisterInveited(info:InvitationV):Observable<Message>{
    let url:string = this.mainPath + this.inventionPath + "register";
    return this.http.post<Message>(url, info, httpOptions);
  }
  /*---end invention---*/

  reserveDiscount(data:PulseV, token:string):Observable<PulseV>{
    let url:string = this.mainPath + this.serverPathRequest + "reserveDiscount/" + token;
    return this.http.post<PulseV>(url, data, httpOptions);
  }

  removeDiscount(data:PulseV, token:string):Observable<PulseV>{
    let url:string = this.mainPath + this.serverPathRequest + "removeDiscount/" + token;
    return this.http.post<PulseV>(url, data, httpOptions);
  }

  getJobCat3ByEnameNew(ename:string, token:string):Observable<cat3SeoDto>{
    let tok:string = '';
    if(!token || token == ''){
      tok = this.tokenGest;
    }
    else{
      tok = token;
    }
    let url:string = this.mainPath + this.serverPath + "getCat3Seo/" + tok + "/" + ename;
    return this.http.get<cat3SeoDto>(url);
  }

  postUserIdea(token:string, data: userCat3CommentDto):Observable<any>{
    let tok:string = '';
    if(!token || token == ''){
      tok = this.tokenGest;
    }
    else{
      tok = token;
    }
    let url:string = this.mainPath + this.serverPath + "addComment/" + tok;
    return this.http.post<Message>(url, data, httpOptions);
  }//end postUserIdea

}

