import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { EnumUrls } from '../../webApp/enum/enumUrls.enum';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';
import { UrlRest } from '../../class/urlRest.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-search',
  templateUrl: './all-search.component.html',
  styleUrls: ['./all-search.component.css']
})
export class AllSearchComponent implements OnInit {

  searchList:object[] = [];
  imagePath:string = '';

  constructor(private shared: SharedService,
    private urlRest: UrlRest,
    private basicData: BasicDataService,
    private router: Router) { }

  ngOnInit() {
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.imagePath = this.urlRest.imagePath;
    this.shared.listSearchResult.subscribe(res =>{
      if(res.length == 0 || res == null){
        this.router.navigate([EnumUrls.address_home]);
      }
      //console.log(res);
      this.searchList = res;
    });
  }

  onkeySearch(ename:string, id:number){
    this.basicData.onRegisterRequestInMenu(ename, id);
  }//end onkeySearch

}
