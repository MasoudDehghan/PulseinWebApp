import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Links } from '../class/links';
import { ConstValue } from '../class/constValue';
import { EnumLinkGame } from '../class/game/enumIQBaz/enumLinkGame';
import { InnerLink } from '../class/innerLink.class';
import { socialNetwork } from '../class/socialNetwork.class';
import { isPlatformBrowser } from '@angular/common';
import { EnumConstData } from '../enum/constData.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  txtOwnr:string = 'کلیه حقوق این وب سایت به شرکت نیکاسا فام تعلق دارد';
  txtTel:string = 'با ما در تماس باشید:';
  telNumber1:string = '';
  mobileNumber1:string = '';
  textCallOperators:string = '';
  txtPulsinName:string = 'پالسین';
  txtSeo1:string = 'پالسین بازار آنلاین خدمات خانه است. در پالسین کاربران می‌توانند بخش عظیمی از خدمات مورد نیاز خود را بصورت‌ آنلاین سفارش دهند. متخصصین تایید شده‌ی پالسین آماده خدمت رسانی به کاربران عزیز می‌باشند. خدماتی چون ';
  txtSeo2:string = 'را می‌توانید از اپلیکیشن و یا وب سایت پالسین درخواست دهید. رضایت و آسایش شما هدف ما در پالسین می‌باشد.';
  seoLinkList:InnerLink[] = [
    {
      text:'نظافت منزل',
      link:'/categories3/home-cleaning'
    },
    {
      text: 'نظافت محیط کار',
      link: '/categories3/home-cleaning'
    },
    {
      text: 'پذیرایی مهمانی‌ها',
      link: '/categories3/home-cleaning'
    },
    {
      text: 'قالیشویی',
      link: '/categories3/carpet-cleaning'
    },
    {
      text: 'شست و شوی مبل',
      link: '/categories3/furniture-cleaning'
    },
    {
      text: 'کارواش در محل',
      link: '/categories3/carwash-at-home'
    },
    {
      text: 'اسباب کشی ',
      link: '/categories3/Movers'
    }
  ];
  
  links1 = [
    {title:'وبلاگ', route:'about-us'},
    {title:'درباره ما', route:'about-us'},
    {title:'قوانین و مقررات', route:'rules'}
    //{title:'پالسین در رسانه ها', route:'--'}
  ];

  contactUs:string = 'ارتباط با ما';
  links2 = [
    {title:'تماس با ما', route:'contact-us'},
    {title:'پیشنهادات و انتقادات', route:'CriticismAndSuggestion'}
    //{title:'همکاری با ما', route:'--'},
    //{title:'پالسین در شهر شما', route:'--'}
  ];

  moreKnow:string = "بیشتر بدانید";
  links3 = [
    {title: "کسب درآمد (متخصصین)", route: "experts"},
    {title:'پرسش های متداول کاربران', route:'FAQs'},
    {title:'پرسش های متداول متخصصین', route:'FAQs-expert'}
    //{title:'راهنمای ثبت درخواست', route:'--'}
  ];

  entertaiment:string = "جشنواره و مسابقه";
  links4 = [
    {title: "جشنواره IQ باز", route: EnumLinkGame.layoutGame}
  ];

  //otherService:string = 'سایر خدمات پالسین';
  //links4:string[] = [
    //'خدمات محبوب'
  //]; 

  faceBook: string;
  twitter: string;
  linkedIn: string;
  instagram: string;
  telegram: string;
  googlePlus: string;
  computerUnionLink: string;
  socialList:socialNetwork[] = [];
  addressPulsein:string = '';

  constructor(private linksList:Links,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.addressPulsein = EnumConstData.addressCo;
    this.socialList = [
      {
        faName:"تویتر",
        link:this.linksList.twitterLink,
        icon:"assets/image/iconSocial/twitter.png"
      },
      {
        faName:"یوتیوب",
        link:this.linksList.youtubeLink,
        icon:"assets/image/iconSocial/youtube.png"
      },
      {
        faName:"فیسبوک",
        link:this.linksList.faceBookLink,
        icon:"assets/image/iconSocial/facebook.png"
      },
      {
        faName:"لینکدین",
        link:this.linksList.linkedInLink,
        icon:"assets/image/iconSocial/linkedin.png"
      },
      {
        faName:"اینستاگرام",
        link:this.linksList.instagramLink,
        icon:"assets/image/iconSocial/instagram.png"
      },
      {
        faName:"تلگرام",
        link:this.linksList.telegramLink,
        icon:"assets/image/iconSocial/telegram.png"
      },
      {
        faName:"آپارات",
        link:this.linksList.aparatLink,
        icon:"assets/image/iconSocial/aparat.png"
      }
    ];
    this.telNumber1 = EnumConstData.suportTel1;
    this.mobileNumber1 = EnumConstData.suportmobile1;
    this.textCallOperators = EnumConstData.textCallToOperator;
    this.computerUnionLink = this.linksList.computerUnion;
  }//end OnInit

  goToBlog(){
    if(isPlatformBrowser(this.platformId)){
      window.location.href = this.linksList.blogLink;
    }
  }//end goToBlog

}


