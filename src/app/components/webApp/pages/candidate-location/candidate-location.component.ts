import { Router } from '@angular/router';
import { CityV } from './../../class/backend/cityV.class';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CandidateLocationV } from '../../class/backend/candidateLocationV.class';
import { webappHttpService } from '../../services/http/webapp-http.service';
import { BasicDataService } from '../../../../../../src/app/services/basicData/basic-data.service';
import { SharedService } from '../../../../../../src/app/services/shared/shared.service';
import { StorageService } from '../../../../../../src/app/services/storage/storage.service';
import { webappConstValue } from '../../class/webappConstVal';
import { isPlatformBrowser } from '@angular/common';
import { AreaV } from '../../class/backend/areaV.class';


@Component({
  selector: 'app-candidate-location',
  templateUrl: './candidate-location.component.html',
  styleUrls: ['./candidate-location.component.css']
})
export class CandidateLocationComponent implements OnInit {

  isLoading:boolean = true;
  emptyArea:number = 0;
  userToken:string = '';
  lat:number = 35.706742;
  lng: number = 51.370762;
  latCenter:number = 35.706742;
  lngCenter: number = 51.370762;
  newLocationName: string = '';
  newLocationAddress: string = '';
  setNewLocationName:boolean = false;
  setNewLocationAddress:boolean = false;
  setNewLocationMapLat:boolean = true;
  setNewLocationMapLng:boolean = true;
  modalAddBoxSizeX:string = '';
  modalAddBoxSizey:string ='';
  modalAddBoxPositionTop:string='';
  modalAddBoxPositionRight:string='';
  candidateLocationList:CandidateLocationV[] = [];
  hasCandidateLocation:boolean = true;
  msgNoCandidateLocation:string = "مکان منتخبی ثبت نکرده اید";

  isShowDeleteModal:boolean = false;
  modalDeleteBoxSizeX:string = '';
  modalDeleteBoxSizey:string ='';
  modalDeleteBoxPositionTop:string='';
  modalDeleteBoxPositionRight:string='';
  deleteCandidateLocationName:string = '';
  deleteCandidateLocationID:number = 0;
  questionDeleteCandidateLocation:string = 'آیا قصد حذف مکان منتخب را دارید؟';

  cityList:CityV[] = [];
  city:string = '';
  cityID:number;
  areaName:string = '';
  areaList:AreaV[] = [];
  searchAreaList:AreaV[] = [];
  isCityFocus:boolean = false;
  isAreaFocus:boolean = false;
  areaID:number = 0;
  inputAreaName:string = '';

