import { SharedService } from './../../../services/shared/shared.service';
import { StorageService } from './../../../services/storage/storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { AreaV } from '../../webApp/class/backend/areaV.class';

@Component({
  selector: 'app-select-area',
  templateUrl: './select-area.component.html',
  styleUrls: ['./select-area.component.css']
})
export class SelectAreaComponent implements OnInit {

  @Input() areaList: AreaV[] = [];
  listArea: AreaV[] = [];
  searchAreaList: AreaV[] = [];

  constructor(public storage: StorageService,
    public shared: SharedService) { }

  ngOnInit() {
    console.log(this.shared.xWindow.value);
    this.areaList.forEach(areaItem => {
      let find:boolean = false;
      this.listArea.forEach(item => {
        if(areaItem == item){
          find = true;
        }
      });
      if(!find){
        this.listArea.push(areaItem);
      }
    });
    this.searchAreaList = this.listArea;
  }//end ngOnInit

  onClose(){
    this.areaList = [];
    this.listArea = [];
    this.searchAreaList = [];
    this.shared.showModalSelectArea.next(false);
  }//end onClose

  onAreaSearch(val: string) {
    this.searchAreaList = [];
    let inputAreaName: string = val;
    if (inputAreaName.length > 0) {
      for (let i = 0; i < this.listArea.length; i++) {
        if (this.listArea[i].name.indexOf(inputAreaName) != -1) {
          this.searchAreaList.push(this.listArea[i]);
        }
      }
    }
  }//end onAreaSearch

  onAreaItem(item:AreaV){
    this.shared.selectedArea.next(item);
    this.shared.selectedLocation.next(null);
    this.searchAreaList = [];
    this.shared.showModalSelectArea.next(false);
  }//end onAreaItem

}
