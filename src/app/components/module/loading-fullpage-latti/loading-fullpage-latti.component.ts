import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-loading-fullpage-latti',
  templateUrl: './loading-fullpage-latti.component.html',
  styleUrls: ['./loading-fullpage-latti.component.css']
})
export class LoadingFullpageLattiComponent implements OnInit {

  lottieConfig: Object;
  anim: any;

  constructor(public shared: SharedService) {
    this.lottieConfig = {
      path: 'assets/webappPics/preloader.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
  }

  ngOnInit() {
    //console.log('app-loading-fullpage-latti');
  }//end ngOnInit

  handleAnimation(anim: any) {
    this.anim = anim;
  }

}
