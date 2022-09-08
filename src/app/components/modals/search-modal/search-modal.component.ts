import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { StorageService } from '../../../services/storage/storage.service';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared/shared.service';
import { UrlRest } from '../../class/urlRest.class';

@Component({
  selector: 'searchModal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {
  
  showModal:boolean;
  xWindow:number = 0;
  yWindow:number = 0;
  modalBoxPositionLeft:string = '0px';
  modalBoxPositionTop:string = '0px';

  topCategories:JobCategory3V[] = [];
  listSearch:object[] = [];
  listSearchLimit:object[] = [];
  inputValue:string='';
  hasSearchValue:boolean = false;
  stepForshowResultSearch:number = 0;
  sizeInPage:number = 8;
  previewIsEnable:boolean = false;
  nextIsEnable:boolean = false;
  imagePath:string = '';


  constructor(private storage: StorageService,
    private basicData: BasicDataService,
    private urlRest: UrlRest,
    private router: Router,
    private shared: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.imagePath = this.urlRest.imagePath;
    if (isPlatformBrowser(this.platformId)){
      this.showModal = this.storage.showModalSearch.getValue();
      this.xWindow = window.innerWidth;
      this.yWindow = window.innerHeight;
      this.setPositionModal();
      this.getTopCategories();
    }
  }//end ngOnInit

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser(this.platformId)){
      this.xWindow = window.innerWidth;
      this.yWindow = window.innerHeight;
      this.setPositionModal();
    } 
  }//end onResize

  setPositionModal(){
    if(this.showModal){
      let width:number = 450;
      let higth:number = 400;
      if(this.xWindow > width){
        this.modalBoxPositionLeft = ((this.xWindow / 2) - (width / 2))+'px';
      }
      else{
        this.modalBoxPositionLeft = "0px";
      }
      this.modalBoxPositionTop = ((this.yWindow / 2) - (higth / 2))+'px';
    }
    else{
      this.modalBoxPositionLeft = '0px';
      this.modalBoxPositionTop = '0px';
    }
  }//end setPositionModal

  onCloseModal(){
    this.storage.showModalSearch.next(false);
    this.showModal = false;
    this.modalBoxPositionLeft = '0px';
    this.modalBoxPositionTop = '0px';
  }//end onCloseModal

  getTopCategories(){
    this.basicData.setCategories.subscribe(res =>{
      if(res){
        for(let i=0; i < 8; i++){
          this.basicData.categories3.forEach(eleman => {
            eleman.forEach(item => {
              if(item.id == this.storage.userDataLogin.mostVisitedIds[i]){
                this.topCategories.push(item);
              }
            });
          });
        }
      }
    });
  }//end getTopCategories

  onChange(val:string){
    //console.log('value: '+val);
    this.listSearch = [];
    this.stepForshowResultSearch = 0;
    this.inputValue = val;
    if(val.length > 1){
      this.hasSearchValue = true;
      this.basicData.categories3.forEach(item =>{
        item.forEach(eleman => {
          if (eleman.name.indexOf(val) != -1 && eleman.haveWorker){
            this.listSearch.push(eleman);
          }
        });
      });
      this.setListSearch();
    }
    else{
      this.hasSearchValue = false;
    }
    //console.log(this.listSearch);
  }//end onChange
 
  onkeySearch(item:JobCategory3V, ename:string, id:number){
    this.shared.onResultModalSearch.next(true);
    this.shared.reqRej_jobcat3Select = item;
    this.basicData.onRegisterRequestInMenu(ename, id);
    this.onCloseModal();
  }//end onkeySearch
  

  setListSearch(){
    this.listSearchLimit = [];
    let end : number = (this.stepForshowResultSearch + 1) * this.sizeInPage;

    if(this.stepForshowResultSearch == 0){
      this.previewIsEnable = false;
    }
    else{
      this.previewIsEnable = true;
    }

    if(this.listSearch.length < this.sizeInPage && this.listSearch.length > 0){
      this.listSearchLimit = this.listSearch;
    }
    else if(this.listSearch.length >= this.sizeInPage){
      if((this.stepForshowResultSearch + 1) * this.sizeInPage >= this.listSearch.length){
        end = this.listSearch.length;
        this.nextIsEnable = false;
      }
      else{
        this.nextIsEnable = true;
      }
      for(let i = this.stepForshowResultSearch * this.sizeInPage; i < end; i++){
        this.listSearchLimit.push(this.listSearch[i]);
      }
    }
  }

  onShowMoreRes(){
    this.storage.showModalSearch.next(false);
    this.showModal = false;
    this.shared.listSearchResult.next(this.listSearch);
    this.router.navigate(["/searchResult"]);
  }

}
