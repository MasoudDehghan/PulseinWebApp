
import { Directive, HostListener, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Directive({
  selector: '[eventTracker]'
})
export class ButtonGADirective {

  @Input('eventTracker') option:any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  @HostListener('click', ['$event']) onClick($event){

    if (isPlatformBrowser(this.platformId)) {
      if (window){
        console.group(this.option.category);
        (<any>window).ga('send', 'event', this.option.category, this.option.action, {
          hitCallback: function() {
          //console.log('Tracking is successful');
          }
        });
      } 
    }//end if
  }

}