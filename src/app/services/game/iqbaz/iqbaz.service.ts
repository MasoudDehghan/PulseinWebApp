import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlRest } from '../../../components/class/urlRest.class';
import { Observable } from 'rxjs';
import { FestivalQuestion } from '../../../components/class/game/iqBaz/festivalQuestion.class';
import { FestivalResult } from '../../../components/class/game/iqBaz/festivalResult.class';
import { FestivalAnswer } from '../../../components/class/game/iqBaz/festivalAnswer.class';
import { FestivalLevelBonus } from '../../../components/class/game/iqBaz/festivalLevelBonus.class';
import { FestivalReport } from '../../../components/class/game/iqBaz/festivalReport.class';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class IqbazService {

  mainPath:string = '';
  tokenGuest:string = '';
  rootPath:string = 'taftan/rest/festival/';

  constructor(private http: HttpClient, private urlRest: UrlRest) {
    this.mainPath = urlRest.mainPath;
    this.tokenGuest = urlRest.tokenGest; 
  } 

  loginForGame(token:string, referalID:string):Observable<FestivalResult>{
    let url:string = this.mainPath + this.rootPath + "login/" + token + "/" + referalID;
    return this.http.get<FestivalResult>(url);
  }

  getNextQuestion(token:string):Observable<FestivalQuestion>{
    let url:string = this.mainPath + this.rootPath + "next/" + token;
    return this.http.get<FestivalQuestion>(url);
  }

  postAnswer(answer:FestivalAnswer, token:string):Observable<FestivalResult>{
    let url:string = this.mainPath + this.rootPath + "answer/" + token;
    return this.http.post<FestivalResult>(url, answer, httpOptions);
  }

  getLevelBonus(token:string):Observable<FestivalLevelBonus[]>{
    let url:string = this.mainPath + this.rootPath + "myBonus/" + token;
    return this.http.get<FestivalLevelBonus[]>(url);
  }

  getReportGuest():Observable<FestivalReport>{
    let url:string = this.mainPath + this.rootPath + "report/" + this.tokenGuest;
    return this.http.get<FestivalReport>(url);
  }

  getReportAll(token:string):Observable<FestivalReport>{
    let url:string = this.mainPath + this.rootPath + "report/" + token;
    return this.http.get<FestivalReport>(url);
  }

  getReadLink(token:string):Observable<any>{
    let url:string = this.mainPath + this.rootPath + "readLink/" + token;
    return this.http.get<any>(url);
  }

  getGiftsCode(token:string):Observable<string[]>{
    let url:string = this.mainPath + this.rootPath + "myCodes/" + token;
    return this.http.get<string[]>(url);
  }

}
