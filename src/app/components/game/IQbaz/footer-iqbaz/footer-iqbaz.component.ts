import { EnumConstData } from './../../../enum/constData.enum';
import { Component, OnInit } from '@angular/core';
import { Links } from '../../../class/links';
import { ConstValue } from '../../../class/constValue';
import { InnerLink } from '../../../class/innerLink.class';

@Component({
  selector: 'app-footer-iqbaz',
  templateUrl: './footer-iqbaz.component.html',
  styleUrls: ['./footer-iqbaz.component.css']
})
export class FooterIQbazComponent implements OnInit {

  txtOwnr:string = 'کلیه حقوق این وب سایت به شرکت نیکاسا فام تعلق دارد';
  txtTel:string = 'با ما در تماس باشید:';
  telNumber:string = '';
  txtPulsinName:string = 'پالسین';
  txtSeo:string = 'پالسین بازار آنلاین خدمات خانه است. در پالسین کاربران می توانند بخش عظیمی از خدمات مورد نیاز خود را بصورت‌ آنلاین سفارش دهند و برای نیازهای خود متخصصین تایید شده‌ی پالسین را به کار گیرند. ویژگی مهم پالسین در ارائه بیش از ۱۰۰ سرویس بصورت هوشمند است که تمامی نیازهای فنی در حوزه تعمیرات، نظافت، آموزش و تدریس خصوصی، قالیشویی، کارواش در محل، نظافت راه پله، قالیشویی و شستشوی پرده، نظافت منزل و خانه تکانی، و پذیرایی را پوشش می دهد. در عین حال بخشی از سرویس های آنلاین پالسین شامل بخش زیادی از نیازهای تخصصی تعمیرات منزل است که لوله کشی، برق کشی، تعمیر لوازم برقی، تعمیر لوازم گازسوز، تعمیر کولر گازی، عملیات مرتبط با دکوراسیون داخلی و … را شامل می شود. اگر به تعمیرات لوازم الکترونیکی مثل تعمیر تلویزیون، تعمیر موبایل و یا تعمیر لپ تاپ و لوازم برقی آشپزخانه نیاز پیدا کردید، پالسین در یک دسته بندی جداگانه این خدمات را در اختیار شما قرار می دهد. این خدمات می تواند بخش هایی مثل تعمیر یخچال، تعمیر ماشین لباسشویی و حتی تعمیرات ماشین ظرفشویی را شامل شود که در دسته نیازهای ضروری قرار می گیرد. در زمینه تدریس و آموزش، تمرکز پالسین بر روی آموزش و تدریس خصوصی در محل است که کاربران می توانند نیازهای خود در این زمینه را از طریق اپ پالسین برطرف کنند. تدریس زبان های خارجی مثل تدریس خصوصی زبان انگلیسی، تدریس خصوصی زبان ترکی استانبولی، آلمانی، فرانسه و حتی ایتالیایی و اسپانیایی شناخته شده ترین زبان هایی است که کاربران می توانند درخواست خود را بر اساس آنها جستجو کرده و متخصصین و آموزگاران مناسب خود را به منزل دعوت کنند. اما بخش دیگر تدریس خصوصی پالسین، به آموزش موسیقی مربوط است که برای علاقمندان به موسیقی دسته بندی های متنوعی در سازهای گوناگون تدارک دیده ایم. آموزش خصوصی پیانو، گیتار، سه تار و حتی تار نیازهای علاقمندان در این زمینه را تا حد زیادی پوشش می دهد. البته در کنار این موارد نمی توان موارد دیگری چون آموزش خصوصی سنتور، آموزش خصوصی تنبک و آموزش خصوصی ویولن را از یاد برد. در عین حال می توانید برای تعمیر و کوک کردن ساز نیز از پالسین بهره برد.';
  
