import { EnumUrls } from './../../enum/enumUrls.enum';
import { Router } from '@angular/router';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SharedService } from '../../../../services/shared/shared.service';
import { BasicDataService } from '../../../../services/basicData/basic-data.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-request-register2',
  templateUrl: './request-register2.component.html',
  styleUrls: ['./request-register2.component.css']
})
export class RequestRegister2Component implements OnInit {

  stepsList = [
    { name: 'انتخاب سرویس', state: 'diactive' },
    { name: 'توضیحات', state: 'diactive' },
    { name: 'تعیین زمان', state: 'diactive' },
    { name: 'تعیین مکان', state: 'diactive' },
    { name: 'بررسی نهایی', state: 'diactive' }
  ];

  stepsListMobile = [
    { name: '۱', state: 'diactive' },
    { name: '۲', state: 'diactive' },
    { name: '۳', state: 'diactive' },
    { name: '۴', state: 'diactive' }
  ];

  haveDescription:boolean = false;

  constructor(public shared:SharedService,
    private router: Router,
    public basicData: BasicDataService,
    @Inject(PLATFORM_ID) private platformId: Object) {
  }//end constructor

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.shared.clearVareablesForRequestRegister();
    this.shared.stepNumber.next(1);
    this.shared.stepNumber.subscribe(res => {
      this.checkStepRequest(res);
    });
  
    this.shared.stepNumberMobile.next(0);
    this.shared.stepNumberMobile.subscribe(res => {
      this.checkStepMobile(res);
    });

  }//end ngOnInit

  checkStepRequest(stpNu: number) {
    for (let i = 0; i < this.stepsList.length; i++) {
      this.stepsList[i].state = 'diactive';
    }
    if (stpNu == 1 || stpNu == 2) {
      this.stepsList[0].state = 'active';
    }
    else if (stpNu == 3) {
      this.stepsList[0].state = 'done';
      this.stepsList[1].state = 'active';
    }
    else if (stpNu == 4) {
      for (let j = 0; j < 2; j++) {
        this.stepsList[j].state = 'done';
      }
      this.stepsList[2].state = 'active';
    }
    else if (stpNu == 5) {
      for (let j = 0; j < 3; j++) {
        this.stepsList[j].state = 'done';
      }
      this.stepsList[3].state = 'active';
    }
    else if (stpNu == 6) {
      for (let j = 0; j < 4; j++) {
        this.stepsList[j].state = 'done';
      }
      this.stepsList[4].state = 'active';
    }
  }//end checkStepRequest

  checkStepMobile(step:number){
    for (let i = 0; i < this.stepsListMobile.length; i++){
      this.stepsListMobile[i].state = 'diactive';
    }
    if(step > 0 && step < 4){
      this.stepsListMobile[step-1].state = 'active';
    }  
  }//end checkStepMobile

  onLogo(){ 
    this.router.navigate([EnumUrls.address_home]);
  }//end onLogo

  onClose(){
    let path:string = document.URL;
    let strArr: string[] = path.split('/');
    if(strArr.indexOf('mainCategories') == -1){
      sessionStorage.removeItem('discountCode');
      this.router.navigate([EnumUrls.address_home]);
    }
    else{
      this.router.navigate([EnumUrls.address_home]);
    }
  }

}
