import { StorageService } from './../../../services/storage/storage.service';
import { webappHttpService } from './../../webApp/services/http/webapp-http.service';
import { SharedService } from './../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { EnumConstData } from '../../enum/constData.enum';

@Component({
  selector: 'app-followe-request',
  templateUrl: './followe-request.component.html',
  styleUrls: ['./followe-request.component.css']
})
export class FolloweRequestComponent implements OnInit {

  loading:boolean = false;
  token:string = "";
  tel1:string = '';
  mobile1:string = '';
  hasDiscount:boolean = false;
  discountCode:string = '';

  constructor(public shared: SharedService,
    private webappHttp: webappHttpService,
    private storage: StorageService) { }

  ngOnInit() {
    this.shared.noScroll.next(true);
    this.token = localStorage.getItem("userToken");
    this.tel1 = EnumConstData.suportTel1;
    this.mobile1 = EnumConstData.suportmobile1;
    if(this.storage.subject_userDataLogin.value){
      if(this.storage.subject_userDataLogin.value.inProgressRequests){
        if(this.storage.subject_userDataLogin.value.inProgressRequests.length > 0){
          if(this.storage.subject_userDataLogin.value.inProgressRequests[0].reservedDiscount){
            this.hasDiscount = true;
            this.discountCode = this.storage.subject_userDataLogin.value.inProgressRequests[0].reservedDiscount.code;
          }
        }
      }
    }
  }//end ngOnInit

  closeModal(){
    this.shared.showModalFolloweRequest.next(false);
    this.shared.firstTimeShowModalFolloweRequest.next(false);
    this.shared.noScroll.next(false);
  }//end closeModal()

  onFollowingRequest(){
    this.loading = true;
    this.webappHttp.getOnProgressRequests(this.token).subscribe(res => {
      if(res.length > 0){
        this.shared.requestInfo = res[0];
        this.shared.requestID = res[0].request.id;
        this.closeModal();
        this.loading = false;
        this.shared.routingByStateRequest(this.shared.requestInfo.state.id);
      }
    });
  }//end onFollowingRequest

}
