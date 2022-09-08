import { UrlRest } from '../../../../class/urlRest.class';
import { CustomFunctionsService } from '../../../../../services/functions/custom-functions.service';
import { Router } from '@angular/router';
import { PulseV } from '../../../class/backend/pulseV.class';
import { Component, OnInit } from '@angular/core';
import { EnumUrls } from '../../../enum/enumUrls.enum';

@Component({
  selector: 'app-details-request',
  templateUrl: './details-request.component.html',
  styleUrls: ['./details-request.component.css']
})
export class DetailsRequestComponent implements OnInit {

  isLoading:boolean = true;
  imgPath:string = '';
  requestInfo:PulseV = null;
  requestInfoList:string[] = [];
  isEmergency:boolean = false;
  emergencyText:string = "در کوتاه ترین زمان ممکن انجام شود";
  requestStartTimeSplit:string[] = [];
  requestEndTimeSplit:string[] = [];
  requestStartDateSplit:string[] = [];
  fa_mounth:string = '';
  fa_day:string = "";
  fa_year:string = "";
  startTime:string = "";
  endTime:string = "";
  requestImgeList:string[] = [];
  addressText:string = "";

  constructor(private router: Router, 
    public customFunction: CustomFunctionsService,
    private urlRest:UrlRest) { }

  ngOnInit() {
    this.imgPath = this.urlRest.imagePath;
    if(sessionStorage.getItem("requestInfo")){
      this.requestInfo = JSON.parse(sessionStorage.getItem("requestInfo"));
      this.requestInfoList = this.requestInfo.request.info.split('\n');
      this.isEmergency = this.requestInfo.request.timeData.emergency;
      if(!this.isEmergency){
        this.requestStartTimeSplit = this.requestInfo.request.timeData.startTime.split(" ");
        this.requestEndTimeSplit = this.requestInfo.request.timeData.endTime.split(" ");
        this.requestStartDateSplit = this.requestStartTimeSplit[0].split("-");
        this.fa_mounth = this.customFunction.farsiStringMonth(this.requestStartDateSplit[1]);
        this.fa_year = this.customFunction.chanageNumbersToFarsi(this.requestStartDateSplit[0]);
        this.fa_day = this.customFunction.chanageNumbersToFarsi(this.requestStartDateSplit[2]);
        this.startTime = this.requestStartTimeSplit[1];
        this.endTime = this.requestEndTimeSplit[1];
        if(this.requestInfo.request.photos){
          if(this.requestInfo.request.photos.length > 0){
            this.requestImgeList = this.requestInfo.request.photos;
          }
        }
        this.addressText = this.requestInfo.request.geoData.address;
      }
      this.isLoading = false;
    }
    else{
      this.router.navigate([EnumUrls.address_home]);
    }
  }//end ngOnInit

}
