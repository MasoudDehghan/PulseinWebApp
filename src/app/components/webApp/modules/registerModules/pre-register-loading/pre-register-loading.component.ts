import { BasicDataService } from './../../../../../services/basicData/basic-data.service';
import { SharedService } from './../../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-pre-register-loading',
  templateUrl: './pre-register-loading.component.html',
  styleUrls: ['./pre-register-loading.component.css']
})
export class PreRegisterLoadingComponent implements OnInit {

  constructor(private shared: SharedService, private basicData: BasicDataService, private router: Router) { }

  ngOnInit() {
    //console.log("--در صفحه لودینگ--");
    this.shared.clearVareablesForRequestRegister();
    //console.log("دسته انتخابی---:");
    //console.log(this.shared.reqRej_jobcat3Select);
    this.basicData.preRegisterOfRequest(this.shared.reqRej_jobcat3Select);
  }

}
