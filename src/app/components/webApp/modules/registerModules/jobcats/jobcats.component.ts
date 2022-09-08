import { EnumUrls } from './../../../enum/enumUrls.enum';
import { Router } from '@angular/router';
import { BasicDataService } from './../../../../../services/basicData/basic-data.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../services/shared/shared.service';
import { JobCategory1V } from '../../../../class/jobCategory1V.class';
import { JobCategory2V } from '../../../../class/jobCategory2V.class';
import { UrlRest } from '../../../../class/urlRest.class';

@Component({
  selector: 'app-jobcats',
  templateUrl: './jobcats.component.html',
  styleUrls: ['./jobcats.component.css']
})
export class JobcatsComponent implements OnInit {

  //userToken:string = '';
  categories1: JobCategory1V[] = [];
  categories2: Array<JobCategory2V[]> = [];
  listjobcat1AnimState: string[] = [];
  imagePath: string = '';
  

  constructor(public shared: SharedService,
    private router: Router,
    private urlRest: UrlRest,
    public basicData: BasicDataService){
      this.shared.stepNumber.next(1);
      this.shared.stepNumberMobile.next(0);
      
  }//end constructor

  ngOnInit() {
    //this.userToken = localStorage.getItem("userToken");
    this.shared.reqRej_jobcat3Select = null;
    this.shared.reqRej_jobcat2Select  = null;
    this.categories1 = this.basicData.categories1;
    this.categories2 = this.basicData.categories2;
    this.imagePath = this.urlRest.imagePath;
    for (let i = 0; i < this.categories1.length; i++) {
      this.listjobcat1AnimState[i] = "diactive";
    } 
  }//end ngOnInit

  onJobCat1(index){
    for (let i = 0; i < this.listjobcat1AnimState.length; i++) {
      if (i != index) {
        this.listjobcat1AnimState[i] = 'diactive';
      }
    }
    this.listjobcat1AnimState[index] = this.listjobcat1AnimState[index] == 'diactive' ? 'active' : 'diactive';
  }//end onJobCat1

  onJobCat2(jobCat2ID){
    this.categories2.forEach(item => {
      item.forEach(eleman => {
        if (eleman.id == jobCat2ID) {
          if(this.shared.reqRej_jobcat2Select){
            if(this.shared.reqRej_jobcat2Select != eleman){
              this.shared.clearVareablesForRequestRegister();
            }
          }
          else{
            this.shared.clearVareablesForRequestRegister();
          }
          this.shared.reqRej_jobcat2Select = eleman;
          this.router.navigate([EnumUrls.requestRegister_selectJobcat3]);
        }
      });
    });
  }//end onJobCat2

}
