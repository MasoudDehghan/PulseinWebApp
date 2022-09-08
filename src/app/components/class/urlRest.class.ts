import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UrlRest{
  
  //operation server===== 
  /* */
    public mainPath:string = "https://pulsein.pro/"; //"https://www.pulsein.net:8443/";
    public webSocketAddress = "wss://pulsein.pro/taftan/client"; //"wss://www.pulsein.net:8443/taftan/client";
    public imagePath:string = "https://pulsein.pro/blueberry/"; //"https://www.pulsein.net:8443/blueberry/";
    public uploadImage:string = "https://pulsein.pro/taftan/rest/upload/img/"; //"https://www.pulsein.net:8443/taftan/rest/upload/img/";
  /* */

  //develop server======
  /* *
    public mainPath:string = "https://pulsein.info/"; //"https://pulsein.info:8443/";
    public webSocketAddress = "wss://pulsein.info/taftan/client"; //"wss://pulsein.info:8443/taftan/client";
    public imagePath:string = "https://pulsein.info/blueberry/"; //"https://pulsein.info:8443/blueberry/";
    public uploadImage:string = "https://pulsein.info/taftan/rest/upload/img/"; //"https://pulsein.info:8443/taftan/rest/upload/img/";
  /**/

  //develop server ip======
  /* *
    public mainPath:string = "http://185.50.37.108:8080/"; //"https://pulsein.info:8443/";
    public webSocketAddress = "ws://185.50.37.108:8080/taftan/client"; //"wss://pulsein.info:8443/taftan/client";
    public imagePath:string = "http://185.50.37.108:8080/blueberry/"; //"https://pulsein.info:8443/blueberry/";
    public uploadImage:string = "http://185.50.37.108:8080/taftan/rest/upload/img/"; //"https://pulsein.info:8443/taftan/rest/upload/img/";
  /**/

  //backend mr shoja======
  /*
    public mainPath:string = "http://192.168.1.95:8080/";
    public webSocketAddress = "ws://192.168.1.95:8080/taftan/client";
    public imagePath:string = "http://192.168.1.95:8080/blueberry/";
    public uploadImage:string = "http://192.168.1.95:8080/taftan/rest/upload/img/";
  */

  //const value---------------------------------
    serverPath:string = "taftan/rest/website/";
    serverPathRequest:string = "taftan/rest/pulseClient/";
    inventionPath:string = "taftan/rest/invitation/";
    tokenGest:string = "39c1ed28f5be3f457bfa27f511d0511d05";
    serverPathUser:string = "taftan/rest/usersN/";
    serverPathFinancial:string = "taftan/rest/financial/";
    serverPathBasicData:string = "taftan/rest/basicData/";
    serverPathCandidateLocation:string = "taftan/rest/candidateLocationN/";
    serverPathPayment:string = "taftan/rest/payment/";
    serverPathStatistic:string = "taftan/rest/statistics/";
    serverPathWebClient:string = "taftan/rest/webClient/";
}