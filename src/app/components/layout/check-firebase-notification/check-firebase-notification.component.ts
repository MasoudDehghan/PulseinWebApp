import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-check-firebase-notification',
  templateUrl: './check-firebase-notification.component.html',
  styleUrls: ['./check-firebase-notification.component.css']
})
export class CheckFirebaseNotificationComponent implements OnInit {

  categories3:Array<JobCategory3V[]> = [];
  jobcat3:JobCategory3V = null;
  //nameCat3:string = '';
  cat3ID:number = 0;
  displayLoading:boolean = true;

  constructor(private activeRoute: ActivatedRoute, 
    private basicData: BasicDataService,
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      this.activeRoute.params.subscribe((param: Params) => {
        //console.log(param.id);
        this.cat3ID = Number(param.id);
        if(this.cat3ID == 0){
          this.router.navigate(["/Home"]);
        }
        else{
          this.basicData.setCategories.subscribe(res => {
            if(res){
              this.categories3 = this.basicData.categories3;
              this.categories3.forEach(eleman => {
                eleman.forEach(item => {
                  if(item.id == this.cat3ID){
                    this.jobcat3 = item;
                    //this.basicData.doActionForJobcat3(this.jobcat3, '');
                  }
                });
              });
              this.displayLoading = false;
              if(this.jobcat3.haveSeo){
                this.router.navigate(["categories3", this.jobcat3.ename]);
              }
              else{
                this.basicData.preRegisterOfRequest(this.jobcat3);
              }
            }
          });
        }
      }); 
    }
  }//end ngOnInit

}
