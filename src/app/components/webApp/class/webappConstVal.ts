import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class webappConstValue{

    public notificationTimeOut = 8000;
    capchaGoogleKey:string = "6LdLGQcUAAAAAHbxZslAIhONUARIfUuDM7RSBxqq";
    imgLoading:string = "assets/webappPics/loading.gif";

    //download links
    cafeBazarCustomer: string = "https://cafebazaar.ir/app/com.pulsein.customer/?l=fa";
    cafeBazarExpert: string = "https://cafebazaar.ir/app/com.pulsein.expert/?l=fa";
    directLinkCustomer: string = "https://pulsein.app/assets/Pulsein_Customer.apk";
    directLinkExpert: string = "https://pulsein.app/assets/Pulsein_Expert.apk";
    
    //social links:
    instagramLink: string = "https://www.instagram.com/pulsein.app/";
    telegramLink: string = "https://t.me/Pulsein";

    //website links:
    home:string = "https://www.pulsein.ir";

    //Errors
    errorMobile:string = "شماره موبایل صحیح نیست";

    //currency
    toman:string = "تومان";

    //addCredit
    textAddCredit:string = "میزان افزایش اعتبار را به عدد و براساس واحد پولی تومان وارد کنید.";

    //lat and long limit
    minLat:number = 34;
    maxLat:number = 37;
    minLng:number = 50;
    maxLng:number = 53;

    //limit char
    maxPassword:number = 16;
    minPassword:number = 4;
    maxMobile:number = 11;
    minMobile:number = 11;
    maxVerifySMS:number = 5;
    minVerifySMS:number = 5;
    maxLastName:number = 40;
    minLastName:number = 2;
    maxFirstName:number = 20;
    minFirstName:number = 2;
    maxRequestTitle:number = 50;
    minRequestTitle:number = 2;
    maxRequestDescription:number = 750;
    minRequestDescription:number = 2;
    maxAddressDetails:number = 150;
    minAddresDetails:number = 5;
    maxCandidateLocationName:number = 50;
    minCandidateLocationName:number = 2;
    maxEmail:number = 45;
    minEmail:number = 5;
    maxAddCredit:number = 8;
    minAddCredit:number = 5000;
    maxDiscont:number = 20;
    minDiscont:number = 2;
    maxCity:number = 30;
    minCity:number = 2;
    maxArea:number = 30;
    minArea:number = 30;
    maxPostalCode:number = 10;
    minPostalCode:number = 10;
    maxSearchJobcat:number = 30;
    minSearchJobCat:number = 2;


    imageProfileEmptySrc:string = "EmptyImages/User.jpg";

    //localstorage Key
    keyJobcat3ID:string = 'jobCat3ID';

}