import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { SharedService } from "../shared/shared.service";
import { AngularFireMessaging } from "@angular/fire/messaging";


@Injectable({
    providedIn: 'root'
  })

export class MessagingService {

    tokeFB: BehaviorSubject<string> = new BehaviorSubject('');
    currentMessage = new BehaviorSubject(null);
  
    constructor(private shared:SharedService,
      private angularFireMessaging: AngularFireMessaging
    ) {
        
      this.angularFireMessaging.messaging.subscribe(
        (_messaging) => {
          //console.log("در سرویس پیام: لاگ پیام");
          //console.log(_messaging);
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
      )
  
    }//end constructor
  
    receiveMessage() { 
      this.angularFireMessaging.messages.subscribe(
        (payload) => {
          //console.log("in messaging service new message received: ");
          //console.log(payload);
          this.currentMessage.next(payload);
          this.shared.showFirebaseNotification.next(true);
          setTimeout(()=>{
            this.shared.showFirebaseNotification.next(false);
          }, 7000);
        }, error => {
            //console.log("in messaging service payload error");
        })
    }//end receiveMessage
  
  
    getToken(){
      this.angularFireMessaging.getToken.subscribe(currentToken =>{
        if (currentToken) {
          //console.log("in messaging service getToken():");
          //console.log(currentToken);
          this.tokeFB.next(currentToken);
        }
        else{
          //console.log("in messaging service: no currentToken");
        }
      }, error =>{
        //console.log("خطا در گرفتن کلید فایربیس");
        //console.log(error);
      });
    }//end getToken
  
  
    getPermission(){
      this.angularFireMessaging.requestPermission.subscribe(()=>{
        //console.log('in messaging service permission is ok....');
        this.getToken();
      }, error=>{
        //console.log('in messaging service no permission...');
        this.getToken();
      });
    }//end getPermission
  
}