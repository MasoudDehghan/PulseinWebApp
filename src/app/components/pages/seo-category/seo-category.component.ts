import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {
  trigger, state, style, animate, transition
} from '@angular/animations';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { MetaService } from '../../../services/metaTag/meta.service';

@Component({
  selector: 'app-seo-category',
  templateUrl: './seo-category.component.html',
  styleUrls: ['./seo-category.component.css'],
  animations: [
    trigger('faqState', [
      state('hide', style({
        height: '0px',
        'line-height':'0px'
      })),
      state('show',   style({
        height: 'auto',
        'min-height': '40px',
        'line-height':'25px'
      })),
      transition('show <=> hide', animate('300ms ease-in'))
    ]),
    trigger('arrowState', [
      state('hide', style({
        transform: 'rotate(0deg)'
      })),
      state('show',   style({
        transform: 'rotate(-180deg)'
      })),
      transition('hide <=> show', animate('200ms ease-in'))
    ])
  ]
})
export class SeoCategoryComponent implements OnInit {

  isLoading:boolean = true;
  cat3Ename:string = '';

  constructor(private router: Router,
    private activeRoute: ActivatedRoute,
    private metaService: MetaService) {
      
    }

  ngOnInit() {
    this.init();
  }
  

  init() {
    this.activeRoute.params.subscribe((param: Params) => {
      this.cat3Ename = param.jobcat3Ename;  
      this.metaService.createCanonicalURL(this.metaService.webBasicUrl + "/categories3/" + this.cat3Ename);
      this.isLoading = false;
      this.router.navigate(['categories3',this.cat3Ename]);      
    });
  }//end init

}
