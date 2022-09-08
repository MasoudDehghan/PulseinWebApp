import { AreaV } from './../../class/backend/areaV.class';
import { webappConstValue } from './../../class/webappConstVal';
import { Router } from '@angular/router';
import { SharedService } from './../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { CityV } from '../../class/backend/cityV.class';
import { CandidateLocationV } from '../../class/backend/candidateLocationV.class';
import { webappHttpService } from '../../services/http/webapp-http.service';

@Component({
  selector: 'app-candidate-location-edit',
  templateUrl: './candidate-location-edit.component.html',
  styleUrls: ['./candidate-location-edit.component.css']
})
export class CandidateLocationEditComponent implements OnInit {

  isLoading:boolean = true;
  cityList:CityV[] = [];
  city:string = '';
  cityID:number;
  isCityFocus:boolean = false;
  locationName:string = '';
  lat:number;
  lng:number;
  latCenter:number;
  lngCenter:number;
  areaID:number;
  areaName:string;
  areaList:AreaV[] = [];
  searchAreaList:AreaV[] = [];
  isAreaFocus:boolean = false;
  locationAddress:string = '';
  setLocationName:boolean = true;
  setLocationAddress:boolean = true;
  userToken:string = '';

  constructor(public shared: SharedService, 
    private httpWebApp: webappHttpService,
    private router:Router,
    public constVal:webappConstValue,) { }

  ngOnInit() {
    if(this.shared.candidateLocationEditInfo && this.shared.cityListInEditCandidateLocation){
      this.userToken = localStorage.getItem("userToken");
      this.cityList = this.shared.cityListInEditCandidateLocation;
      this.lat = this.shared.candidateLocationEditInfo.lat;
      this.lng = this.shared.candidateLocationEditInfo.longg;
      this.latCenter = this.lat;
      this.lngCenter = this.lng;
      this.locationName = this.shared.candidateLocationEditInfo.title;
      this.areaID = this.shared.candidateLocationEditInfo.areaId;
      this.locationAddress = this.shared.candidateLocationEditInfo.address;
      this.cityList.forEach(cityItem => {
        cityItem.regions.forEach(regItem =>{
          regItem.areas.forEach(areaItem =>{
            if(areaItem.id == this.areaID){
              this.cityID = cityItem.id;
              this.city = cityItem.name;
              this.areaName = areaItem.name;
              //this.searchAreaList = regItem.areas;
              this.areaList = regItem.areas;
            }
          });
        });
      });
      this.isLoading = false;
    }
    else{
      this.shared.candidateLocationEditInfo = null;
      this.shared.cityListInEditCandidateLocation = null;
      this.router.navigate(["/webApp/candidateLocations"]);
    }
  }//end ngOnInit

  onLocationName(val:string){
    val = val.trim();
    if(val.length >= this.constVal.minCandidateLocationName){
      this.setLocationName = true;
      this.locationName = val;
    }
    else{
     this.setLocationName = false;
    }
  }//end onLocationName

  onLocationAddress(val:string){
    val = val.trim();
    if(val.length >= this.constVal.minAddresDetails){
      this.setLocationAddress = true;
      this.locationAddress = val;
    }
    else{
      this.setLocationAddress = false;
    }
  }//end onLocationAddress

  onCityClick(citySelected:CityV){
    this.city = citySelected.name;
    this.cityID = citySelected.id;
    this.latCenter = citySelected.centerLat;
    this.lngCenter = citySelected.centerLong;
    this.lat = this.latCenter;
    this.lng = this.lngCenter;
    this.areaList = [];
    this.searchAreaList = [];
    this.areaName = '';
    this.areaID = 0;
    citySelected.regions.forEach(eleman =>{
      eleman.areas.forEach(areaItem =>{
        this.areaList.push(areaItem);
        this.searchAreaList.push(areaItem);
      });
    });
  }//end onCityClick

  onCityFocus(){
    this.isCityFocus = true;
  }//end onCityFocus

  onCityBlur(){
    setTimeout(()=>{
      this.isCityFocus = false;
    },200);
  }//end onCityBlur

  onAreaSearch(val: string) {
    this.searchAreaList = [];
    this.areaList = [];
    let inputAreaName: string = val.trim();
    if (inputAreaName.length > 0) {
      this.cityList.forEach(cityItem => {
        if(cityItem.id == this.cityID){
          cityItem.regions.forEach(regItem => {
            regItem.areas.forEach(areaItem => {
              if (areaItem.name.indexOf(inputAreaName) != -1) {
                this.areaList.push(areaItem);
                this.searchAreaList.push(areaItem);
              }
            });
          });
        }
      });
    }
  }//end onAreaSearch

  onAreaFocus() {
    //this.toastr.clear()
    this.isAreaFocus = true;
  }//end onAreaFocus

  onAreaBlur(){
    setTimeout(()=>{
      this.isAreaFocus = false;
    },200);
    if (this.searchAreaList.length > 0){
      this.areaName = this.searchAreaList[0].name;
      this.areaID = this.searchAreaList[0].id;
      this.latCenter = this.searchAreaList[0].centerLat;
      this.lngCenter =this.searchAreaList[0].centerLong;
      this.lat = this.latCenter;
      this.lng = this.lngCenter;
    }
    else if (this.areaList.length > 0 && this.areaName == ''){
      this.areaName = this.areaList[0].name;
      this.areaID = this.areaList[0].id;
      this.latCenter = this.areaList[0].centerLat;
      this.lngCenter = this.areaList[0].centerLong;
      this.lat = this.latCenter;
      this.lng = this.lngCenter;
    }
    if (this.areaList.length == 0 && this.areaName != ''){
      this.areaName = '';
      this.areaID = 0;
    }
  }//end onAreaBlur

  onAreaClick(areaSelected:AreaV) {
    //this.toastr.clear();
    this.areaName = areaSelected.name;
    this.areaID = areaSelected.id
    this.latCenter = areaSelected.centerLat;
    this.lngCenter = areaSelected.centerLong;
    this.lat = this.latCenter;
    this.lng = this.lngCenter;
    this.searchAreaList = [];
  }//end onAreaClick

  checkEnableButtonSaveLocation():boolean{
    if(this.areaID > 0 && 
      this.setLocationAddress && 
      this.setLocationName){
      return false;
    }
    else{
     return true;
    } 
  }//end checkEnableButtonSaveLocation


  onSaveEditCandidateLocation(){
    let location:CandidateLocationV = {
      id:this.shared.candidateLocationEditInfo.id,
      title:this.locationName,
      areaId:this.areaID,
      address:this.locationAddress,
      lat:this.latCenter,
      longg:this.lngCenter,
      postalCode:null
    }
  
    this.httpWebApp.postEditCandidateLocation(location, this.userToken).subscribe(res => {
       if(res.code == 0){
         this.router.navigate(['/webApp/candidateLocations']);
       }
     }, error =>{});
   }//end onSaveEditCandidateLocation

   agmCenterChange(event){
    this.latCenter = event.lat;
    this.lngCenter = event.lng;
  }//end cagmCterChang

}