  textSeo1:string = 'پالسین بازار آنلاین خدمات خانه است. در پالسین کاربران می توانند بخش عظیمی از خدمات مورد نیاز خود را بصورت‌ آنلاین سفارش دهند و برای نیازهای خود متخصصین تایید شده‌ی پالسین را به کار گیرند. ویژگی مهم پالسین در ارائه بیش از ۱۰۰ سرویس بصورت هوشمند است که تمامی نیازهای فنی در حوزه ';
  textSeo2:string = 'نظافت منزل و خانه تکانی، و پذیرایی را پوشش می دهد. در عین حال بخشی از سرویس های آنلاین پالسین شامل بخش زیادی از نیازهای تخصصی تعمیرات منزل است که لوله کشی، برق کشی، تعمیر لوازم برقی، تعمیر لوازم گازسوز،';
  textSeo3:string = 'عملیات مرتبط با دکوراسیون داخلی و … را شامل می شود. اگر به تعمیرات لوازم الکترونیکی مثل تعمیر تلویزیون،';
  textSeo4:string = 'و لوازم برقی آشپزخانه نیاز پیدا کردید، پالسین در یک دسته بندی جداگانه این خدمات را در اختیار شما قرار می دهد. این خدمات می تواند بخش هایی مثل';
  textSeo5:string = 'را شامل شود که در دسته نیازهای ضروری قرار می گیرد. در زمینه تدریس و آموزش، تمرکز پالسین بر روی آموزش و تدریس خصوصی در محل است که کاربران می توانند نیازهای خود در این زمینه را از طریق اپ پالسین برطرف کنند. تدریس زبان های خارجی مثل تدریس خصوصی زبان انگلیسی، تدریس خصوصی زبان ترکی استانبولی، آلمانی، فرانسه و حتی ایتالیایی و اسپانیایی شناخته شده ترین زبان هایی است که کاربران می توانند درخواست خود را بر اساس آنها جستجو کرده و متخصصین و آموزگاران مناسب خود را به منزل دعوت کنند. اما بخش دیگر تدریس خصوصی پالسین، به آموزش موسیقی مربوط است که برای علاقمندان به موسیقی دسته بندی های متنوعی در سازهای گوناگون تدارک دیده ایم. آموزش خصوصی پیانو، گیتار، سه تار و حتی تار نیازهای علاقمندان در این زمینه را تا حد زیادی پوشش می دهد. البته در کنار این موارد نمی توان موارد دیگری چون آموزش خصوصی سنتور، آموزش خصوصی تنبک و آموزش خصوصی ویولن را از یاد برد. در عین حال می توانید برای تعمیر و کوک کردن ساز نیز از پالسین بهره برد.';
  seoLinkList1:InnerLink[] = [
    {
      text:'تعمیرات',
      link:'/categories3/fixing-home-equipment'
    },
    {
      text: 'نظافت',
      link: '/categories3/home-cleaning'
    },
    {
      text: 'آموزش و تدریس خصوصی',
      link: '/educational-and-office-services'
    },
    {
      text: 'قالیشویی',
      link: '/categories3/carpet-cleaning'
    },
    {
      text: 'کارواش در محل',
      link: '/categories3/carwash-at-home'
    },
    {
      text: 'نظافت موکت و مبلمان',
      link: '/categories3/furniture-cleaning'
    }
  ];

  seoLinkList2:InnerLink[] = [
    {
      text:'تعمیر کولر گازی',
      link:'/categories3/air-conditioners'
    },
    {
      text:'تعمیر کولر آبی',
      link:'/categories3/water-coolers'
    }
  ];

  seoLinkList3:InnerLink[] = [
    {
      text:'تعمیر موبایل',
      link:'/categories3/cell-phones'
    },
    {
      text:'تعمیر لپ تاپ',
      link:'/categories3/upgrading-and-fixing-hardware'
    }
  ];

  seoLinkList4:InnerLink[] = [
    {
      text:'تعمیر یخچال',
      link:'/categories3/refrigerators'
    },
    {
      text:'تعمیر ماشین لباسشویی',
      link:'/categories3/washing-machine'
    },
    {
      text:'تعمیر ماشین ظرفشویی',
      link:'/categories3/dish-washer'
    }
  ];


  links1 = [
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

  constructor(private linksList:Links, private constVar:ConstValue) { }

  ngOnInit() {
    this.faceBook = this.linksList.faceBookLink;
    this.twitter = this.linksList.twitterLink;
    this.linkedIn = this.linksList.linkedInLink;
    this.instagram = this.linksList.instagramLink;
    this.telegram = this.linksList.telegramLink;
    this.googlePlus = this.linksList.googlePlusLink;
    this.telNumber = EnumConstData.suportTel1;
    this.computerUnionLink = this.linksList.computerUnion;
  }//end ngOnInit

}
