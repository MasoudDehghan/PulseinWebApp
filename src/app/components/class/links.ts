import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
}) 

export class Links{

    //pulseinApp
    //webPulseinApp:string = "https://pulsein.app/#/checkRequest";

    //download links
    cafeBazarCustomer: string = "https://cafebazaar.ir/app/com.pulsein.customer/?l=fa";
    cafeBazarExpert: string = "https://cafebazaar.ir/app/com.pulsein.expert/?l=fa";
    directLinkCustomer: string = "https://pulsein.app/assets/Pulsein_Customer.apk";
    directLinkExpert: string = "https://pulsein.app/assets/Pulsein_Expert.apk";
    googlePlayCustomer: string = "https://play.google.com/store/apps/details?id=com.pulsein.customer";
    googlePlayExpert: string = "https://play.google.com/store/apps/details?id=com.pulsein.expert";
    webAppAddress:string = "https://m.pulsein.pro";

    //social links
    faceBookLink: string = "https://www.facebook.com/Pulseinapp";
    twitterLink: string = "https://twitter.com/PulseinServices";
    linkedInLink: string = "https://www.linkedin.com/company/18405924";
    instagramLink: string = "https://www.instagram.com/pulsein.app/";
    telegramLink: string = "https://t.me/Pulsein";
    googlePlusLink: string ="noLink";
    aparatLink: string = "https://www.aparat.com/pulsein";
    youtubeLink: string = "https://www.youtube.com/channel/UCFaLcfsX9V74xXMZ82dlMCA";

    //namad links
    computerUnion: string = "http://tehran.irannsr.org/index.php?module=cdk&func=loadmodule&system=cdk&sismodule=user/content_view.php&sisOp=view&ctp_id=61&cnt_id=265624&id=19405";

    //blogLink
    blogLink: string = "https://pulsein.app/blog";

}