  constructor(private httpWebApp: webappHttpService,
    public basicData: BasicDataService,
    public constVal:webappConstValue,
    public shared: SharedService,
    private storage:StorageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.userToken = localStorage.getItem("userToken");
    this.setPositionModalAddCandidateLocation();
    this.setPositionModalDeleteCandidateLocation();


    this.cityList = JSON.parse(sessionStorage.getItem('cities'));

    if(this.cityList == null || this.cityList == undefined || !this.cityList){

      this.httpWebApp.getActiveCities(this.userToken).subscribe(res => {
        this.cityList = res;
        sessionStorage.setItem('cities', JSON.stringify(this.cityList));
        this.httpWebApp.getCandidateLocations(this.userToken).subscribe(res => {
          this.candidateLocationList = res;
          this.isLoading = false;
        });
      });
    }
    else{
      this.httpWebApp.getCandidateLocations(this.userToken).subscribe(res => {
        this.candidateLocationList = res;
        this.isLoading = false;
      });
    } 
  }//end ngOnInit

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setPositionModalAddCandidateLocation();
    this.setPositionModalDeleteCandidateLocation();
  }

  setPositionModalAddCandidateLocation(){
    if(this.shared.xWindow.value > 500){
      this.modalAddBoxSizeX = '500px';
      this.modalAddBoxPositionRight = ((this.shared.xWindow.value / 2) - (500 / 2))+'px';
    }
    else{
      this.modalAddBoxSizeX = this.shared.xWindow.value+'px';
      this.modalAddBoxPositionRight = '0px';
    }
    if(this.shared.yWindow.value > 520){
      this.modalAddBoxSizey = '520px';
      this.modalAddBoxPositionTop = ((this.shared.yWindow.value / 2) - (520 / 2))+'px';
    }
    else{
      this.modalAddBoxSizey = '520px';
      this.modalAddBoxPositionTop = '0px';
    }
  }

  setPositionModalDeleteCandidateLocation(){
    if(this.shared.xWindow.value > 500){
      this.modalDeleteBoxSizeX = '500px';
      this.modalDeleteBoxPositionRight = ((this.shared.xWindow.value / 2) - (500 / 2))+'px';
    }
    else{
      this.modalDeleteBoxSizeX = this.shared.xWindow.value+'px';
      this.modalDeleteBoxPositionRight = '0px';
    }
    if(this.shared.yWindow.value > 200){
      this.modalDeleteBoxSizey = '200px';
      this.modalDeleteBoxPositionTop = ((this.shared.yWindow.value / 2) - (200 / 2))+'px';
    }
    else{
      this.modalDeleteBoxSizey = '200px';
      this.modalDeleteBoxPositionTop = '0px';
    }
  }

  showModalStyle(val:number){
    //modal for Insert new Location
    if(val == 1){
     let style = {
       'top': this.modalAddBoxPositionTop,
       'right': this.modalAddBoxPositionRight,
       'width': this.modalAddBoxSizeX,
       'height': this.modalAddBoxSizey
     }
     return style;
    }
 
    //modal for delete location
    if(val == 2){
     let style = {
       'top': this.modalDeleteBoxPositionTop,
       'right': this.modalDeleteBoxPositionRight,
       'width': this.modalDeleteBoxSizeX,
       'height': this.modalDeleteBoxSizey
     }
     return style;
    }
    
  }

  onCloseModalCandidateLocation(){
    this.newLocationAddress = '';
    this.newLocationName = '';
    this.lngCenter = 51.370762;
    this.latCenter = 35.706742;
    this.areaID = 0;
  }
 
  onNewLocationName(val:string){
    val = val.trim();
    if(val.length >= this.constVal.minCandidateLocationName){
      this.setNewLocationName = true;
      this.newLocationName = val;
    }
    else{
     this.setNewLocationName = false;
    }
  }
 
  onNewLocationAddress(val:string){
    val = val.trim();
    if(val.length >= this.constVal.minAddresDetails){
      this.setNewLocationAddress = true;
      this.newLocationAddress = val;
    }
    else{
      this.setNewLocationAddress = false;
    }
  }
 
  hideModalStyle(){
   let style = {
     'top': '0px',
     'right': '0px',
     'width': '0px',
     'height': '0px'
   }
   return style;
  }
 
  checkEnableButtonAddNewLocation():boolean{
    if(this.areaID > 0 && 
      this.setNewLocationAddress && 
      this.setNewLocationName && 
      this.setNewLocationMapLat && 
      this.setNewLocationMapLng){
      return false;
    }
    else{
     return true;
    } 
  }

  resetPageInfo(){
    this.areaID = 0;
    this.city = '';
    this.searchAreaList = [];
    this.setNewLocationAddress = false;
    this.setNewLocationName = false;
    this.lngCenter = 51.370762;
    this.latCenter = 35.706742;
    this.lng = 51.370762;
    this.lat = 35.706742;
    this.setNewLocationMapLat = true;
    this.setNewLocationMapLng = true;
    this.newLocationAddress = '';
    this.newLocationName = '';
  }
 
  onAddNewCandidateLocation(){
   let location:CandidateLocationV = {
     id:null,
     title:this.newLocationName,
     areaId:this.storage.selectedAreaID,
     address:this.newLocationAddress,
     lat:this.latCenter,
     longg:this.lngCenter,
     postalCode:null
   }
   this.isLoading = true;
   this.httpWebApp.postAddCandidateLocation(location, this.userToken).subscribe(res => {
      if(res != null){
        this.isLoading = false;
       this.candidateLocationList.push(res);
       this.resetPageInfo();
      }
    }, error =>{
      this.resetPageInfo();
    });
  }

  onEditCandidateLocation(location:CandidateLocationV){
    this.shared.candidateLocationEditInfo = location;
    this.shared.cityListInEditCandidateLocation = this.cityList;
    this.router.navigate(["/webApp/locationEdit"]);
  }//end onEditCandidateLocation

  
  onDeleteCandidateLocation(locationID:number, locationName:string){
    this.isShowDeleteModal = true;
    this.deleteCandidateLocationID = locationID;
    this.deleteCandidateLocationName = locationName;
  }

  onCloseModalDeleteCandidateLocation(){
    this.isShowDeleteModal = false;
  }

  onDeleteModal(){
    this.httpWebApp.getDeleteCandidateLocation(this.userToken, this.deleteCandidateLocationID).subscribe(res => {
      this.storage.candidateLocationList = res;
      this.candidateLocationList = res;
      this.onCloseModalDeleteCandidateLocation();
    }, error => {});
  } 

  agmCenterChange(event){
    this.latCenter = event.lat;
    this.lngCenter = event.lng;
  }//end cagmCterChang


  /*-----------------------*/
  onCityFocus(){
    this.isCityFocus = true;
  }

  onCityBlur(){
    setTimeout(()=>{
      this.isCityFocus = false;
    },200);
  }

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
    this.shared.selectedArea.next(null);
    citySelected.regions.forEach(eleman =>{
      eleman.areas.forEach(areaItem =>{
        this.areaList.push(areaItem);
        this.searchAreaList.push(areaItem);
      });
    });
  }//end onCityClick


  /*----start area-----*/  
  onAreaSearch(val: string) {
    this.searchAreaList = [];
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
    if (this.searchAreaList.length > 0) {
      this.areaName = this.searchAreaList[0].name;
      this.areaID = this.searchAreaList[0].id;
      this.latCenter = this.searchAreaList[0].centerLat;
      this.lngCenter =this.searchAreaList[0].centerLong;
      this.lat = this.latCenter;
      this.lng = this.lngCenter;
    }
    else if (this.areaList.length > 0 && this.areaName == '') {
      this.areaName = this.areaList[0].name;
      this.areaID = this.areaList[0].id;
      this.latCenter = this.areaList[0].centerLat;
      this.lngCenter = this.areaList[0].centerLong;
      this.lat = this.latCenter;
      this.lng = this.lngCenter;
    }
    if (this.areaList.length == 0 && this.areaName != '') {
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
  /*----end erea------*/
  /*-----------------------*/

}
