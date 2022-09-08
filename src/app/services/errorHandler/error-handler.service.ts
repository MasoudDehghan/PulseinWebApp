import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  checkErrorCode(errorCode:number, innerErrorCode:number):string{
    let msgError:string = '';
    if(errorCode === 0){
      msgError = "InfoCode_OK";
    }//end code 0
    else if(errorCode === 1){
      msgError = "Session_Expire";
    }//end code 1
    else if(errorCode === 2){
      msgError = "UnAutorized";
    }//end code 2
    else if(errorCode === 3){
      msgError = "UnPermited";
    }//end code 3
    else if(errorCode === 4){
      if(innerErrorCode === 0){
        msgError = "UnKnown";
      }//end innercode 0
      else if(innerErrorCode === 9){
        msgError = "EntityNotFound";
      }//end innercode 9
    }//end code 4
    return msgError;
  }//end checkErrorCode

}//end main class
