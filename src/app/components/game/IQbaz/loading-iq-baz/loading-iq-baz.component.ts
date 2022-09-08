import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-iq-baz',
  templateUrl: './loading-iq-baz.component.html',
  styleUrls: ['./loading-iq-baz.component.css']
})
export class LoadingIqBazComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    this.router.navigate(['/game/IqBaz/start']);
  }

}
