import { TypeInfo } from './../../../class/backend/typeInfo.class';
import { CandidateLocationV } from './../../../class/backend/candidateLocationV.class';
import { AreaV } from './../../../class/backend/areaV.class';
import { webappHttpService } from './../../../services/http/webapp-http.service';
import { LocationStrategy } from '@angular/common';
import { UrlRest } from './../../../../class/urlRest.class';
import { SharedService } from './../../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumUrls } from '../../../enum/enumUrls.enum';

@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.css']
})
export class AddressMapComponent implements OnInit {

  jobcat3Name: string = '';
  jobcat3EName: string = '';
  jobcat3Icon: string = '';
  userToken:string = null;
  isCityLoading:boolean = true;
  latCenter:number = 0;
  lngCenter: number = 0;
  areaList:AreaV[] = [];
  candidateLocationList:CandidateLocationV[] = [];
  isMarkerMapMoved:boolean = false;

  constructor(public shared: SharedService,
    private urlRest: UrlRest,
    private location: LocationStrategy,
    private webappHttp: webappHttpService,
    private router: Router) { }

  ngOnInit() {

    this.userToken = localStorage.getItem("userToken");
    let token:string = '';
    if(this.userToken){
      token = this.userToken;
    }
    if(!this.shared.citySelected){
      //console.log("city is null...");
      let defualtCity:TypeInfo = {
        id: 320,
        name: "تهران"
      }
      this.shared.citySelected = defualtCity;
    }
    if(this.shared.reqRej_preRegister && this.shared.reqRej_jobcat3Select){
      this.jobcat3Icon = this.urlRest.imagePath + this.shared.reqRej_jobcat3Select.icon;
      this.jobcat3Name = this.shared.reqRej_jobcat3Select.name;
      this.jobcat3EName = this.shared.reqRej_jobcat3Select.ename;
      this.webappHttp.getAreaByCityID(token , this.shared.citySelected.id).subscribe(res => {
        this.isCityLoading = false;
        this.areaList = res.areaList;
        this.candidateLocationList = res.locations;
        if(this.shared.selectedArea.value){
          this.shared.reqReg_lat = this.shared.selectedArea.value.centerLat;
          this.shared.reqReg_lng = this.shared.selectedArea.value.centerLong;
          this.latCenter = this.shared.selectedArea.value.centerLat;
          this.lngCenter = this.shared.selectedArea.value.centerLong;
          this.isMarkerMapMoved = true;
          console.log("1:selectedArea Has value");
        }
        else if(this.shared.selectedLocation.value){
          this.shared.reqReg_lat = this.shared.selectedLocation.value.lat;
          this.shared.reqReg_lng = this.shared.selectedLocation.value.longg;
          this.latCenter = this.shared.selectedLocation.value.lat;
          this.lngCenter = this.shared.selectedLocation.value.longg;
          this.isMarkerMapMoved = true;
          console.log("2:selectedLocation has value");
        }
        else{
          this.shared.reqReg_lat = this.areaList[0].centerLat;
          this.shared.reqReg_lng = this.areaList[0].centerLong;
          this.latCenter = this.areaList[0].centerLat;
          this.lngCenter = this.areaList[0].centerLong;
          this.isMarkerMapMoved = false;
          console.log("3:location defualt");
        }
      });
    }
    else{
      this.router.navigate([EnumUrls.address_home]);
    }

    this.shared.selectedArea.subscribe(res =>{
      if(res){
        this.shared.reqReg_lat = res.centerLat;
        this.shared.reqReg_lng = res.centerLong;
        this.latCenter = res.centerLat;
        this.lngCenter = res.centerLong;
        this.shared.selectedLocation.next(null);
        this.shared.address = null;
        this.isMarkerMapMoved = true;
        console.log("4:selected area subscribe");
      }
    });

    this.shared.selectedLocation.subscribe(res => {
      if(res){
        this.shared.reqReg_lat = res.lat;
        this.shared.reqReg_lng = res.longg;
        this.latCenter = res.lat;
        this.lngCenter = res.longg;
        this.shared.address = null;
        this.isMarkerMapMoved = true;
        console.log("5:selected location subscribe");
      }
    });

  }//end ngOnInit

  
  agmCenterChange(event:any){
    this.latCenter = event.lat;
    this.lngCenter = event.lng;
    if((this.areaList[0].centerLat != this.latCenter || this.areaList[0].centerLong != this.lngCenter) && !this.isMarkerMapMoved){
      this.isMarkerMapMoved = true;
      console.log("6:agm Center Change");
    }
  }//end cagmCterChang

  onBack() {
    this.location.back();
  }//end onBack

  onNext(){
    if(this.isMarkerMapMoved){
      this.shared.reqReg_lat = this.latCenter;
      this.shared.reqReg_lng = this.lngCenter;
      this.router.navigate([EnumUrls.requestRegister_address]);
    }
  }//end onNext

  onSelectArea(){
    this.shared.showModalSelectArea.next(true);
  }

  onCandidateLocation(){
    this.shared.showModalCandidateLocation.next(true);
  }//end onMobileCandidateLocation

}
