import { JobCategory3V } from './../../../../class/jobCategory3V.class';
import { webappHttpService } from './../../../services/http/webapp-http.service';
import { EnumUrls } from './../../../enum/enumUrls.enum';
import { Router } from '@angular/router';
import { SharedService } from './../../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastMessage } from '../../../../class/toastMessage.class';
import { UrlRest } from '../../../../class/urlRest.class';

@Component({
  selector: 'app-select-jobcat3',
  templateUrl: './select-jobcat3.component.html',
  styleUrls: ['./select-jobcat3.component.css']
})
export class SelectJobcat3Component implements OnInit {

  imagePath:string = '';
  isLoading:boolean = false;

  constructor(public shared: SharedService,
    private httpService: webappHttpService,
    private toastr: ToastrService,
    private toastMsg: ToastMessage,
    private urlRest: UrlRest,
    private router: Router){
      shared.clearQuestionsList(0);
      shared.reqRej_title = '';
      shared.reqRej_jobcat3Select = null;
      if(!shared.reqRej_jobcat2Select){
        router.navigate([EnumUrls.address_home]);
      }
      else{
        this.imagePath = this.urlRest.imagePath;
        this.shared.stepNumber.next(1);
        this.shared.stepNumberMobile.next(0);
      }
  }//end constructor

  ngOnInit(){
  }//end ngOnInit

  onJobCat3(item:JobCategory3V){
    if(this.shared.reqRej_jobcat3Select != item){
      this.shared.clearQuestionsList(0);
    }
    this.isLoading = true;
    //if (!this.storage.isLogin.value) {
      /*====user is guest====*/
      this.httpService.getGuestPreRegisterRequest(item.id).subscribe(res => {
        //console.log("result---------:");
        //console.log(res);
        this.isLoading = false;
        if(!res.haveActiveWorker){
          this.toastr.clear();
          this.toastr.warning(this.toastMsg.msg4NoWorker, this.toastMsg.title4NoWorker);
        }
        else{
          this.shared.reqRej_preRegister = res;
          this.shared.reqRej_jobcat3Select = item;
          if(res.haveQuestion){
            //go to questions module
            this.router.navigate([EnumUrls.requestRegister_questions]);
          }
          else if(!res.haveQuestion){
            //no question and go to descriptions request
            //module description
            this.router.navigate([EnumUrls.requestRegister_extraDescription]);
          }
        }
      }, error => {
        //console.log("خطای کاربر  مهمان");
        //console.log(error);
      });
  }//end onJobCat3

}
