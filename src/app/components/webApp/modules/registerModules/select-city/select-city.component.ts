import { UrlRest } from './../../../../class/urlRest.class';
import { Router } from '@angular/router';
import { SharedService } from './../../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { activeProvinceDto } from '../../../class/backend/activeProvinceDto.class';
import { PreRegisterRequestResult } from '../../../class/backend/preRegisterRequestResult.class';
import { TypeInfo } from '../../../class/backend/typeInfo.class';
import { EnumUrls } from '../../../enum/enumUrls.enum';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.css']
})
export class SelectCityComponent implements OnInit {

  jobcat3Icon:string = '';
  jobcat3Name:string = '';

  numberOfCities:number = 0;
  isCitySelected:boolean = false;
  selectedCity:TypeInfo;
  registerRequestInfo:PreRegisterRequestResult;
  provinceList:activeProvinceDto[] = [];
  cityList:TypeInfo[] = [];

  titleText:string = "شهر مورد نظر خود را انتخاب کنید";

  textServiceInOnCityPart1:string = "در حال حاضر این سرویس فقط در شهر ";
  textServiceInOnCityPart2:string = " ارائه می‌شود.";
  textServiceInOnCityPart3:string = "در صورت قبول این شهر بر روی دکمه ادامه کلیک نمایید.";

  constructor(private location: LocationStrategy,
    public shared: SharedService,
    private router: Router,
    private urlRest: UrlRest,) { }

  ngOnInit() {
    if(this.shared.reqRej_preRegister){
      this.shared.address = null;
      this.shared.selectedLocation.next(null);
      this.shared.selectedArea.next(null);
      this.registerRequestInfo = this.shared.reqRej_preRegister;
      //console.log(this.registerRequestInfo);
      this.provinceList = this.registerRequestInfo.activeProvinces;
      this.provinceList.forEach(item => {
        item.cityList.forEach(city => {
          this.cityList.push(city);
          this.numberOfCities++;
        })
      });
      if(this.numberOfCities > 1){
        console.log("multi city: 1");
      }
      else{
        //console.log("city: "+ this.numberOfCities);
        this.selectedCity = this.cityList[0];
        this.isCitySelected = true;
      }
      this.jobcat3Icon = this.urlRest.imagePath + this.shared.reqRej_jobcat3Select.icon;
      this.jobcat3Name = this.shared.reqRej_jobcat3Select.name;
    }
    else{
      this.router.navigate([EnumUrls.address_home]);
    }
    
  }//end ngOnInit

  onBackStep(){ 
    this.location.back();
  }//end onBackStep

  onNext(){
    if(this.isCitySelected){
      this.shared.citySelected = this.selectedCity;
      //console.log(this.shared.citySelected);
      if(this.registerRequestInfo.haveQuestion){
        //go to questions module
        this.shared.jobcat3FromLandingPage = true;
        this.router.navigate([EnumUrls.requestRegister_questions]);
      }
      else if(!this.registerRequestInfo.haveQuestion){
        //no question and go to descriptions request
        //module description
        this.router.navigate([EnumUrls.requestRegister_extraDescription]);
      }
    }
  }//end onNext

  onCity(city:TypeInfo){
    //console.log(city);
    this.selectedCity = city;
    this.isCitySelected = true;
  }//end onCity

}
