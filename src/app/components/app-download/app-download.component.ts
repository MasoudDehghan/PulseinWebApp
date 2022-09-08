import { Component, OnInit } from '@angular/core';
import { Links } from '../class/links';

@Component({
  selector: 'app-download',
  templateUrl: './app-download.component.html',
  styleUrls: ['./app-download.component.css']
})

export class AppDownloadComponent implements OnInit {

  display:boolean = false;
  imgGooglePlaySrc: string = 'assets/image/market/google60.png';
  imgGooglePlaySrcDef: string = 'assets/image/market/google60.png';
  imgAppStoreSrc: string = 'assets/image/market/apple.png';
  imgAppStoreSrcDef: string = 'assets/image/market/apple.png';
  imgComingSoonSrc: string = 'assets/image/market/comingsoon60.jpg';
  imgWebApp: string = "assets/image/market/webApp.jpg";
  cofeBazarLink: string = '';
  googlePlay: string = '';
  webAppAddress:string = '';
  directLink: string = '';
  xWindow: number = 1000;
  largeMode: boolean = true;
  title: string = 'پاسخ همه نیازها در دستان شما';
  description: string = 'پالسین تمامی خدمات مورد نیاز منزل و محل کار را در قالب یک اپلیکیشن به گوشی موبایل شما می آورد. تعمیرات، نظافت منزل و مشاعات، تدریس خصوصی و حتی نقاشی ساختمان تنها بخشی از ۳۰۰ سرویس فعال پالسین است.';

  constructor(private linksList: Links) { }

  ngOnInit() {
      this.cofeBazarLink = this.linksList.cafeBazarCustomer;
      this.directLink = this.linksList.directLinkCustomer;
      this.googlePlay = this.linksList.googlePlayCustomer;
      this.webAppAddress = this.linksList.webAppAddress;
  }

}
