import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomFunctionsService } from '../../../services/functions/custom-functions.service';
import { Router } from '@angular/router';
import { EnumConstData } from '../../enum/constData.enum';
import { UrlRest } from '../../class/urlRest.class';

@Component({
  selector: 'menu-login-itme',
  templateUrl: './menu-login-itme.component.html',
  styleUrls: ['./menu-login-itme.component.css']
})
export class MenuLoginItmeComponent implements OnInit {

  @Output() close = new EventEmitter();
  @Input() inputCredit:string;

  userName:string = '';
  userCredit:string = '';
  isProfileImage: boolean = false;
  profileImageAddress: string = '';
  charFirstName: string = '';
  charLastName: string = '';
  tempArr: string[] = [];

  constructor(private storage: StorageService,
    private basicData: BasicDataService,
    private router: Router,
    private urlRest: UrlRest,
    private customFunc: CustomFunctionsService) { }

  ngOnInit() {
    if(this.inputCredit != "noInput"){
      this.userCredit = this.inputCredit;
    }
    else{
      this.storage.userCredit.subscribe(res => {
        if(res == -1){
          this.userCredit = this.customFunc.chanageNumbersToFarsi(this.storage.userDataLogin.user.credit.toString());
          this.userCredit = this.customFunc.formatAmountMoney(this.userCredit);
          this.userCredit = this.userCredit + " تومان";
        }
        else{
          this.userCredit = this.customFunc.chanageNumbersToFarsi(res.toString());
          this.userCredit = this.customFunc.formatAmountMoney(this.userCredit);
          this.userCredit = this.userCredit + " تومان";
        }
      });
    }
    
    this.userName = this.storage.userDataLogin.user.personalData.firstName + " " + this.storage.userDataLogin.user.personalData.lastName;
    this.tempArr = this.storage.userDataLogin.user.personalData.firstName.split('');
    this.charFirstName = this.tempArr[0];
    this.tempArr = [];
    this.tempArr = this.storage.userDataLogin.user.personalData.lastName.split('');
    this.charLastName = this.tempArr[0];
    if(this.storage.userDataLogin.user.personalData.photo == EnumConstData.profileImageEmpty){
      this.isProfileImage = false;
    }
    else{
      this.isProfileImage = true;
      this.profileImageAddress = this.urlRest.imagePath + this.storage.userDataLogin.user.personalData.photo;
    }
  }//end ngOnInit

  onAddCredit(){
    //console.log("click on add credit");
    this.basicData.activeModalAddCredit.next(true);
    this.close.emit(false);
  }

  onInvite(){
    //console.log("click on Invite");
    this.basicData.activeModalInvite.next(true);
    this.close.emit(false);
  }

  onTransactions(){
    this.router.navigate(['/webApp/transactions']);
    this.close.emit(false);
  }

  onProfile(){
    this.router.navigate(['/webApp/profile']);
    this.close.emit(false);
  }

  onCandidateLocations(){
    this.router.navigate(['/webApp/candidateLocations']);
    this.close.emit(false);
  }

  onFinishedRequest(){
    this.router.navigate(['/webApp/finishedRequests']);
    this.close.emit(false);
  }
 
  onExit(){
    this.storage.userLogOut();
    this.close.emit(false);
  }

}//end class

