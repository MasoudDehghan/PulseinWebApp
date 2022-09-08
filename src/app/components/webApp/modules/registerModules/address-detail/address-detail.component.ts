import { LocationStrategy } from '@angular/common';
import { UrlRest } from './../../../../class/urlRest.class';
import { SharedService } from './../../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumUrls } from '../../../enum/enumUrls.enum';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {

  jobcat3Name: string = '';
  jobcat3Icon: string = '';
  destinationAddress:string = '';
  hasDestination:boolean = false;
  destinationPlaceholder:string = "آدرس مقصد: شهر ، محله ، خیابان اصلی ، کوچه ، پلاک ، واحد";
  addressDetails:string = '';
  addressStartPlaceholder:string = "آدرس مبدأ: محله ، خیابان اصلی ، کوچه ، پلاک ، واحد";
  addressPlaceholder:string = "محله ، خیابان اصلی ، کوچه ، پلاک ، واحد";
  addressIsOK:boolean = false;
  addressDestinationIsOK = true;
  addressIsReadOnly:boolean = false;

  constructor(public shared: SharedService,
    private urlRest: UrlRest,
    private location: LocationStrategy,
    private router: Router) { }

  ngOnInit() {
    if(this.shared.citySelected && this.shared.reqRej_preRegister && this.shared.reqRej_jobcat3Select){
      this.jobcat3Icon = this.urlRest.imagePath + this.shared.reqRej_jobcat3Select.icon;
      this.jobcat3Name = this.shared.reqRej_jobcat3Select.name;
      this.hasDestination = this.shared.reqRej_preRegister.destinationAddressRequired;
      if(this.hasDestination){
        this.addressDestinationIsOK = false;
      }
      if(this.shared.selectedLocation.value){
        this.addressDetails = this.shared.selectedLocation.value.address;
        this.addressIsReadOnly = true;
        this.addressIsOK = true;
      }
      if(this.shared.destination && this.shared.destination != ''){
        this.destinationAddress = this.shared.destination;
        this.addressDestinationIsOK = true;
      }
      if(this.shared.address && this.shared.address != ''){
        this.addressDetails = this.shared.address;
        this.addressIsOK = true;
      }
    }
    else{
      this.router.navigate([EnumUrls.address_home]);
    }
  }//end ngOnInit

  onChangeAddress(val: string) {
    val = val.trim();
    this.addressDetails = val;
    if(this.addressDetails.length > 5){
      this.addressIsOK = true;
    }
    else{
      this.addressIsOK = false;
    }
  }//end onChangeAddress

  onChangeDestination(val: string){
    val = val.trim();
    this.destinationAddress = val;
    if(this.destinationAddress.length > 5){
      this.addressDestinationIsOK = true;
    }
    else{
      this.addressDestinationIsOK = false;
    }
  }//end onChangeDestination

  onNext(){
    if(this.addressIsOK && this.addressDestinationIsOK){
      if(this.shared.selectedLocation.value){
        this.shared.savePalceID = this.shared.selectedLocation.value.id;
        this.shared.address = this.shared.selectedLocation.value.address;
      }
      else{
        this.shared.savePalceID = null;
        this.shared.address = this.addressDetails;
      }
      if(this.hasDestination){
        this.shared.destination = this.destinationAddress;
      }
      this.router.navigate([EnumUrls.requestRegister_summary]);
    }
  }//end onNext

  onBack(){
    this.location.back();
  }//end onBack

}
