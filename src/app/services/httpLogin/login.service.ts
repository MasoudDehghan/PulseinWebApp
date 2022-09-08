import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlRest } from '../../components/class/urlRest.class';
import { Observable } from 'rxjs';
import { UserPersonalData } from '../../components/webApp/class/backend/userPersonalData.class';
import { CDashboardEV } from '../../components/webApp/class/backend/cDashboardEV.class';
import { ClientLoginData } from '../../components/webApp/class/backend/clientLoginData.class';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  mainPath:string = '';
  serverPathWebClient:string = "";

  constructor(private http: HttpClient, 
    private urlRest: UrlRest) {
    this.mainPath = urlRest.mainPath;
    this.serverPathWebClient = urlRest.serverPathWebClient;
  }

  getLoginWithRequest(mobileNumber:string):Observable<UserPersonalData>{
    let url:string = this.mainPath + this.serverPathWebClient + "loginRequest/" + mobileNumber;
    return this.http.get<UserPersonalData>(url);
  }

  getCompleteLoginWithRequest(loginInfo:ClientLoginData):Observable<CDashboardEV>{
    let url:string = this.mainPath + this.serverPathWebClient + "loginComplete";
    return this.http.post<CDashboardEV>(url, loginInfo, httpOptions);
  }

}
