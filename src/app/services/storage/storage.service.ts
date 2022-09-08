import { Router } from '@angular/router';
import { webappHttpService } from '../../components/webApp/services/http/webapp-http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProvinceV } from '../../components/webApp/class/backend/provinceV.class';
import { AreaV } from '../../components/webApp/class/backend/areaV.class';
import { CDashboardEV } from '../../components/webApp/class/backend/cDashboardEV.class';
import { CandidateLocationV } from '../../components/webApp/class/backend/candidateLocationV.class';
import { MsgWorker } from '../../components/webApp/class/msgWorker.class';
import { PulseV } from '../../components/webApp/class/backend/pulseV.class';
import { EnumUrls } from '../../components/webApp/enum/enumUrls.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  deviceType:number;// 0:PC - 1:Android Web - 2:IOS Web
  osDevice:string;
  isLogin:BehaviorSubject<boolean> = new BehaviorSubject(false);
  showModalLogin:BehaviorSubject<boolean> = new BehaviorSubject(false);
  showModalUserMenu:BehaviorSubject<boolean> = new BehaviorSubject(false);
  showModalSearch:BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoginWithRequest:BehaviorSubject<boolean> = new BehaviorSubject(false);
  userDataLogin: CDashboardEV = null;
  subject_userDataLogin: BehaviorSubject<CDashboardEV> = new BehaviorSubject(null);
  pages:string[] = [];
  listMsgRsvWorker: MsgWorker [] = [];
  currentRequestInfo: BehaviorSubject<PulseV> = new BehaviorSubject(null);
  userCredit: BehaviorSubject<number> = new BehaviorSubject(-1);
  token: BehaviorSubject<string> = new  BehaviorSubject('');
  rsvMsgFromWorker: BehaviorSubject<string> = new BehaviorSubject('');
  selectedAreaID: number = 0;
  isclearAreaName: BehaviorSubject<boolean> = new BehaviorSubject(false);
  candidateLocationList: CandidateLocationV[] = null;

  constructor(private httpService: webappHttpService,
    private router: Router) { }

  userLogOut(){
    this.showModalLogin.next(false);
    localStorage.removeItem("userToken");
    localStorage.removeItem("pulsInfo");
    sessionStorage.clear();
    this.userDataLogin = null;
    this.isLogin.next(false);
    this.token.next('');
    this.candidateLocationList = null;
    this.selectedAreaID = 0;
    this.httpService.getGuestInfo().subscribe(res => {
      this.userDataLogin = res;
      this.subject_userDataLogin.next(res);
      this.userCredit.next(0);
      this.router.navigate([EnumUrls.address_home]);
    }); 
  }

  clearWorkerMsg(){
    this.listMsgRsvWorker = [];  
    localStorage.removeItem("workerMsg");
  }

}
