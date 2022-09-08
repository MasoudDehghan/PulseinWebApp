import { JobCategory3V } from '../../../class/jobCategory3V.class';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { PulseV } from '../../class/backend/pulseV.class';
import { webappHttpService } from '../../services/http/webapp-http.service';
import { BasicDataService } from '../../../../services/basicData/basic-data.service';
import { UrlRest } from '../../../class/urlRest.class';
import { SharedService } from '../../../../services/shared/shared.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-finished-requests',
  templateUrl: './finished-requests.component.html',
  styleUrls: ['./finished-requests.component.css']
})
export class FinishedRequestsComponent implements OnInit {

  display:boolean = false;
  userToken:string = '';
  jobCat3List:Array<JobCategory3V[]> = [];
  listRequests:PulseV[] = [];
  requestInfo:PulseV = null;
  jobcatIcon:string = '';
  jobcatName:string = '';
  mapJobcat3Name:Map<number,string> = new Map<number,string>();
  mapJobcat3Icon:Map<number,string> = new Map<number,string>();
  showAllRequest:boolean = true;

  constructor(private httpService: webappHttpService,
    public shared: SharedService,
    public urlRest: UrlRest,
    public basicData: BasicDataService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    
    this.userToken = localStorage.getItem("userToken");
    this.jobCat3List = this.basicData.categories3;

    this.jobCat3List.forEach(item =>{
      item.forEach(eleman =>{
        this.mapJobcat3Name.set(eleman.id,eleman.name);
        this.mapJobcat3Icon.set(eleman.id,eleman.icon);
      });
    });

    this.getFinishedRequests(this.userToken);
  }


  getFinishedRequests(token:string){
    this.httpService.getFinishedRequests(token).subscribe(res => {
      this.listRequests = res;
      this.display = true;
    }, error =>{});
  }

  timeRegister(val:string){
    let arrayStr = val.split(" ");
    return arrayStr[1];
  }

  dateRegister(val:string){
    let arrayStr = val.split(" ");
    return arrayStr[0];
  }

  onDetails(requestItem:PulseV){
    this.requestInfo = requestItem;
    this.jobcatIcon = this.mapJobcat3Icon.get(requestItem.request.cat3Id);
    this.jobcatName = this.mapJobcat3Name.get(requestItem.request.cat3Id);
    this.showAllRequest = false;
  }

}
