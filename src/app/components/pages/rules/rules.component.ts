import { Title, Meta } from '@angular/platform-browser';
import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { JobCategory1V } from '../../class/jobCategory1V.class';
import { JobCategory2V } from '../../class/jobCategory2V.class';
import { JobCategory3V } from '../../class/jobCategory3V.class';
import { BasicDataService } from '../../../services/basicData/basic-data.service';
import { isPlatformBrowser } from '@angular/common';
import { UrlRest } from '../../class/urlRest.class';
import { SharedService } from '../../../services/shared/shared.service';
import { MetaService } from '../../../services/metaTag/meta.service';


@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  rules=[
    {
      id:"1",
      title:"تعاریف",
      listItems:[
        "شرکت: منظور شرکت داده پردازی نیک آسا فام به شماره ثبت 512526 می باشد.",
        "پالسین: نام اپلیکیشن موبایل به منظور ارائه خدمات که توسط شرکت داده پردازی نیک آسا فام تهیه شده و تحت مجوز شامد (از وزات فرهنگ و ارشاد اسلامی) قابل ارائه و استفاده توسط عموم مردم است.",
        "سامانه: مجموعه امکانات سخت افزاری و نرم افزای و سایر منابع است که اپلیکیشن پالسین بر بستر آن فعال بوده و خدمات موضوع فعالیت را ارائه می نماید.",
        "درگاه دسترسی: روش های دسترسی به سامانه پالسین شامل اپلیکیشن موبایل یا سایت پالسین و یا پنل اپراتور/ادمین می باشد.",
        "حساب کاربری: حسابی است که اشخاص حقیقی و حقوقی به منظور فعالیت در سامانه پالسین از طریق یکی از درگاه های دسترسی به آن برای خود در سامانه ایجاد می کند.",
        "متخصص: شخص حقیقی یا حقوقی است که به منظور ارائه خدمات مبتنی بر تخصصهای خود در سامانه پالسین ثبت نام کرده و قادر به ارائه پیشنهاد به درخواست های کاربران و انجام آنها در محل مورد نظر ایشان است.",
        "کاربر: شخص حقیقی یا حقوقی است که به منظور دریافت خدمات (قابل ارائه توسط متخصصین) در سامانه پالسین ثبت نام کرده و قادر به ثبت درخواست و فراهم آوردن تمهیدات جهت اجرای آن توسط متخصص است.",
        "واحد کسب و کار: شخصیت حقیقی یا حقوقی است که متخصص تحت مدیریت و مسئولیت آن به فعالیت در سامانه پالسین می پردازد.",
        "نماینده کسب و کار: شخصیت حقیقی است که به نمایندگی از یک کسب و کار در سامانه پالسین ثبت نام می نماید.",
        "معرف: سرویس دهنده/ سرویس کار/ متخصصی است که قبلا در سامانه ثبت نام نموده و تایید شده و می تواند تایید کننده کسب و کارهای افراد حقیقی جدیدی که متقاضی ثبت نام در سامانه پالسین هستند باشد.",
        "اعتبار: مبلغی است که متخصصین و کاربران در حساب کاربری خود به منظور استفاده یا ارائه خدمات دارند. این مبلغ به صورت پرداخت از طریق سامانۀ بانکی و کارت‌های عضو شبکۀ شتاب و طبق شرایط و مقررات فعالیت در سامانه پالسین منظور و محاسبه می شود.",
        "محرمانه: هرگونه اطلاعات که طبق قوانین و مقررات سایت افشای آن تحت هر شرایطی و به هر صورتی و در نزد هر شخصی غیرمجاز است.",
        "درگاه پرداخت: امکانی است در اپلیکیشن کاربران که به منظور پرداخت آنلاین هزینه انجام درخواست یا افزایش اعتبار ایشان مورد استفاده قرار می گیرد.",
        "اعتبار (مالی) : معادل مبلغ موجودی حساب متخصصصین و کاربران در سامانه است."
      ]
    },
    {
      id:"2",
      title:"تعهدات و مسئولیت های اشخاص حقیقی و حقوقی",
      listItems:[
        "کلیه اشخاص حقیقی و حقوقی ثبت نام کرده در سامانه پالسین متعهد می شوند که حین فعالیت در سامانه کلیه قوانین و مقررات جمهوری اسلامی ایران شامل قانون اساسی، قوانین عادی، آئین نامه های اجرایی، بخشنامه‌ها، دستورالعمل‌ها و کلیه ضوابط قانونی حاکم بر انجام موضوع فعالیت سامانه را رعایت می نمایند.",
        "اشخاص حقیقی و حقوقی با ثبت نام در سامانه می‌پذیرند که قوانین و مقررات پالسین را به صورت کامل مطالعه کرده و کلیه شرایط آن را پذیرفته‌اند.",
        "ادامه و استمرار فعالیت اشخاص حقیقی و حقوقی در سامانه پالسین به معنی پذیرش کامل و بی قیدوشرط قوانین و مقررات و تغییرات آن است و هرگونه ادعا یا اعتراضی در این خصوص بی اعتبار است.",
        "اشخاص حقیقی و حقوقی متعهد می شوند کلیه اطلاعات و مدارک درخواستی سامانه را بصورت صحیح وارد نموده یا ارائه می نمایند و در صورت هرگونه تغییر سریعا به روز رسانی می نمایند. مسئولیت هرگونه عدم صحت اطلاعات و جبران عواقب و خسارات ناشی از آن بعهده نامبردگان بوده و شرکت مجاز به پیگیری قضایی و قانونی نزد مراجع ذیصلاح می‌باشد.",
        "هر شخص حقیقی و حقوقی با ثبت‌نام در سامانه پالسین به نام خود، انتساب تمام اطلاعات و داده های صادره از حساب کاربری خویش را در سامانه پالسین پذیرفته و درنتیجه حق هرگونه اعتراض یا ادعایی از قبیل انکار، تردید، جعل و تغییرپیام‌های ارسالی را از خویش سلب و اسقاط می‌نماید.",
        "مسئولیت همۀ فعالیت‌هایی که از طریق حساب کاربری اشخاص حقیقی و یا حقوقی در سامانه پالسین انجام می‌شود به عهدۀ دارنده حساب کاربری است.",
        "دارنده حساب کاربری هر واحد کسب و کار نسبت به هرگونه فعالیت متخصصین زیرمجموعه خود تحت سامانه پالسین مسئول است.",
        "دارندگان حساب کاربری در سامانه پالسین حق ندارند به اشخاص حقیقی و حقوقی دیگر اجازه استفاده از حساب کاربری خود را بدهند یا حساب کاربری خود را به شخص حقیقی یا حقوقی دیگری تحت هر عنوان منتقل کنند. در مورد شخصیت حقوقی نیز، کلیه مسئولیت‌های قانونی بهره برداری از خدمات پالسین مستقیما متوجه مدیر حقوقی آن مجموعه خواهد بود.",
        "کلیه متخصصین و کاربران متعهد می شوند در صورت درخواست شرکت نسبت به ارائه هرگونه مدارک یا اطلاعات در زمان مقرر اقدام نمایند. در صورت عدم ارائه شرکت مجاز به تعلیق یا حذف حساب کاربری مذکور و توقف ارائه خدمات به ایشان و زیرمجموعه های آن بوده و کلیه تبعات ناشی از آن بعهده وی میباشد.",
        "مسئولیت همۀ اقدامات و افعال اشخاص حقیقی و حقوقی عضو سامانه پالسین که ناشی از عدم رعایت قوانین جمهوری اسلامی ایران از جمله قانون مجازات اسلامی و قوانین مدنی باشد، و نیز جبران خسارات برعهدۀ شخص متخلف بوده و شرکت هیچ گونه مسئولیتی در قبال اعمال و افعال فوق ندارد. شرکت می‌تواند ضمن غیر فعال کردن حساب کاربری متخلف، از طریق مراجع ذیصلاح، اقدامات قانونی را علیه نامبرده نسبت به احقاق حقوق قانونی به منظور جبران خسارات وارده به شرکت به عمل آورد.",
        "کلیه اشخاص حقیقی و حقوقی عضو سامانه پالسین موظف به رعایت کلیه استانداردهای ایمنی و حفاظت حین ارائه سرویس و انجام کار بوده و شرکت مسئولیتی در قبال عدم رعایت این موارد ندارد. جبران خسارات احتمالی ناشی از عدم رعایت ملاحظات ایمنی بعهده نامبردگان می باشد.",
        "هر نوع خدماتی که از طریق سامانه پالسین صورت می‌گیرد یک قرارداد مستقل فی‌مابین کاربر ثبت کننده درخواست و متخصصی است که پیشنهادش از طرف کاربر پذیرفته شده است. شرکت هیچ‌گونه مسئولیتی - اعم از حقوقی و کیفری - در قبال اتفاقات حین انجام بازدید و اجرای کار در مقابل کاربران و متخصصان و اشخاص ثالث نخواهد داشت.",
        "مسئولیت احراز هویت مراجعه کننده –بعنوان متخصص برگزیده- جهت اجرای درخواست کار بعهده کاربر ثبت کننده درخواست است.",
        "چنانچه حین انجام سرویس و اجرای کار خسارت یا تلفاتی متوجه متخصصین و یا کاربران گردد طرفین ملزم به رفع و رجوع موضوع بین خود بوده و شرکت در این زمینه مسئولیتی ندارد. در عین حال شرکت می تواند حسب تشخیص خود نسبت به لغو یا تعلیق عضویت خاطی در سامانه و توقف دریافت خدمات توسط وی اقدام نماید. ضمنا شرکت مجاز است در صورت ایراد خسارتی از این بابت به حقوق مادی و معنوی خود ضمن اقامه دعوی نزد مراجع قانونی و قضایی نسبت به جبران خسارت وارده به خود اقدام نماید."
      ]
    },
    {
      id:"3",
      title:"محرمانگی و مسئولیت های امنیتی",
      listItems:[
        "کلیه اطلاعاتی که متخصصین و کاربران در سامانه پالسین و در حساب کاربری خود وارد می نمایند یا اطلاعاتی که در نتیجه استفاده از اپلیکیشن شامل درخواست سرویس، پیشنهاد ارائه سرویس، فاکتور(های) صادره و ... محرمانه هستند.",
        "متخصصین و کاربران حق به اشتراک گذاری هیچ یک از اطلاعات محرمانه قابل دسترس خود در سامانه را به هیچ فرد و تحت هر عنوان و به هیچ طریقی ندارد.",
        "مسئولیت حفظ امنیت و عدم افشا اطلاعات حساب کاربری از جمله نام کاربری و رمز عبور به عهدۀ شخص حقیقی و یا حقوقی است. در صورت مفقود شدن یا سرقت اطلاعات حساب کاربری، شخص مذکور موظف است در اسرع وقت موضوع را به اطلاع شرکت برساند. بدیهی است تا زمانی که اطلاع‌رسانی به شرکت انجام نشده است، مسئولیت همۀ فعالیت‌هایی که از طریق حساب کاربری مذکور انجام شده و می‌شود و نیز جبران خسارات احتمالی به عهدۀ وی است."
      ]
    },
    {
      id:"4",
      title:"شرایط استفاده از خدمات پالسین",
      listItems:[
        "حداقل سن برای ثبت نام و داشتن حساب کاربری و استفاده از خدمات اپلیکیشن پالسین ۱۸ سال تمام شمسی است.",
        "متخصصین و کاربران حق استفاده از اپلیکیشن پالسین برای انجام فعالیت های غیر قانونی و خلاف شرع مبین اسلام و خلاف عرف جامعه اسلامی-ایرانی را ندارند.",
        "متخصصین و کاربران می‌پذیرند که شرکت ممکن است از ارسال پیامک، ایمیل و یا Push Notification به عنوان راه ارتباطی شرکت با وی استفاده کند. اشخاص مذکور می‌توانند درخواست کنند که ارسال این پیام‌ها قطع شود اما در این صورت می‌پذیرند که با انصراف از دریافت این پیام‌ها، ممکن است در استفاده از خدمات با مشکل مواجه شوند و یا اطلاعات مقتضی بموقع به ایشان نرسد، که عواقب ناشی از آن به عهده درخواست دهنده است.",
        "مسئولیت هزینه و تهیه ابزار و منابع لازم جهت ثبت نام و استفاده از خدمات پالسین اعم از گوشی موبایل ارتباط شبکه و ظرفیت اینترنت و ... بعهده خود اشخاص بوده و شرکت تعهدی در این زمینه ندارد.",
        "کاربران با ثبت نام و باز کردن حساب کاربری و ثبت درخواست انجام خدمات قابل ارائه توسط اپلیکیشن پالسین می پذیرند که متخصصین منتخب با رعایت موازین شرعی و قانونی، حق ورود و حضور در داخل منزل/اداره/ساختمان محل انجام کار را در کلیه مراحل بازدید و اجرای کار درخواستی از ابتدا تا اتمام کار دارند.",
        "متخصصین و کاربران ملزم به رعایت کلیه شوءنات اجتماعی و اسلامی در حین بازدید و اجرای کارهای درخواستی و حضور متخصصین در محل انجام کار کاربران هستند.",
        "مسئولیت هماهنگی و اخذ مجوزهای لازم در آپارتمانها، مجتمع های مسکونی، سازمان ها و ادارات جهت انجام بازدید و اجرای درخواست توسط متخصصین بعهده کاربران است. هرگونه جبران هزینه یا خسارت ناشی از عدم انجام موارد مذکور بعهده کاربران می باشد.",
        "متخصصین ملزم به رعایت زمان بندی درخواستی و توافق شده با کاربران جهت حضور برای انجام بازدید و اجرای درخواست هستند. کاربران نیز ملزم به فراهم نمودن کلیه تمهیدات در بازه زمانی درخواستی و توافق شده با متخصصین جهت حضور برای بازدید و اجرای درخواست هستند. عواقب ناشی از عدم رعایت این مورد و جبران هزینه و خسارات احتمالی منتج از عدم رعایت زمانبندی بعهده فردی است که وظایف خود در موضوع زمان بندی را رعایت نکرده و شرکت در این زمینه هیچ گونه مسئولیتی ندارد. در عین حال شرکت می تواند حسب تشخیص خود نسبت به لغو یا تعلیق عضویت خاطی در سایت و توقف دریافت خدمات توسط وی از اپلیکیشن اقدام نماید.",
        "چنانچه اجرای درخواست توسط کاربران نیازمند مدت زمانی بیش از زمان پیش بینی شده باشد متخصصین و کاربران بنا به صلاحدید و شرایط خود ملزم به توافق و فراهم نمودن شرایط اجرای کار تا زمان اتمام آن درخواست می باشند.",
        "تامین اقلام مورد نیاز برای اجرای هر درخواست مطابق مذاکره و توافق بین متخصص(پیشنهاد) برگزیده و کاربر ثبت کننده درخواست تعیین می شود.",
        "تامین کلیه تجهیزات و ابزار کار مورد نیاز جهت اجرای درخواست تماما بعهده متخصص (پیشنهاد) برگزیده می باشد.",
        "کاربران مجاز می باشند تا قبل از مراجعه متخصص (پیشنهاد) برگزیده به محل اجرای درخواست و تغییر وضعیت درخواست به شروع به کار نسبت به کنسل نمودن درخواست خود اقدام نمایند. در این حالت متخصص مذکور ادعایی نسبت به هزینه های متحمل شده بابت پذیرش، بازدید، تهیه تجهیزات و پیگیری اجرای درخواست مذکور نخواهد داشت.",
        "متخصص (پیشنهاد) برگزیده مجاز است تا قبل از مراجعه به محل اجرای درخواست و تغییر وضعیت درخواست به شروع به کار نسبت به حذف پیشنهاد خود جهت اجرای درخواست اقدام نمایند. در این حالت کاربر ثبت کننده درخواست ادعایی نسبت به هزینه های متحمل شده بابت پذیرش پیشنهاد متخصص برگزیده و آماده سازی شرایط اجرای درخواست مذکور نخواهد داشت.",
        "با ثبت درخواست یا سفارش کاربر اعلام می دارد که شرکت هیچ تعهدی در قبال منعیات قانونی و ضبط بار یا کالای سفارش داده شده ندارد و در صورت بروز مشکل حقوقی یا قانونی یا امنیتی، کلیه مسئولیت بار یا کالای سفارش داده شده جهت حمل برعهده ی مالک یا سفارش دهنده بوده، و خسارات ناشی از آن بر عهده ایشان است.",
        "کلیه مسئولیت حقوقی و قانونی بار سفارش داده شده و در حال حمل بر عهده ی کسی است که سفارش حمل بار را داده است و حکم مالک بار را دارد."
      ]
    },
    {
      id:"5",
      title:"فاکتورها هزینه ها دریافت ها و پرداخت ها",
      listItems:[
        "فاکتور اولیه در مرحله ارائه پیشنهاد برای انجام درخواست کاربر توسط متخصص تهیه و ارائه می گردد. ارائه فاکتور در این مرحله اختیاری است. پذیرش درخواست متخصص توسط کاربر به معنای پذیرش فاکتور اولیه نیز هست.",
        "در مرحله انجام بازدید امکان تولید فاکتور اولیه یا تغییر فاکتوری که در مرحله ارائه پیشنهاد ایجاد شده توسط متخصص برگزیده وجود دارد. ارائه فاکتور در این مرحله نیز اختیاری است. در صورت پذیرش فاکتور صادره در این مرحله و اتمام بازدید وضعیت درخواست به منتظر تایید بازدید تغییر می یابد. در صورت عدم پذیرش فاکتور صادره در این مرحله توسط کاربر، وضعیت درخواست به منتظر بازدید بازخواهد گشت و امکان شروع به کار توسط متخصص وجود ندارد.",
        "هزینه های انجام هر درخواست در فاکتور نهایی که توسط متخصص برگزیده تهیه و ارائه می شود مشخص می گردد. تنظیم و ارائه فاکتور در این مرحله برای کار اجرا شده توسط متخصص اجباری است. این فاکتور ملاک پرداخت هزینه انجام درخواست کاربر است.",
        "کاربران می پذیرند که باتوجه به تغییرات احتمالی موارد کاری تغییرات فاکتور توسط متخصص در مراحلی که اپلیکیشن امکان آنرا می دهد مجاز است.",
        "در صورت شروع به کار متخصص برای اجرای درخواست کاربر ثبت کننده درخواست می پذیرد که با توجه به تغییرات احتمالی در کار اجرایی، فاکتور نهایی صادره می تواند نسبت به فاکتور(های) قبلی تغییرات داشته باشد.",
        "هزینه انجام درخواست کاربر به دو طریق قابل پرداخت است؛ نقدی یا اعتباری.",
        "در روش پرداخت نقدی، هزینه انجام درخواست بصورت نقدی و پس از اتمام کار به متخصص و توسط کاربر ثبت کننده درخواست پرداخت می شود.",
        "در روش پرداخت اعتباری هزینه انجام درخواست بصورت اتوماتیک از موجودی اعتبار کاربر ثبت کننده درخواست کسر و به اعتبار متخصص مربوطه اضافه می گردد. لازم است اعتبار کاربر برای پرداخت فاکتور بصورت اعتباری کافی باشد. در صورت کمبود اعتبار امکان افزایش اعتبار کاربر از طریق درگاه پرداخت موجود در اپلیکیشن کاربر وجود دارد.",
        "کاربرانی که شیوه نقدی را انتخاب می‌کنند، نمی‌توانند از تخفیف‌های پالسین استفاده نمایند. برای استفاده از تخفیف‌ها لازم است حتما از روش اعتباری استفاده شود.",
        "تخصیص اعتبار هدیه و یا تخفیف‌های ویژه ای که به کاربران تعلق می‌گیرد، به عنوان بخشی از سیاست‌های بازاریابی پالسین انجام شده و نحوه تخصیص آن به کاربران، زمان اعتبار و انقضا، سقف مصرف و مقدار اعتبار اهدا شده، مشمول زمان و سیاست‌های داخلی پالسین است. پالسین می‌تواند با تشخیص خود نسبت به تغییر زمان انقضا، کسر اعتبار و تعیین سقف مصرف جدید برای هر سفارش بصورت یک جانبه تصمیم گیری و اقدام نموده و کاربران نمی‌توانند نسبت به هیچکدام از موارد ذکر شده و حتی سلب حق استفاده از این هدایا اعتراض نمایند.",
        "از مبلغ پرداختی کاربر بابت انجام هر درخواست به میزان ۴ الی ۱۰ درصد با توجه به نوع کسب و کار سهم شرکت و مابقی سهم متخصص می باشد.",
        "در دوره های مشخص زمانی صورتحساب عملکرد هر متخصص محاسبه و فیش آن بصورت الکترونیکی صادر می گردد.",
        "براساس آخرین فیش صادر شده برای متخصص جمع مبلغ بستانکاری ایشان به شماره حساب/کارت اعلامی و ثبت شده در سامانه واریز می گردد.",
        "واریز مبلغ بستانکاری متخصص به حساب ایشان منوط به بیشتر بودن آن از حداقل تعریف شده (در حال حاضر ۲۰.۰۰۰ تومان) است."
      ]
    }
  ]

  isPC:boolean = true;
  categories1: JobCategory1V[];
  categories2: Array<JobCategory2V[]>;
  categories3: Array<JobCategory3V[]>;
  xWindow:number = 1000;
  path:string = '';

  constructor(private basicData: BasicDataService,
    private urlRest: UrlRest,
    public titleSeo:Title,
    public meta:Meta,
    private metaService: MetaService,
    public shared: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.shared.inPageDownload.next(false);
    this.shared.pagePath.next(this.shared.getPagePath());
    this.path = this.urlRest.imagePath;
    this.titleSeo.setTitle("پالسین - قوانین");
    this.meta.updateTag({
      name: 'description',
      content: "قوانین و مقررات پالسین در ارائه خدمات نسبت به کاربران پالسین"
    });

    this.metaService.createCanonicalURL(this.metaService.webBasicUrl + "/rules");

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
      this.modeInit();
      this.basicData.setCategories.subscribe(res => {
        if(res){
          //console.log("rules ***");
          this.categories1 = this.basicData.categories1;
          this.categories2 = this.basicData.categories2;
          this.categories3 = this.basicData.categories3;
        }
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (isPlatformBrowser(this.platformId)){
      this.xWindow = window.innerWidth;
      if(this.xWindow <= 720){
       this.isPC = false;
      }
      else{
       this.isPC = true;
      }
    } 
  }

  modeInit(){
    this.xWindow = window.innerWidth;
    if(this.xWindow <= 720){
     this.isPC = false;
    }
    else{
     this.isPC = true;
    } 
  }

}
