import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-spesefics-web',
  templateUrl: './spesefics-web.component.html',
  styleUrls: ['./spesefics-web.component.css']
})
export class SpeseficsWebComponent implements OnInit {

  specficWebList:object[] = [
    {"name":"دسترسی آسان در همه‌جا", "description":"اینترنت، یک گوشی هوشمند اندرویدی و اپلیکیشن پالسین! برای دسترسی به بهترین متخصصین محل خود تنها به این سه آیتم نیاز دارید", "src":"assets/image/a.png"},
    {"name":"مناسب‌ترین قیمت‌ها", "description":"در هر زمنیه ای، چه نظافت، چه کارواش و یا حتی آموزش و تدریس خصوصی، متخصصین مورد نیاز خود را بصورت مناقصه ای انتخاب و استخدام کنید", "src":"assets/image/b.png"},
    {"name":"حرفه‌ای‌ها را استخدام کنید", "description":"پالسین تنها به مدرک فنی حرفه ای، تجربه ی کاری و یا مدرک دانشگاهی بسنده نمی کند. متخصصین ما با استانداردهای پالسین به کمک شما می آیند.", "src":"assets/image/c.png"},
    {"name":"ضمانت بازگشت وجه", "description":"از کار متخصصین ما ناراضی هستید؟ ما وجه شما را برمیگردانیم! تنها کافیست که ناراضیتی خود را از طریق پشتیبانی به گوش ما برسانید.", "src":"assets/image/d.png"}
  ];

  mainTxtTitr:string = "چرا پالسین؟";
  mainTxtdescription:string = "پالسین ویژگی های منحصر به فردی دارد  که سفارش خدمات منزل بصورت آنلاین را برای شما جذاب و مقرون به صرفه می کند.";
  
  constructor() { }

  ngOnInit() {}
  
}

