import { SharedService } from './../../../../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aparat',
  templateUrl: './aparat.component.html',
  styleUrls: ['./aparat.component.css']
})
export class AparatComponent implements OnInit {

  constructor(public shared:SharedService) { }

  ngOnInit() {
  }

}
