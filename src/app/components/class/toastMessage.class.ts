import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ToastMessage{
    title4NoWorker:string = "به زودی";
    msg4NoWorker:string = "این سرویس به زودی ارائه خواهد شد.";

    title4ChangePassword:string = "تغییر رمز";
    msgChangePasswordSucces:string = "رمز با موفقیت تغییر کرد.";

    title4NotAllowForNewRequest:string = "درخواست جدید";
    msgNotAllowForNewRequest:string = "شما یک درخواست فعال دارید. بنابراین قادر به ثبت درخواست جدید نمی باشید.";

    title4ErrorRequestStartTime:string = "خطای بازه زمانی";
    msgErrorRequestStartTime:string = "زمان شروع در بازه زمانی صحیح نمی باشد.";

    title4ErrorPlace:string = "خطای مکان ";
    msgErrorMarkInMap:string = "مکان مشخص شده بر روی نقشه صحیح نیست.";
    title4ErrorDestination:string = "خطای ثبت مقصد ";
    msgErrorDestination:string = "آدرس مقصد الزامی است. آدرس مقصد را به درستی وارد کنید.";
    msgErrorCity:string = "لطفا شهر خود را انتخاب نمایید. انتخاب شهر الزامی است.";
    msgErrorArea:string = "لطفا محله خود را انتخاب نمایید. انتخاب محله الزامی است";
    msgErrorAddress:string = "لطفا جزئیات آدرس را کامل نمایید.";
    msgErrorPostalCode:string = "کدپستی نامعتبر است. لطفا کدپستی را صحیح ثبت کنید و یا مقدار آن را خالی بگذارید.";

    title4ErrorRequestTitle:string = "خطای عنوان ";
    msgErrorRequestTitle:string = "عنوان وارد شده معتبر نمی باشد. وارد کردن عنوان الزامی است.";

    errorLabel : string = "خطا";

    title4NotFoundJobcat3:string = "اخطار انتخاب دسته";
    msgNotFoundJobcat3:string = "دسته کاری مورد نظر شما یافت نشد.";

    title4ProfileEdit:string = "ویرایش اطلاعات کاربری";
    msgProfileEdit:string = "ویرایش اطلاعات کاربری شما با موفقیت انجام شد.";

    title4SuccessAddNewCandidateLocation: string = "مکان منتخب";
    msgSuccessAddNewCandidateLocation: string = "مکان جدید به لیست مکان های منتخب شما اضافه شد";

    title4HasActiveRequest: string = "خطای ثبت درخواست";
    msgHasActiveRequest: string = "شما یک درخواست ثبت شده دارید. پس از تکمیل درخواست فعال خود، می توانید درخواست دیگری ثبت نمایید.";

    title4AcceptRules: string = "خطای پذیرش قوانین";
    msgAcceptRules: string = "برای ثبت درخواست می بایست قوانین سایت پالسین را پذیرفته باشید.";

    title4FollowingRequest: string = "پیگیری درخواست";
    msgFollowingRequest: string = "برای پیگیری درخواست خود می توانید به منو رفته و بر روی دکمه پیگیری درخواست کلیک کنید.";

    title4UpdatServer: string = "بروز رسانی سرور";
    msgUpdateServer: string = "سرور در حال به روز رسانی است. ساعاتی دیگر برای ثبت درخواست اقدام نمایید.";

    title4ErroeMobile: string = "خطای ثبت شماره موبایل";
    msgErrorMobileNumber: string = "شماره موبایل وارد شده صحیح نمی‌باشد. لطفا شماره موبایل را صحیح وارد نمایید";

    title4UserCommentRegisterSuccess: string = "ثبت نظر";
    msgUserCommentRegisterSuccess: string = "نظر شما با موفقیت ثبت شد. تشکر از نظر دهی و همراهی شما با پالسین ";

}