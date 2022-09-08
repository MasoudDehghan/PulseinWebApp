import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { ConstValue } from '../../class/constValue';
import { Router } from '@angular/router';
//import { isPlatformBrowser } from '@angular/common';
import { BasicDataService } from '../../../services/basicData/basic-data.service';

@Component({
  selector: 'app-job-cat-menu',
  templateUrl: './job-cat-menu.component.html',
  styleUrls: ['./job-cat-menu.component.css']
})

export class JobCatMenuComponent implements OnInit {

  @Input() jobCats1:JobCategory1V[];

  //megaIsHide:boolean = false;
  cat1Ename:string='';
  cat2Ename:string='';
  path:string='';

  constructor(private constVar:ConstValue, 
    private router: Router, 
    private basicData: BasicDataService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.path = this.constVar.ImagesCategoriesPath;
    //this.ChangeStateMegaMenu();
  }//end ngOnInit

  clickOnjobCat1(enameJobCat1:string){
    //this.megaIsHide = true;
      this.router.navigate([enameJobCat1]);
      //this.ChangeStateMegaMenu();
  }

  /*
  ChangeStateMegaMenu(){
    if (isPlatformBrowser(this.platformId)){
      setTimeout(() => {
        this.megaIsHide = false;
      }, 100);
    }
  }
  */
  

  onkeySearch(jobcat:any, ename:string, id:number){
    if(jobcat == undefined){
      this.jobCats1.forEach(eleman=>{
        eleman.jobCat2List.forEach(item=>{
          item.jobCat3List.forEach(ele=>{
            if(ele.ename == ename){
              this.cat1Ename = eleman.ename;
              this.cat2Ename = item.ename;
              return;
            }
          });
          return;
        });
      });
      //this.megaIsHide = true;
      this.basicData.onRegisterRequestInMenu(ename, id);
      //this.ChangeStateMegaMenu();
    }
    else{
      this.jobCats1.forEach(eleman=>{
        eleman.jobCat2List.forEach(item=>{
          if(item.ename == ename){
            this.cat1Ename = eleman.ename;
            return;
          }
        });
      });
      //this.megaIsHide = true;
      this.router.navigate([this.cat1Ename, ename]);
      //this.ChangeStateMegaMenu();
    }
  }//end onkeySearch
  
}


