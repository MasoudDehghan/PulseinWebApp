import { Component, OnInit, Input } from '@angular/core';
import { InvoiceV } from '../../class/backend/invoiceV.class';

@Component({
  selector: 'invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  @Input() invoice:InvoiceV;

  toman:string = " تومان";
  blank:string = "---";
  zeroPrice:string = '0.0';

  constructor() { }

  ngOnInit() {
  }

}
