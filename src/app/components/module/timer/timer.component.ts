import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input() min:number;

  hour:number = 0;
  second:number = 0;
  hourText:string = '00';
  minText:string = '00';
  secondText:string = '00';

  constructor(private basicData:BasicDataService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.timeInit();
    this.timerCustom();
  }
  
  timeInit(){
    if(this.min >= 60){
      this.hour = Math.floor(this.min / 60);
      this.min = (this.min % 60);
      if(this.min == 0){
        this.hour = this.hour - 1;
        this.min = 59;
      }
      else {
        this.min = this.min - 1;
      }
      this.second = 59;      
    }
    else if(this.min < 60){
      this.hour = 0;
      this.min = this.min - 1;
      this.second = 59;
    }
  }


  timerCustom(){
    if(isPlatformBrowser(this.platformId)){
      let interval = setInterval(()=>{
        this.second--;
        if(this.second < 1 && this.min > 0){
          this.second = 59;
          this.min = this.min - 1;
        }
        if(this.min < 0){
          this.min = 59;
          this.hour = this.hour - 1;
        }
        if(this.hour <= 0 && this.min <= 0 && this.second <= 0){
          this.basicData.endTimer.next(true);
          this.hour = 0;
          this.min = 0;
          this.second = 0;
          clearInterval(interval);
        }
        this.setFormatTimer();
      }, 1000);
    }
  }

  setFormatTimer(){
    if(this.hour < 10){
      this.hourText = '0'+this.hour;
    }
    else{
      this.hourText = this.hour.toString();
    }
    if(this.min < 10){
      this.minText = '0'+this.min;
    }
    else{
      this.minText = this.min.toString();
    }
    if(this.second < 10){
      this.secondText = '0'+this.second;
    }
    else{
      this.secondText = this.second.toString();
    }

  }

}

