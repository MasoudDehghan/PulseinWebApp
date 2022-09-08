import { Component, OnInit, HostListener, Input } from '@angular/core';
import { BasicDataService } from '../../../../services/basicData/basic-data.service';

@Component({
  selector: 'photoPopup',
  templateUrl: './photo-popup.component.html',
  styleUrls: ['./photo-popup.component.css']
})
export class PhotoPopupComponent implements OnInit {

  @Input() srcPhoto:string;

  displayModalPhoto:boolean = false;
  mouseOutImage:boolean = true;

  constructor(public basicData: BasicDataService) { }

  ngOnInit() {
    this.displayModalPhoto = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  }

  showModalStyle(){
    let style = {
      'top': '0px',
      'right': '0px',
      'width': '100%',
      'height': '100%'
    }
    return style;
  }

  hideModalStyle(){
    let style = {
      'top': '0px',
      'right': '0px',
      'width': '0px',
      'height': '0px'
    }
    return style;
  }

  onCloseModal(){
    if(this.mouseOutImage){
      this.displayModalPhoto = false;
      this.basicData.activeModalPhoto.next(false);
    }
  }

  inImage(){
    this.mouseOutImage = false;
  }

  outImage(){
    this.mouseOutImage = true;
  }


}
