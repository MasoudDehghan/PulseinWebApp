import { SharedService } from '../../../services/shared/shared.service';
import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { JobCategory2V } from '../../class/jobCategory2V.class';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { ConstValue } from '../../class/constValue';
import { Message } from '../../class/mesage.class';
import { isPlatformBrowser } from '@angular/common';
import { EnumConstData } from '../../enum/constData.enum';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  mainTitle:string = 'راه های ارتباطی';
  address:string = "";
  textTelphone:string = 'تماس با پشتیبانی: ';
  telphone1:string = "";
  telphone2:string = "";
  mobile1:string = "";
  mobile2:string = "";
  isPC:boolean = true;
  categories1: JobCategory1V[];
  categories2: Array<JobCategory2V[]>;
  categories3: Array<JobCategory3V[]>;

  constructor(private basicData: BasicDataService, 
    public msgError:Message,
    public msg:Message,
    public titleSeo:Title,
    public meta:Meta,
    public shared: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.address = EnumConstData.addressCo;
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.telphone1 = EnumConstData.suportTel1;
    this.mobile1 = EnumConstData.suportmobile1;
    this.titleSeo.setTitle("پالسین - تماس با ما");
    this.meta.updateTag({
      name: 'description',
      content: "راه‌های ارتباط با مشاورین و پشتیبان‌های شرکت پالسین"
    });

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);

      this.basicData.setCategories.subscribe(res => {
        if(res){
          //console.log("contact-us ***");
          this.categories1 = this.basicData.categories1;
          this.categories2 = this.basicData.categories2;
          this.categories3 = this.basicData.categories3;
        }
      });

    }

  }//end ngOnInit

}
